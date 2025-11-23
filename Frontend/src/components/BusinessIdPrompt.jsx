import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import './BusinessIdPrompt.css';

function BusinessIdPrompt() {
  const [businessId, setBusinessId] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (businessId.trim()) {
      navigate(`/${businessId.trim()}`);
    }
  };

  return (
    <div className="prompt-container">
      <div className="prompt-card">
        <div className="prompt-icon">
          <Store size={48} color="#010104ff" />
        </div>
               <h1 className="prompt-title">Enter Business ID</h1>
        <p className="prompt-subtitle">Please enter your business ID to continue</p>
        
        <form onSubmit={handleSubmit} className="prompt-form">
          <input
            type="text"
            placeholder={isFocused ? "" : "Business ID"}
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="prompt-input"
            autoFocus
            required
          />
          <button type="submit" className="prompt-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default BusinessIdPrompt;
