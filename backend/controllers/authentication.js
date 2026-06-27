const {StatusCodes} = require('http-status-codes');
const User = require('../models/user');
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../errors');

const register = async (req, res) => {
    
    const user = await User.create(req.body);
    const token = user.createJWT();

    res
        .cookie('token', token, {
            httpOnly: true
        })
        .send();
}

const login = async (req, res) => {

    const {email, password} = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide e-mail and password');
    }

    const user = await User.findOne({email});

    if (!user) {
        throw new UnauthenticatedError('Authenticated has failed');
    }

    const isPasswordCorrect = user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw UnauthenticatedError('Authentication has failed');
    }

    token = user.createJWT();

    res
        .cookie('token', token, {
            httpOnly: true
        })
        .send();
}

module.exports = {
    register,
    login
}
