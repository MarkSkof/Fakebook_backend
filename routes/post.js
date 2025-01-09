var express = require('express');
var router = express.Router();
const { Post, Comment, User, Like, Profile } = require('../models');
const { sequelize, Op, Sequelize } = require('sequelize');
const {minioClient} = require("../minio");
const multer = require("multer");
const { v4 } = require('uuid');
const authenticateToken = require("../middlewares/jswTokenCheck");

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

router.post('/getPage', authenticateToken, async (req, res) => {
    const {limit, offset } = req.body;
    Post.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: offset,
        include: [
            {
                model: Comment,
                as: 'comments',
            },
            {
                model: User,
                as: 'user',
                attributes: ["id", "firstname", "lastname"],
                include: {
                    model: Profile,
                    as: 'profile',
                    attributes: ["profileImage"],
                }
            },
            {
                model: Like,
                as: 'likes',
            }
        ],

    }).then(async ( result) => {
        for (var post of result) {
            if (post.media !== null) {
                minioClient.presignedGetObject(process.env.MINIO_BUCKET || "fakebook", post.media, 3600)
                    .then((minioResult) => {
                        post.media = minioResult;
                    }).catch((err) => {
                    post.media = null
                })
            }

            if (post.user.profile.profileImage !== null) {
                await minioClient.presignedGetObject(process.env.MINIO_BUCKET || "fakebook", post.user.profile.profileImage, 3600)
                    .then((minioResult) => {
                        post.user.profile.profileImage = minioResult;
                    }).catch((err) => {
                        console.log(err.message);
                        post.user.profile.profileImage = null;
                    })
            }
        }


        return res.status(200).json(result);
    }).catch((err) => {
        res.status(400).json({error: err.message});
    });

});

router.post('/getOneById', authenticateToken, async (req, res) => {
    const { postId } = req.body;
    Post.findOne({
        where: {
            id: postId
        },
        include: {
            model: Comment,
        }
    }).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err.message});
    });
});

router.post('/getPageByUserId', authenticateToken, async (req, res) => {
    const {offset, limit, userId} = req.body;
    Post.findAll({
        where: {
            userId: userId
        },
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: offset,
        include: [
            {
                model: Comment,
                as: 'comments',
            },
            {
                model: User,
                as: 'user',
                attributes: ["id", "firstname", "lastname"],
            },
            {
                model: Like_dislike,
                as: 'likes',
            }
        ],
    }).then(result => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err.message});
    });
});

router.post('/create', authenticateToken, upload.single('file'), async (req, res) => {
    const { userId, title, body, isPrivate } = req.body;
    var media = null;
    var media_type = null;
    if (req.file) {
        var formatData = req.file.mimetype.split("/");
        media = v4() + "." + formatData[1];
        media_type = formatData[0];
    }

    Post.create({userId: userId, title: title, body: body, media: media, media_type: media_type, isPrivate: isPrivate})
        .then(async (result) => {
            if (req.file) {
                await minioClient.putObject(process.env.MINIO_BUCKET, media, req.file.buffer)
                .catch((err) => {
                    res.status(400).json({error: err.message});
                })
            }
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(400).json({error: err.message});
        });


});

router.post('/delete', authenticateToken, async (req, res) => {
    const { id } = req.body;
    Post.destroy({
        where: {
            id: id
        },
    }).then(result => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err.message});
    });
});



module.exports = router;
