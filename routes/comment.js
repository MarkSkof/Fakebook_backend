var express = require('express');
var router = express.Router();
const { Comment } = require('../models');
const authenticateToken = require('../middlewares/jswTokenCheck')

router.post('/getByPostId', authenticateToken, async (req, res) => {
    const {offset, limit, postId} = req.body;
    Comment.findAll({
        where: {
            postId: postId
        },
    }).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});

router.post('/create', authenticateToken, async (req, res) => {
    const { userId, postId, text } = req.body;
    Comment.create({userId: userId, postId: postId, text: text})
        .then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(400).json({error: err});
        });
});

router.post('/delete', authenticateToken, async (req, res) => {
    const { id } = req.body;
    await Comment.destroy({
        where: {
            id: id
        },
    }).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});



module.exports = router;