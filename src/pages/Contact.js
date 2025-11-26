import "./Contact.css";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you for contacting us, " + formData.name + "!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
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
          type="text" 
          name="subject" 
          placeholder="Subject" 
          required 
          value={formData.subject}
          onChange={handleChange}
        />
        <textarea 
          name="message" 
          placeholder="Your Message" 
          rows="4"
          required
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;