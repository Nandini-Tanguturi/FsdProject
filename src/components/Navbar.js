import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ detects route changes

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setIsLoggedIn(!!user);
  }, [location]); // ✅ re-check login status whenever route changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    alert("Logged out successfully");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">Doctor Booking System</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/doctors">Doctors</Link></li>

          {isLoggedIn && (
            <>
              <li><Link to="/book-appointment">Book Appointment</Link></li>
              <li><Link to="/appointments">My Appointments</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </>
          )}

          {isLoggedIn ? (
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          ) : (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;