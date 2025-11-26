import "./BookAppointment.css";
import { useState } from "react";

function BookAppointment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

 // ✅ Make the function async
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token"); // 🔐 Get token from login

    if (!token) {
      alert("You must be logged in to book an appointment.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/book-appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ send token here
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Appointment booked successfully!");

      // Clear the form
      setFormData({
        name: "",
        email: "",
        phone: "",
        doctor: "",
        date: "",
        message: "",
      });
    } else {
      alert("❌ Booking failed: " + (data.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    alert("Something went wrong. Try again.");
  }
};

  return (
    <div className="book-container">
      <h2 className="book-heading">Book an Appointment</h2>

      <form className="book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
          />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={handleChange}
        />
  

        <select
          name="doctor"
          required
          value={formData.doctor}
          onChange={handleChange}
        >
          <option value="">Select Doctor</option>
          <option value="Dr. Nandini Sharma">Dr. Nandini Sharma</option>
          <option value="Dr. Arjun Rao">Dr. Arjun Rao</option>
          <option value="Dr. Kavya Das">Dr. Kavya Das</option>
          <option value="Dr. Rohan Metha">Dr. Rohan Metha</option>
          <option value="Dr. Sneha Iyer">Dr. Sneha Iyer</option>
          <option value="Dr. Anil Kapoor">Dr. Anil Kapoor</option>
          <option value="Dr. Priya Verma">Dr. Priya Verma</option>
          <option value="Dr. Vikram Joshi">Dr. Vikram Joshi</option>
          <option value="Dr. Meera Nair">Dr. Meera Nair</option>
          <option value="Dr. Ravi Khanna">Dr. Ravi Khanna</option>
        </select>

        <input
          type="date"
          name="date"
          required
          value={formData.date}
       onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Describe your issue"
          rows="4"
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BookAppointment;