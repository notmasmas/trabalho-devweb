const jwt = require('jsonwebtoken');
require('dotenv').config();
const {UnauthenticatedError} = require('../errors');
const User = require('../models/user');

const authentication = async (req, res, next) => {
    const cookies = req.cookies;

    if (!cookies) {
        throw new UnauthenticatedError('Authentication has failed');
    }
    
    const token = req.cookies.token;

    if (!token) {
        throw new UnauthenticatedError('Authentication has failed');
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload;
        /*
        user = {id, name, role}
        */

        next();
    }
    catch (error) {
        throw new UnauthenticatedError('Authentication has failed');
    }
}

module.exports = authentication;