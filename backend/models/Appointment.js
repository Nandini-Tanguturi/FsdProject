const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // ✅ required for linking
  },
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  doctor: String,
  date: String,
  message: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;