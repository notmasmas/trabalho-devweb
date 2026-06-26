const express = require('express')
const router = express.Router()

router.use('/files', require('./files'));
router.use('/posts', require('./posts'));

module.exports = router