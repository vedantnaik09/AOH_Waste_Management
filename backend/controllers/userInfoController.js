// controllers/userController.js

const UserRecords = require("../models/UserRecords");
const User = require("../models/User");
const moment = require("moment");

// Updating user’s streak (POST)
exports.updateStreak = async (req, res) => {
  try {
    const { username, streak } = req.body;

    // Update the user's streak
    await UserRecords.findOneAndUpdate({ username: username }, { streak: streak });

    res.status(200).json({ message: "User streak updated successfully" });
  } catch (error) {
    console.error("Error updating user streak:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieving user’s streak (GET)
exports.getStreak = async (req, res) => {
  try {
    const { username } = req.params;

    // Retrieve the user's streak
    const user = await UserRecords.findOne({ username: username });
    const streak = user.streak;

    res.status(200).json({ streak });
  } catch (error) {
    console.error("Error retrieving user streak:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Providing a badge (POST)
exports.provideBadge = async (req, res) => {
  try {
    const { username, badge } = req.body;

    // Update the user's badges array
    await UserRecords.findOneAndUpdate(
      { username: username },
      { $push: { badges: badge } }
    );

    res.status(200).json({ message: "Badge provided successfully" });
  } catch (error) {
    console.error("Error providing badge:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieving badge (GET)
exports.getBadges = async (req, res) => {
  try {
    const { username } = req.params;

    // Retrieve the user's badges array
    const user = await UserRecords.findOne({ username: username });
    const badges = user.badges;

    res.status(200).json({ badges });
  } catch (error) {
    console.error("Error retrieving badges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    // Fetch users sorted by credits in descending order
    const users = await UserRecords.find().sort({ credits: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetching user’s tokens/credits (GET)
exports.getUserCredits = async (req, res) => {
  try {
    const { username } = req.params;

    // Retrieve the user's credits
    const user = await UserRecords.findOne({ username: username });
    const credits = user.credits;

    res.status(200).json({ credits });
  } catch (error) {
    console.error("Error retrieving user credits:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCredits = async (req, res) => {
  try {
    const { username, credits } = req.body;

    // Update the user's credits
    await UserRecords.findOneAndUpdate({ username: username }, { credits: credits });

    res.status(200).json({ message: "User credits updated successfully" });
  } catch (error) {
    console.error("Error updating user credits:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.updateWeightHistory = async (req, res) => {
  try {
    const { username, weight } = req.body;

    // Get the current date and time in Indian Standard Time
    const currentTimeIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    // Parse the current date and time in Indian Standard Time
    const currentDateIST = new Date(currentTimeIST);

    // Extract date and time separately
    const currentDate = currentDateIST.toISOString().split('T')[0];
    const dateTime = currentDateIST;

    // Find the user
    let user = await UserRecords.findOne({ username: username });

    if (!user) {
      // If user not found, create a new one
      user = new UserRecords({
        username: username,
        streak: 0,
        badges: [],
        points: 0,
        credits: 0,
        weightHistory: []
      });
    }

    let weightEntryUpdated = false;

    // Check if weight entry for today already exists
    for (let i = 0; i < user.weightHistory.length; i++) {
      // Convert the date strings to Date objects for comparison
      const entryDate = user.weightHistory[i].date;

      if (entryDate.toDateString() === currentDateIST.toDateString()) {
        // If weight entry for today exists, update the weight
        user.weightHistory[i].weight += weight;
        weightEntryUpdated = true;
        break;
      }
    }

    if (!weightEntryUpdated) {
      // If weight entry for today doesn't exist, push a new entry
      user.weightHistory.push({
        date: currentDate,
        dateTime: dateTime,
        weight: weight
      });
    }

    // Save the user object
    await user.save();

    res.status(200).json({ message: 'User weight history updated successfully' });
  } catch (error) {
    console.error('Error updating user weight history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Controller for fetching weight history for a user
exports.getWeightHistory = async (req, res) => {
  try {
    const { email } = req.query; // Access email from req.query instead of req.body
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Assuming the weight history is stored in a separate schema
    const weightHistoryUser = await UserRecords.findOne({ username: user.username });
    if (!weightHistoryUser) {
      return res.status(404).json({ message: 'Weight history not found for this user' });
    }

    const weightHistory = weightHistoryUser.weightHistory;

    res.status(200).json({ weightHistory });
  } catch (error) {
    console.error("Error retrieving user weight history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getActivity = async (req, res) => {
  try {
    // Fetch users
    const users = await UserRecords.find();

    // Sort weightHistory array within each user's record by dateTime in descending order
    users.forEach(user => {
      user.weightHistory.sort((a, b) => b.dateTime - a.dateTime);
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching activity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getcalenderitems = async (req, res) => {
  try {
    // Fetch users
    const{ email } = req.query;
    const user = await User.findOne({ email });
    const OverallData = await UserRecords.findOne({ username: user.username });
    res.status(200).json(OverallData);
  } catch (error) {
    console.error("Error fetching activity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

