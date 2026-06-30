const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-handler');

router.use('/auth', require('./authentication'));
//temporario

router.use(authMiddleware);
router.use('/files', require('./files'));
router.use('/posts', require('./posts'));
router.use('/disciplinas', require('./disciplina'));
router.use('/user', require('./user'));

module.exports = router