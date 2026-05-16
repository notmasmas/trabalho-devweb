const User = require('../models/user');
const {BadRequestError, NotFoundError} = require('../errors');
const {StatusCodes} = require('http-status-codes');

const register = async (req, res) => {

    const user = await User.create(req.body);
    const token = user.createJWT();

    res
        .status(StatusCodes.CREATED)
        .json(user);
}

const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide e-mail and password');
    }

    const user = User.findOne({email});
    
    if (!user) {
        throw new NotFoundError(`No account found with e-mail ${email}`);
    }

    const isPasswordCorrect = user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Authentication has failed');
    }

    token = user.createJWT();

    res
        .status(StatusCodes.OK)
        .json({token});
}

module.exports = {
    register,
    login
}