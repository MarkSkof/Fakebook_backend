var express = require('express');
var router = express.Router();
const { User, User_settings, Profile } = require('../models');
const { minioClient } = require('../minio.js');
const authenticateToken = require("../middlewares/jswTokenCheck");


router.post("/getById", authenticateToken, async (req, res) => {
	const { userId } = req.body;

	User.findOne({
		where: {
			id: userId
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
	}).then(result => {
		return res.status(200).json(result);
	}).catch((err) => {
		return res.status(400).json({error: err.message});
	});
});

router.post("/getByEmail", authenticateToken, async (req, res) => {
	const { email } = req.body;

	await User.findOne({
		where: {
			email: email
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
		if (result !== null) {
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
					.then((minioResult) => {b
						result.profile.bannerImage = minioResult;
					}).catch((err) => {
						result.profile.bannerImage = null;
					});
			}
		}
		return res.status(200).json(result);
	}).catch((err) => {
		return res.status(400).json({error: err.message});
	});
});


router.post("/create", authenticateToken, async (req, res) => {
	const { firstname, lastname, email, password, birthDate} = req.body;

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
					return res.status(400).json({profileErr});
				})
			}).catch((settingsErr) => {
				return res.status(400).json({error: settingsErr});
			})
		}).catch((userErr) => {
			return res.status(400).json({error: userErr.message});
		});
});

router.post("/delete", authenticateToken, async (req, res) => {
	const {userId} = req.body;

	User.destroy({
		where: {
			id: userId
		}
	}).then(result => {
		return res.status(200).json(result);
	}).catch((err) => {
		return res.status(400).json({error: err.message});
	});
});


module.exports = router;
