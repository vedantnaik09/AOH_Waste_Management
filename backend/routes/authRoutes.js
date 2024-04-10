const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.use(express.json()); // Parsing JSON requests

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/wallet', authController.wallet);
module.exports = router;
