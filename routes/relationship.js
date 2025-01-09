var express = require('express');
var router = express.Router();
const { Relationship, User } = require('../models');
const {Op} = require("sequelize");
const authenticateToken = require("../middlewares/jswTokenCheck");


router.post('/getByUserId', authenticateToken, async (req, res) => {
    const { id } = req.body;

    var friends = [];
    var blocked = [];
    var friend_requests = [];

    Relationship.findAll({
        where: {
            [Op.or]: [
                {userAId: id},
                {userBId: id}
            ]
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
        result.forEach((relationship) => {
            if (relationship.userAId === id) {
                if (relationship.status === "FRIEND") {
                    friends.push(relationship.userB);
                } else if (relationship.status === "BLOCKED") {
                    blocked.push(relationship.userB);
                } else if (relationship.status === "FRIEND_REQUEST") {
                    friend_requests.push(relationship.userB);
                }
            } else {
                if (relationship.status === "FRIEND") {
                    friends.push(relationship.userA);
                } else if (relationship.status === "BLOCKED") {
                    blocked.push(relationship.userA);
                } else if (relationship.status === "FRIEND_REQUEST") {
                    friend_requests.push(relationship.userA);
                }
            }
        })
        return res.status(200).json({
            friend_requests: friend_requests,
            friends: friends,
            blocked: blocked
        });
    }).catch((err) => {
        return res.status(400).json({error: err, success: false });
    });
});

router.post('/create', authenticateToken, async (req, res) => {
    const { userAId, userBId } = req.body;
    Relationship.create({
        userAId: userAId,
        userBId: userBId
    }).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});

router.post('/delete', authenticateToken, async (req, res) => {
    const { userAId, userBId } = req.body;
    Relationship.destroy({
        where: {
            [Op.or]: [
                {userAId: userAId, userBId: userBId},
                {userAId: userBId, userBId: userAId}
            ]
        },
    }).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});



module.exports = router;