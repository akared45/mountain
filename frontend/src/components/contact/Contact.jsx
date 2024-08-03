  // src/ContactUs.js
  import React, { useState } from 'react';
  import '../../style/Contact.css';

  const Contact = () => {
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log({ title, firstName, lastName, email, phone, address, address2, city, state, zip, message });
      setTitle('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setAddress2('');
      setCity('');
      setState('');
      setZip('');
      setMessage('');
    };

    return (
      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <h2>Contact Us</h2>
          <p>Please complete all information below:</p>
          {/* <label>
            Name
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Mr./Mrs./Ms."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </label>
          <label>
            E-mail
            <input
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label> */}
          <label>
            Phone
            <input
              type="tel"
              placeholder="(000) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          {/* <label>
            Address
            <input
              type="text"
              placeholder="Street Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Street Address Line 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="State / Province"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Postal / Zip Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          /> */}
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

  export default Contact;
