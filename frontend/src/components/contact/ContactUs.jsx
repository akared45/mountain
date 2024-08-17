import React, { useState, useEffect } from "react";
import "../../style/ContactUs.css";
import { InforUser, contact, contactUser } from "../../services/api"; // Ensure contactUser is correctly imported
import { toast } from "react-toastify";

const ContactUs = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [userID, setUserID] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchUserInfo = async () => {
        try {
          const response = await InforUser(token);
          setUserID(response.data.id);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          toast.error("Failed to fetch user info.");
        }
      };
      fetchUserInfo();
    }
  }, [token]);

  const validate = () => {
    let tempErrors = {};
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleContact = async () => {
    try {
      await contact(userID, phone, message); 
      toast.success("Feedback sent successfully!");
    } catch (error) {
      console.error("Error submitting contact info", error);
      toast.error("Failed to send feedback.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      handleContact();
      setPhone("");
      setMessage("");
      setErrors({});
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
