import React, { useState, useEffect } from 'react';
import JoinForm from './components/JoinForm';
import QueueTicket from './components/QueueTicket';
import { joinQueue, getServing, getStatus } from './api';

function App() {
  const [queueData, setQueueData] = useState(null);     
  const [currentServing, setCurrentServing] = useState(0); 
  const [error, setError] = useState('');                

  useEffect(() => {
    const saved = localStorage.getItem('queueData');     
    if (saved) {
      setQueueData(JSON.parse(saved));                  
    }
  }, []);

  useEffect(() => {
    if (queueData) {
      localStorage.setItem('queueData', JSON.stringify(queueData)); 
    }
  }, [queueData]);

  
  useEffect(() => {
    const fetchData = async () => {
      const serving = await getServing();
      setCurrentServing(serving.data.current_token_number);

      if (queueData?.id) {
        const status = await getStatus(queueData.id);
        const entry = status.data.entry;
        
        const updatedData = {
            id: entry.id,
            queueNumber: entry.daily_token_number,
            status: entry.status,
            name: entry.name,
            phone: entry.phone
        };
        setQueueData(updatedData);
      }
    };

    fetchData();                                         
    const interval = setInterval(fetchData, 10000);     
    return () => clearInterval(interval);              
  }, [queueData?.id]);

  const handleJoin = async ({ name, phone }) => {
    const response = await joinQueue(name, phone);      
    const entry = response.data;                         

    setQueueData({
      id: entry.id,
      queueNumber: entry.daily_token_number,
      status: entry.status,
      name: entry.name,
      phone: entry.phone
    });

    setError('');                                        
  };

  const handleReset = () => {
    console.log('handleReset called - clearing queue data');
    localStorage.removeItem('queueData');               
    setQueueData(null);                                 
    setError(''); 
    console.log('Queue data cleared successfully');                                       
  };

  return (
    <div>
      <h2>Now Serving: #{currentServing}</h2>
      
      {!queueData ? (
        <JoinForm onJoin={handleJoin} error={error}  /> 
      ) : (
        <QueueTicket 
          queueData={queueData}           
          currentServing={currentServing} 
          onReset={handleReset}          
        />
      )}
    </div>
  );
}

export default App;