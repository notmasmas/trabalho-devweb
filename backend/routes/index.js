const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authentication');

router.use('/files', authentication, require('./files'));
router.use('/auth', require('./auth'));

module.exports = router