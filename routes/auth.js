var express = require('express');
var router = express.Router();
const { User, User_settings, Profile } = require('../models');
const { minioClient } = require('../minio.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post("/signin", async (req, res) => {
    let { email, password } = req.body;

    User.findOne({
        where: {
            email: email,
        },
        include: [
            {
                model: User_settings,
                as: "settings",
            },
            {
                model: Profile,
                as: "profile",
            }
        ]
    }).then(async result => {
        if (result === null) {
            return res.status(401).json({error: 'User does not exist'});
        }
        if (result.profile.profileImage) {
            await minioClient.presignedGetObject(process.env.MINIO_BUCKET || "fakebook", result.profile.profileImage, 3600)
                .then((minioResult) => {
                    result.profile.profileImage = minioResult;
                }).catch((err) => {
                    result.profile.profileImage = null;
                });
        }

        if (result.profile.bannerImage !== null) {
            await minioClient.presignedGetObject(process.env.MINIO_BUCKET || "fakebook", result.profile.bannerImage, 3600)
                .then((minioResult) => {
                    result.profile.bannerImage = minioResult;
                }).catch((err) => {
                    result.profile.bannerImage = null;
                });
        }

        if (!(await bcrypt.compare(password, result.password))) {
            return res.status(401).json({error: 'Wrong credentials'});
        }

        const token = jwt.sign({id: result.id}, process.env.JWT_SECRET || "test", { expiresIn: '1h'});
        res.cookie("fakebook_token", token, { httpOnly: true });
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err.message});
    });
});


router.post("/signup", async (req, res) => {
    let { firstname, lastname, email, password, birthDate} = req.body;
    password = await bcrypt.hash(password, 8);

    User.create({firstname, lastname, email, password, birthDate})
        .then(userResult => {
            User_settings.create({
                userId: userResult.id,
            }).then((settingsResult) => {
                Profile.create({
                    userId: userResult.id,
                }).then(profileResult => {
                    return res.status(200).json({ user: userResult, settings: settingsResult, profile: profileResult });
                }).catch((profileErr) => {
                    return res.status(400).json({error: profileErr.message});
                })
            }).catch((settingsErr) => {
                return res.status(400).json({error: settingsErr.message});
            })
        }).catch((userErr) => {
        return res.status(400).json({error: userErr.message});
    });
});



module.exports = router;
