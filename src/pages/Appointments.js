import { useEffect, useState } from "react";
import "./Appointments.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

 useEffect(() => {
  const fetchAppointments = async () => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    const email = userData?.user?.email;

    if (!email) {
      alert("Please login to view your appointments.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/auth/appointments/${email}`);
      const data = await res.json();

      if (res.ok) {
        setAppointments(data);
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      alert("Failed to fetch appointments.");
    }
  };

  fetchAppointments();
}, []);
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:5000/api/auth/delete-appointment/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      setAppointments((prev) => prev.filter((app) => app._id !== id));
    } else {
      alert("Delete failed: " + data.message);
    }
  } catch (err) {
    alert("Server error during delete.");
  }
};
  return (
    <div className="appointments-container">
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul className="appointment-list">
          {appointments.map((app, index) => (
  <li key={index} className="appointment-item">
    <strong>Name:</strong> {app.name}<br />
    <strong>Email:</strong> {app.email}<br />
    <strong>Phone:</strong> {app.phone}<br />
    <strong>Doctor:</strong> {app.doctor}<br />
    <strong>Date:</strong> {app.date}<br />
    <strong>Message:</strong> {app.message}<br />

    <button className="delete-btn" onClick={() => handleDelete(app._id)}>
      Delete
    </button>
  </li>
))}
        </ul>
      )}
    </div>
  );
}

export default Appointments;