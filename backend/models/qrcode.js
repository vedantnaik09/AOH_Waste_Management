const mongoose = require('mongoose');

const qrcodeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  totalDays: {
    type: Number,
    required: true
  },
  dailyPlan: {
    type: String,
    required: true
  },
  tokenId: {
    type: String,
    required: true
  }
});

const QrCode = mongoose.model('QrCode', qrcodeSchema);

module.exports = QrCode;
