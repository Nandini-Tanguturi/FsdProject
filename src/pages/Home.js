import React from 'react';
import './Home.css';

function Home() {
  return (

    <div>
      <header style={{ backgroundColor: "#25c6da", padding: "20px", textAlign: "center", color: "white" }}>
        <h1>Book your appointment</h1>
        <p>Your health is our priority</p>
      </header>

      <section style={{ padding: "30px", textAlign: "center" }}>
        <h2>Welcome to Our Clinic</h2>
        <p>We offer the best medical services with expert doctors available for appointments.</p>

        <img
          src="/images/doctor-home.jpg"
          alt="Doctor"
          style={{ width: "350px", marginTop: "20px", borderRadius: "12px" }}
        />
      </section>

      <footer style={{ backgroundColor: "#eee", padding: "10px", textAlign: "center" }}>
        <p>&copy; 2025 Doctor Booking System. All rights reserved.</p>
      </footer>
    </div>
  
 
  );
}

export default Home;