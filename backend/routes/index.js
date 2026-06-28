const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-handler');

router.use('/auth', require('./authentication'));
router.use(authMiddleware);
router.use('/files', require('./files'));
router.use('/posts', require('./posts'));

module.exports = router