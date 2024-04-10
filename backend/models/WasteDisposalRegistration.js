const mongoose = require('mongoose');

const WasteDisposalRegistrationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    dailyPlan: {
        type: String,
        required: true
    }
});

const WasteDisposalRegistration = mongoose.model('WasteDisposalRegistration', WasteDisposalRegistrationSchema);

module.exports = WasteDisposalRegistration;
