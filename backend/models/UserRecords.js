const mongoose = require('mongoose');

const weightHistorySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    dateTime: { type: Date, required: true },
    weight: { type: Number, required: true },
});

const userRecordsSchema = new mongoose.Schema({
    username: { type: String, required: true, ref: 'User' },
    dateTime: { type: Date, required: true },
    streak: { type: Number, default: 0 },
    badges: [{ badgeName: String }],
    points: { type: Number, default: 0 },
    credits: { type: Number, default: 0 },
    weightHistory: [weightHistorySchema], // Embedding weight history schema
    totalDays: { 
        type: Number,
        default: function() {
            return this.weightHistory.length; // Calculate totalDays based on weightHistory length
        }
    }
});

const UserRecords = mongoose.model('UserRecords', userRecordsSchema);

module.exports = UserRecords;
