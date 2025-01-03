var express = require('express');
var router = express.Router();
const { Friend, User } = require('../models');
const {Op} = require("sequelize");


router.post('/getByUserId', async (req, res) => {
    const { id } = req.body;

    var friends = [];

    Friend.findAll({
        where: {
            [Op.or]: [{userAId: id}, {userBId: id}]
        },
        include: [
            {
                model: User,
                as: "userA",
            },
            {
                model: User,
                as: "userB",
            }
        ]
    }).then((result) => {
        result.forEach((friendship) => {
            if (friendship.userAId === id) {
                friends.push(friendship.userB);
            } else {
                friends.push(friendship.userA);
            }
        })
        return res.status(200).json(friends);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});

router.post('/create', async (req, res) => {
    const { userAId, userBId } = req.body;
    Friend.create({
        userAId: userAId,
        userBId: userBId
    }).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});

router.post('/delete', async (req, res) => {
    const { userAId, userBId } = req.body;
    await Comment.destroy({
        where: {
            [Op.or]: {
                [Op.and]:[{userAId: userAId}, {userBId: userBId}],
                [Op.and]:[{userAId: userBId}, {userBId: userAId}]
            }
        },
    }).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});



module.exports = router;