// routes/userInfoRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userInfoController');

router.post('/updateStreak', userController.updateStreak);
router.get('/getStreak/:username', userController.getStreak);
router.post('/provideBadge', userController.provideBadge);
router.get('/getBadges/:username', userController.getBadges);
router.get('/leaderboard', userController.getLeaderboard);
router.get('/getUserCredits/:username', userController.getUserCredits);
router.post('/updateUserCredits', userController.updateCredits);

// New routes for weight history
router.post('/updateWeightHistory', userController.updateWeightHistory);
router.get('/getWeightHistory', userController.getWeightHistory);
router.get('/getActivity', userController.getActivity);
router.get('/getcalenderitems', userController.getcalenderitems);

module.exports = router;
