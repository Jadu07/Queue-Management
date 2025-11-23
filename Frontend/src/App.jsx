import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoinForm from './components/JoinForm';
import QueueTicket from './components/QueueTicket';
import { joinQueue, getServing, getStatus, getBusinessDetails } from './api';

function App() {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const [queueData, setQueueData] = useState(null);     
  const [currentServing, setCurrentServing] = useState(0); 
  const [error, setError] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [joiningLoading, setJoiningLoading] = useState(false);
  const [businessNotFound, setBusinessNotFound] = useState(false);                

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
    if (businessId) {
      setIsLoading(true);
      setBusinessNotFound(false);
      console.log('Fetching business details for ID:', businessId);
      getBusinessDetails(businessId).then(res => {
        console.log('Business details response:', res);
        if (res.status === 200 && res.data) {
          console.log('Setting business name:', res.data.name);
          setBusinessName(res.data.name);
          setBusinessNotFound(false);
        } else if (res.status === 404) {
          setBusinessNotFound(true);
          navigate('/enter-business-id');
        }
        setIsLoading(false);
      }).catch(err => {
        console.error('Failed to fetch business details:', err);
        setBusinessName('');
        setBusinessNotFound(true);
        setIsLoading(false);
        navigate('/enter-business-id');
      });
    } else {
      console.log('No businessId provided');
      navigate('/enter-business-id');
    }
  }, [businessId, navigate]);

  
  useEffect(() => {
    const fetchData = async () => {
      const serving = await getServing(businessId);
      setCurrentServing(serving.data.current_token_number);

      if (queueData?.id) {
        const status = await getStatus(queueData.id);
        const entry = status.data;
        
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
  }, [queueData?.id, businessId]);

  const handleJoin = async ({ name, phone }) => {
    setJoiningLoading(true);
    try {
      const response = await joinQueue(name, phone, businessId);      
      const entry = response.data;                         

      setQueueData({
        id: entry.id,
        queueNumber: entry.daily_token_number,
        status: entry.status,
        name: entry.name,
        phone: entry.phone
      });

      setError('');
    } catch (err) {
      setError('Failed to join queue');
    } finally {
      setJoiningLoading(false);
    }
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
      
      {!queueData ? (
        <JoinForm onJoin={handleJoin} error={error} currentServing={currentServing} businessName={businessName} isLoading={isLoading} joiningLoading={joiningLoading} /> 
      ) : (
        <QueueTicket 
          queueData={queueData}           
          currentServing={currentServing} 
          onReset={handleReset}
          businessName={businessName}
          isLoading={isLoading}          
        />
      )}
    </div>
  );
}

export default App;