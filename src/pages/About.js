function About() {
  return (
    <div>
      <header style={{ backgroundColor: "#00796b", color: "#fff", padding: "20px", textAlign: "center" }}>
        <h1>About Us</h1>
      </header>

      <section style={{ padding: "30px", textAlign: "center" }}>
        <h2>Who We Are</h2>
        <p style={{ maxWidth: "600px", margin: "auto" }}>
          We are a healthcare-focused online platform helping patients to easily connect with certified doctors.
          Our mission is to make medical appointments more accessible and faster for everyone.
        </p>

    
      </section>

      <footer style={{ backgroundColor: "#eee", padding: "10px", textAlign: "center" }}>
        <p>&copy; 2025 Doctor Booking System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;