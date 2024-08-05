import React, { useState } from "react";
import "../../style/ContactUs.css";

const ContactUs = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    const phoneRegex = /^\(\+84\)-\d{9,10}$/;

    if (!phoneRegex.test(phone)) {
      tempErrors.phone = "Phone number must be in the format (+84)-XXXXXXXXX.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log({
        phone,
        message,
      });
      setPhone("");
      setMessage("");
    }
  };

  return (
    <div className="contact-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <h2>Contact Us</h2>
        <p>Please complete all information below:</p>
        <label>
          Phone
          <input
            type="tel"
            placeholder="(+84)-"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </label>
        <label>
          Comments, Questions, or Suggestions
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
