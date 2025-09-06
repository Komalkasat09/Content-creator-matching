import { useState, useEffect } from 'react';

type HealthStatus = 'checking' | 'online' | 'offline';

export function useBackendHealth() {
  const [status, setStatus] = useState<HealthStatus>('checking');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/docs', {
          method: 'GET',
          mode: 'no-cors' // This prevents CORS errors when just checking if server is up
        });
        setStatus('online');
      } catch (error) {
        setStatus('offline');
      }
    };

    checkHealth();
    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return status;
}

export function BackendStatusIndicator() {
  const status = useBackendHealth();

  if (status === 'checking') {
    return (
      <div className="flex items-center space-x-2 text-yellow-600">
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
        <span className="text-sm">Checking server...</span>
      </div>
    );
  }

  if (status === 'offline') {
    return (
      <div className="flex items-center space-x-2 text-red-600">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <span className="text-sm">Server offline</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-green-600">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <span className="text-sm">Server online</span>
    </div>
  );
}
