const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/authentication');
const authMiddleware = require('../middleware/auth-handler');

router.post('/register', register);
router.post('/login', login);
router.get('/verify', authMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;