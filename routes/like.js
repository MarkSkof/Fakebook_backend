var express = require('express');
var router = express.Router();
const { Like_dislike: Like } = require('../models');
const {Client} = require("minio");
const authenticateToken = require("../middlewares/jswTokenCheck");

router.post('/isLiked', authenticateToken, async (req, res) => {
    const { userId, postId } = req.body;
    Like.findOne({
        where: {
            postId: postId,
            userId: userId,
        },
    }).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});

router.post('/like', authenticateToken, async (req, res) => {
    const { userId, postId } = req.body;
    Like.create({userId: userId, postId: postId})
        .then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
        return res.status(400).json({error: err});
    });
});

router.post('/unlike', authenticateToken, async (req, res) => {
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


