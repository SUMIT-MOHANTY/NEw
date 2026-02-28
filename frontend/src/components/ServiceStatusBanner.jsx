import { useServiceStatus } from '../contexts/ServiceStatusContext';

const ServiceStatusBanner = () => {
  const { status } = useServiceStatus();
  const isOffline = status.database === 'disconnected';

  if (status.database === 'connected') return null;

  return (
    <div style={{
      background: isOffline ? '#fff3cd' : '#e7f3ff',
      borderBottom: '1px solid',
      borderColor: isOffline ? '#ffc107' : '#0d6efd',
      padding: '8px 16px',
      textAlign: 'center',
      fontSize: '14px'
    }}>
      {isOffline ? (
        <>Running in offline mode - history will not be saved</>
      ) : (
        <>Checking service status...</>
      )}
    </div>
  );
};

export default ServiceStatusBanner;
