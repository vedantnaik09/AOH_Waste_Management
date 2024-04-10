const express = require('express');
const router = express.Router();
const Waste = require('../controllers/wasteContoller');

// Route to create a new QR code
router.post('/add', Waste.saveUsernameAndPlan);

module.exports = router;
