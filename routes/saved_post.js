var express = require('express');
var router = express.Router();
const { Saved_post, Post } = require('../models');
const {minioClient} = require("../minio");
const authenticateToken = require("../middlewares/jswTokenCheck");

router.post('/getSavedPage', authenticateToken, async (req, res) => {
    const { userId, offset, limit } = req.body;
    Saved_post.findAll({
        attributes: [],
        offset: offset,
        limit: limit,
        order: [['createdAt', 'DESC']],
        where: {
            userId: userId
        },
        include: {
            model: Post,
            as: "post",
        }
    }).then((result) => {
        minioClient.presignedGetObject(process.env.MINIO_BUCKET, result.media, 3600)
        .then((minioResult) => {
            result.media = minioResult;
        }).catch((err) => {
            result.media = null;
        })
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});

router.post('/save', authenticateToken, async (req, res) => {
    const { userId, postId } = req.body;
    Saved_post.create({userId: userId, postId: postId})
        .then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
        return res.status(400).json({error: err});
    });
});

router.post('/unsave', authenticateToken, async (req, res) => {
    const { userId, postId } = req.body;
    Comment.destroy({
        where: {
            userId: userId,
            postId: postId
        },
    }).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});



module.exports = router;