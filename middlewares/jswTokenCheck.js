const { User } = require('../models');
const jwt = require('jsonwebtoken');


const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({message: "Unauthenticated"})
    }
    jwt.verify(token, process.env.JWT_SECRET || "test", (err, user) => {
        if (err) return res.status(403).send('Invalid or expired token');
        next();
    });
}

module.exports = authenticateToken;