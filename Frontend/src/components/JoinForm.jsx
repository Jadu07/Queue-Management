import React, { useState } from 'react';
import './JoinForm.css';

function JoinForm({ onJoin, currentServing }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onJoin({ name, phone });
  };

  return (
    <div className="queue-container">
      <div className="queue-status-card">
        <h2 className="queue-title">Queue Status</h2>
        <div className="queue-box">
          <h1 className="queue-number"># {currentServing || 0}</h1>
          <p className="queue-text">Now Serving</p>
        </div>
      </div>

      <div className="queue-join-card">
        <h2 className="join-title">Join the Queue</h2>
        <form className="join-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button type="submit" className="join-btn">✓ Join Queue</button>
        </form>
      </div>
    </div>
  );
}

export default JoinForm;
