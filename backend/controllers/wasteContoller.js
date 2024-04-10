const User = require('../models/User');
const UserRecords = require('../models/UserRecords');
const WasteDisposalRegistration = require('../models/WasteDisposalRegistration'); // Ensure you have imported the WasteDisposalRegistration model

const saveUsernameAndPlan = async (req, res) => {
  const { email, dailyPlan } = req.body;

  try {
    // Find the user by email ID
    const user = await User.findOne({ email });

    // If user not found, send error response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const username = user.username;

    // Find the user records by username
    const userRecord = await UserRecords.findOne({ username });

    if (!userRecord) {
      return res.status(404).json({ error: 'User records not found' });
    }

    // Create a new instance of WasteDisposalRegistration model
    const registrationData = {
      username,
      dailyPlan
    };

    const newRegistration = new WasteDisposalRegistration(registrationData);

    // Save the new registration to the database
    await newRegistration.save();

    res.status(200).json({ message: 'Username and selected plan saved successfully' });
  } catch (error) {
    console.error('Error saving username and plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  saveUsernameAndPlan
};
