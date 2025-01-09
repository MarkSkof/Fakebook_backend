var express = require('express');
var router = express.Router();
const { User_settings } = require('../models');
const authenticateToken = require("../middlewares/jswTokenCheck");

router.post('/update', authenticateToken, async (req, res) => {
    const { userId } = req.body;
    User_settings.update(
        req.body,
        {
            where: {
                userId: userId,
        },
    }).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json({error: err});
    });
});

module.exports = router;