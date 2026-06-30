const {StatusCodes} = require('http-status-codes');
const User = require('../models/user');
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../errors');

const register = async (req, res) => {
    
    const user = await User.create(req.body);
    const token = user.createJWT();

    res
        .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        })
        .send();
}

const login = async (req, res) => {

    const {email, password} = req.body;

    if (!email || !password) {
        throw new BadRequestError('Por favor insira e-mail e senha');
    }

    const user = await User.findOne({email});

    if (!user) {
        throw new UnauthenticatedError('Falha na autenticação');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Falha na autenticação');
    }

    const token = user.createJWT();

    res
        .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        })
        .send();
}

const logout = async (req, res) => {

  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
  });

  return res.status(200).send();

}

module.exports = {
    register,
    login,
    logout
}
