const express = require('express');
const router = express.Router();
const {changeUserData} = require('../controllers/user');

router.route('/edit')
    .patch(changeUserData);

module.exports = router;