const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/seller');


const JWT_SECRET="Ghost"
// Register a seller
const register = async (req, res) => {
  try {
    // Retrieve the registration data from the request body
    const { email, businessName, password } = req.body;

    // Check if the email is already registered
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new seller
    const newSeller = new Seller({
      email,
      businessName,
      password: hashedPassword,
    });

    // Save the seller to the database
    await newSeller.save();

    res.status(201).json({ message: 'Seller registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Seller login
const login = async (req, res) => {
  try {
    // Retrieve the login data from the request body
    const { email, password } = req.body;

    // Check if the seller exists
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ sellerId: seller._id }, JWT_SECRET, {
      expiresIn: '24h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};

// Get the seller's dashboard
const dashboard = (req, res) => {
  // Access the decoded token from the request object
  const sellerId = req.user.sellerId;

  // Retrieve the seller's data from the database or perform any other necessary operations
  // ...

  res.status(200).json({ message: 'Seller dashboard' });
};

// Update seller information
const updateSellerInfo = async (req, res) => {
  try {
    const { address, gst, logo, storeTimings } = req.body;
    const sellerId = req.user.sellerId;

    // Find the seller in the database and update their information
    const seller = await Seller.findByIdAndUpdate(
      sellerId,
      {
        address,
        gst,
        logo,
        storeTimings,
      },
      { new: true }
    );

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json({ message: 'Seller information updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update seller information' });
  }
};

module.exports = { register, login, dashboard, updateSellerInfo };
