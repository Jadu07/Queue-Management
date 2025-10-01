import React, { useState } from 'react';

function JoinForm({ onJoin }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onJoin({ name, phone });
  };

  return (
    <div>
      <h1>Get Token Number:</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default JoinForm;