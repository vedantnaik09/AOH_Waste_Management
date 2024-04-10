const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserRecords = require("../models/UserRecords");
const Waste = require("../models/WasteDisposalRegistration"); // Assuming 'waste' is the correct name of the model

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, dob, pincode, username } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance with hashed password
    const user = new User({ 
      email, 
      password: hashedPassword, 
      firstName, 
      lastName, 
      dob, 
      pincode, 
      username
    });

    // Save user to database
    await user.save();

    // Create user records
    const userRecords = new UserRecords({ 
      username,
      dateTime: Date.now(),
      streak: 0, // Initial streak
      badges: [], // Empty badges array
      points: 0, // Initial points
      credits: 0,
      weightHistory:[
        {
          date: Date.now(),
          dateTime: Date.now(),
          weight: '0',
        }
      ] // Initial weight history
    });
    await userRecords.save();
    
    // Create Waste disposal registration

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send token in response
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const Address = require("../models/Address");

const wallet = async (req, res) => {
  try {
    const userData = req.body;
    const userInfo = JSON.parse(userData.userInfo);
    console.log(userInfo._id);

    // Check if the address for the user already exists
    let existingAddress = await Address.findOne({ userID: userInfo._id });

    if (existingAddress) {
      // If address exists, update it
      existingAddress.address = userData.address;
      await existingAddress.save();

      res
        .status(200)
        .json({
          message: "Address updated successfully",
          address: existingAddress,
        });
    } else {
      // If address doesn't exist, create a new one
      const newAddress = new Address({
        userID: userInfo._id,
        address: userData.address,
      });

      await newAddress.save();

      res
        .status(201)
        .json({ message: "Address created successfully", address: newAddress });
    }
  } catch (error) {
    console.error("Error updating/creating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUsername = async (req, res) => {
  try {
    // Assuming you pass the user's email as a parameter in the request
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ username: user.username });
  } catch (error) {
    console.error('Error fetching username:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
  wallet,
};
