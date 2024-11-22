const express = require('express');
const router = express.Router();
const { register, login, getUserById } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/user/:id', auth, getUserById);

module.exports = router;
