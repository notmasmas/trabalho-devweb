require('dotenv').config();
const bcrypt = require('bcryptjs');
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require('../errors');
const User = require("../models/user");

const changeUserData = async (req, res) => {
    const {name, oldPassword, newPassword} = req.body;
    const dbUser = await User.findById({_id: req.user.id});

    const editObject = {};

    if (newPassword != '') {
        const isPasswordCorrect = await dbUser.comparePassword(oldPassword);

        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Falha na autenticação');
        }

        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);
        editObject.password = newHashedPassword;
    }

    editObject.name = name;

    const user = await User.findByIdAndUpdate(
        req.user.id,
        editObject,
        {returnDocument: 'after'});


    const token = user.createJWT();

    res
        .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        })
        .status(StatusCodes.OK)
        .send();
};

module.exports = { changeUserData }