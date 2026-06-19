const express = require('express')
const router = express.Router()

router.use('/files', require('./files'));
router.use('/projects', require('./projects'));

module.exports = router