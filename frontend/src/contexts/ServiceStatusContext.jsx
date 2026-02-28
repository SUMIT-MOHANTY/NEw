import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const ServiceStatusContext = createContext();

export const ServiceStatusProvider = ({ children }) => {
  const [status, setStatus] = useState({
    database: 'unconfigured',
    auth: 'unconfigured',
    lastChecked: null
  });

  const checkStatus = async () => {
    try {
      const res = await apiClient.get('/api/v1/health');
      setStatus(res.data);
    } catch (err) {
      setStatus(prev => ({
        ...prev,
        database: 'disconnected',
        lastChecked: new Date().toISOString()
      }));
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ServiceStatusContext.Provider value={{ status, checkStatus }}>
      {children}
    </ServiceStatusContext.Provider>
  );
};

export const useServiceStatus = () => useContext(ServiceStatusContext);
