import React from 'react';

function QueueTicket({ queueData, currentServing, onReset }) {

  const position = queueData.queueNumber - currentServing;

  return (
    <div>
      <h1>#{queueData.queueNumber}</h1>
      <p>{queueData.name}</p>
      <p>Status: {queueData.status}</p>
      <p>{position} people ahead</p>
      
      <button onClick={onReset}>New Queue</button>
    </div>
  );
}

export default QueueTicket;