// userController.js
const User = require("../models/User");

// Controller for getting all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a specific user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  console.log(updateFields);

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields dynamically
    for (const key in updateFields) {
      if (Object.hasOwnProperty.call(updateFields, key)) {
        user[key] = updateFields[key];
      }
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const { userEmail } = req.body;
    console.log('Received email:', userEmail); // Log the received email

    if (!userEmail) {
      return res.status(400).json({ error: 'User email not found in request body' });
    }

    // Query the User model to find the user by email
    const user = await User.findOne({ email: userEmail });
    console.log(user)

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // User found, extract username
    const username = user.username;
    res.status(200).json({ username });
  } catch (error) {
    console.error('Error retrieving user information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
