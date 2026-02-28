import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

export const useHistory = (refreshTrigger = 0) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/api/v1/history', { params: { limit: 5 } });
      setHistory(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refreshTrigger]);

  return { history, loading, error, refetch: fetchHistory };
};
