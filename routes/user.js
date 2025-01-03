var express = require('express');
var router = express.Router();
const { User, User_settings } = require('../models');


router.post("/getById", async (req, res) => {
	const { userId } = req.body;

	User.findOne({
		where: {
			id: userId
		}
	}).then(result => {
		if (result === null) {
			return res.status(204)
		}
		return res.status(200).json(result);
	}).catch((err) => {
		return res.status(400).json({error: err});
	});
});

router.post("/getByEmail", async (req, res) => {
	const { email } = req.body;

	User.findOne({
		where: {
			email: email
		}
	}).then(result => {
		if (result === null) {
			return res.status(204)
		}
		return res.status(200).json(result);
	}).catch((err) => {
		return res.status(400).json({error: err});
	});
});


router.post("/create", async (req, res) => {
	const {username, email, password, birthDate} = req.body;

	const date = new Date(birthDate)
	const dateNow = new Date();
	dateNow.setFullYear(dateNow.getFullYear() - 18)
	if (dateNow < date) {
		return res.status(400).json({error: "You must be at least 18 years old to use this app."});
	}

	User.create({username, email, password, birthDate})
		.then(userResult => {
			User_settings.create({
				userId: userResult.id,
			}).then((settingsResult) => {
				return res.status(200).json({ userResult, settingsResult });
			}).catch((settingsErr) => {
				return res.status(400).json({error: settingsErr});
			})
		}).catch((userErr) => {
			return res.status(400).json({error: userErr});
		});
});

router.post("/delete", async (req, res) => {
	const {userId} = req.body;

	User.destroy({
		where: {
			id: userId
		}
	}).then(result => {
		return res.status(200).json(result);
	}).catch((err) => {
		return res.status(400).json({error: err});
	});
});


module.exports = router;
