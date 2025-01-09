var express = require('express');
var router = express.Router();
const { Profile } = require('../models');
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });
const { v4 } = require('uuid');
const {minioClient} = require("../minio");
const authenticateToken = require("../middlewares/jswTokenCheck");

router.post('/update', authenticateToken, async (req, res) => {
    const { userId } = req.body;
    Profile.update(
        req.body,
        {
            where: {
                userId: userId,
            },
        }
    ).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});


router.post('/updateProfileImage', authenticateToken, upload.single('file'), async (req, res) => {
    const { userId } = req.body;
    if (!req.file) {
        return res.status(400).json({error: 'no file'});
    }
    if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({error: 'Only image files allowed'});
    }

    let profileImage = v4() + "." + req.file.mimetype.split("/")[1];
    let oldImageName = null;

    await Profile.findOne({
        where: {
            userId: userId,
        },
        attributes: ['profileImage'],
    }).then((result) => {
        oldImageName = result.profileImage;
    }).catch((err) => {
        return res.status(400).json({error: err.message});
    })

    await minioClient.putObject(process.env.MINIO_BUCKET || "fakebook", profileImage, req.file.buffer)
    .then(async (result) => {
        await Profile.update(
            {
                profileImage: profileImage,
            },
            {
                where: {
                    userId: userId,
                },
            }
        ).then( async (result) => {
            if (oldImageName !== null && oldImageName !== "default.jpg") {
                await minioClient.removeObjects(process.env.MINIO_BUCKET || "fakebook", [oldImageName]);
            }
            return res.status(200).json(result);
        }).catch(async (err) => {
            await minioClient.removeObjects(process.env.MINIO_BUCKET || "fakebook", [profileImage]);
            return res.status(400).json({error: err.message});
        });
    }).catch((err) => {
        return res.status(400).json({error: err.message});
    })
});


router.post('/updateBannerImage', authenticateToken, upload.single('file'), async (req, res) => {
    const { userId } = req.body;
    if (!req.file) {
        return res.status(400).json({error: 'no file'});
    }
    if (!req.file.mimeType.startsWith('image/')) {
        return res.status(400).json({error: 'Only image files allowed'});
    }

    let bannerImage = v4() + "." + req.file.mimetype.split("/")[1];
    let oldImageName = null;

    await Profile.findOne({
        where: {
            userId: userId,
        },
        attributes: ['bannerImage'],
    }).then((result) => {
        oldImageName = result.bannerImage;
    }).catch((err) => {
        return res.status(400).json({error: err.message});
    })

    await minioClient.putObject(process.env.MINIO_BUCKET || "fakebook", bannerImage, req.file.buffer)
        .then(async (result) => {
            await Profile.update(
                {
                    bannerImage: bannerImage,
                },
                {
                    where: {
                        userId: userId,
                    },
                }
            ).then(async (result) => {
                if (oldImageName !== null && oldImageName !== "default.jpg") {
                    await minioClient.removeObjects(process.env.MINIO_BUCKET || "fakebook", [oldImageName]);
                }
                return res.status(200).json(result);
            }).catch(async (err) => {
                await minioClient.removeObjects(process.env.MINIO_BUCKET || "fakebook", [bannerImage]);
                return res.status(400).json({error: err.message});
            });
        }).catch((err) => {
            return res.status(400).json({error: err.message});
        })
});



module.exports = router;