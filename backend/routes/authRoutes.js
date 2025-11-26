const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect =require("../middleware/authMiddleware");
const Appointment = require("../models/appointment");

// 🔐 Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Something already exist' });
  }
});

// 🔐 Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({
      token,
      user: {
        _id:user._id,
        username: user.username,
        email:user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// ------------------ Appointment Code Start ------------------


// POST /api/auth/book-appointment
router.post("/book-appointment", protect,async (req, res) => {
  try {
    const { name, email, phone, doctor, date, message } = req.body;

    const appointment = new Appointment({
      user : req.user._id,
      name, email, phone, doctor, date, message });
    await appointment.save();

    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/auth/appointments/:email
router.get("/appointments/:email", async (req, res) => {
  try {
    const appointments = await Appointment.find({ email: req.params.email });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// ------------------ Appointment Code End ------------------
// GET /api/auth/appointments/:email
// ✅ GET Appointments by Email
router.get("/appointments/:email", async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const appointments = await Appointment.find({ email: email });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// 🚫 No token needed — simple delete
router.delete("/delete-appointment/:id", async (req, res) => {
  try {
    const result = await Appointment.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;