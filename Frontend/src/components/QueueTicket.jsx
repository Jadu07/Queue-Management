

import React from 'react';
import './QueueTicket.css';

function QueueTicket({ queueData, currentServing, onReset }) {
  if (!queueData) return null;

  const position = queueData.queueNumber - currentServing;

  return (
    <div className="queue-container">
      <div className="status-card">

        <h2 className="heading">Queue Status</h2>

        <div className="now-serving-group">
          <div className="now-serving">
            <h1 className="serving-number">#{currentServing}</h1>
            <p className="serving-label">Now Serving</p>
          </div>

          <div className="now-serving">
            <h1 className="serving-number"># {position}</h1>
            <p className="serving-label">People Ahead</p>
          </div>
        </div>

      </div>

      <div className="ticket-card">
        <h1 className="ticket-number">#{queueData.queueNumber}</h1>
        <div className={`status-badge ${queueData.status?.toLowerCase() || ''}`}>
          {queueData.status}
        </div>
        <p className="ticket-name">{queueData.name}</p>
        <div className="queue-info">
          <span>👥 {position > 0 ? `${position} ahead` : 'Your turn!'}</span>
        </div>
      </div>

      <div className="tip-box">
        💡 <strong>Tip:</strong> Scan the QR code at the counter to join instantly
      </div>

      <button className="new-queue-btn" onClick={onReset}>
        Join New Queue
      </button>
    </div>
  );
}

export default QueueTicket;
