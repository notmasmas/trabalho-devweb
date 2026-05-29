const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
const User = require('../models/user');

const authentication = async (req, res, next) => {
    //check header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid');
    }

    //authHeader = 'Bearer TOKEN'

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        //attach user to routes
        req.user = {
            userID: payload.userID,
            name: payload.name,
            role: payload.role
        }

        next();
    }
    catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
}

module.exports = authentication;