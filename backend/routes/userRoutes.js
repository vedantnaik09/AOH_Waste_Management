// routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.use(express.json());

// Routes for user operations
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/updateuserinfo/:id', userController.updateUser);
router.post('/getusername', userController.getUserByUsername);
// router.delete('/users/:id', userController.deleteUserById);

module.exports = router;
