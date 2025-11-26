import { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      alert('Login successful!');
      localStorage.setItem("token",data.token);
      localStorage.setItem("loggedInUser", JSON.stringify(data));
      localStorage.setItem("userEmail",data.user.email);
      navigate('/'); // or /home or dashboard
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong. Try again.');
  }
};
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>

      </form>
    </div>
  );
}

export default Login;