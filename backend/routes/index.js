const express = require('express')
const router = express.Router()

router.use('/files', require('./files'))
router.use('/auth', require('./auth'))

module.exports = router