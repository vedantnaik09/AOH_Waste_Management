const express = require('express');
const router = express.Router();
const qrCodeController = require('../controllers/qrCodeController');

// Route to create a new QR code
router.post('/generate', qrCodeController.createQrCode);

// Route to get all QR codes
// router.get('/getall', qrCodeController.getAllQrCodes);

// // Route to get a QR code by username
// router.get('/generate/:username', qrCodeController.getQrCodeByUsername);

module.exports = router;
