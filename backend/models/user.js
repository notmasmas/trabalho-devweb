const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name of user'],
        maxlength: 100
    },
    email: {
        type: String,
        required: [true, 'Please provide e-mail'],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, //string regex para verificar e-mail válido
        'E-mail is not valid'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        maxlength: 100
    },
    role: {
        type: String,
        default: 'student'
    }
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createJWT = function () {
    const payload = {
        userId: this._id, 
        name: this.name, 
        role: this.role};

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});

    return token;
}

UserSchema.methods.comparePassword = async function (inputPassword) {
    const isMatch = await bcrypt.compare(inputPassword, this.password);

    return isMatch;
}

module.exports = mongoose.model('users', UserSchema);