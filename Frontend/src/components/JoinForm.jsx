import React, { useState } from 'react';
import { Loader2, User, Clock } from 'lucide-react';
import './JoinForm.css';

function JoinForm({ onJoin, currentServing, businessName, isLoading, joiningLoading }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onJoin({ name, phone });
  };

  return (
    <div className="queue-container">
      {businessName || isLoading ? (
        <div className="business-header">
          {isLoading ? (
            <Loader2 style={{ width: '32px', height: '32px', color: '#6366f1', animation: 'spin 1s linear infinite' }} />
          ) : (
            <div>
              <p style={{ margin: '0 0 0.25rem', fontSize: '0.75rem', fontWeight: '500', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Business Name</p>
              <h1 className="business-name">{businessName}</h1>
            </div>
          )}
        </div>
      ) : null}
      <div className="queue-status-card">
        <h2 className="queue-title">
          <Clock style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
          Queue Status
        </h2>
        <div className="queue-box">
          <h1 className="queue-number"># {currentServing || 0}</h1>
          <p className="queue-text">Now Serving</p>
        </div>
      </div>

      <div className="queue-join-card">
        <h2 className="join-title">
          <User style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
          Join the Queue
        </h2>
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

          <button type="submit" className="join-btn" disabled={joiningLoading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {joiningLoading ? (
              <>
                <Loader2 style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} />
                Joining...
              </>
            ) : (
              <>✓ Join Queue</>
            )}
          </button>
        </form>
        <p className="privacy-note">Your information is kept private and secure.</p>
      </div>
    </div>
  );
}

export default JoinForm;
