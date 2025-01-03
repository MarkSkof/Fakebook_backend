var express = require('express');
var router = express.Router();
const { Post, Comment, User, Like_dislike } = require('../models');

router.post('/getPage', async (req, res) => {
    const {limit, offset} = req.body;
    Post.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: offset,
        include: {
            model: Comment,
        }
    }).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
    });

});

router.post('/getOneById', async (req, res) => {
    const {postId} = req.body;
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
        return res.status(400).json({error: err});
    });
});

router.post('/getPageByUserId', async (req, res) => {
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
            },
            {
                model: User,
            },
            // {
            //     model: Like_dislike,
            //     where: {
            //         id: userId
            //     }
            // }
        ],
    }).then(result => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});

router.post('/create', async (req, res) => {
    const { userId, title, body, media, isPrivate } = req.body;
    Post.create({userId: userId, title: title, body: body, media: media, isPrivate: isPrivate})
        .then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(400).json({error: err});
        });


});

router.post('/delete', async (req, res) => {
    const { id } = req.body;
    Post.destroy({
        where: {
            id: id
        },
    }).then(result => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});



module.exports = router;
