import { useState, useCallback } from 'react';
import apiClient from '../api/apiClient';
import { useServiceStatus } from '../contexts/ServiceStatusContext';

export const useCalculator = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { status } = useServiceStatus();

  const evaluate = useCallback(async (expression) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.post('/api/v1/calculator/evaluate', { expression });
      setResult(res.data.result);
      // Try to save to history if DB is available
      if (status.database === 'connected') {
        try {
          await apiClient.post('/api/v1/history', { expression, result: res.data.result });
        } catch (e) {
          console.warn('Could not save history:', e.message);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Calculation failed');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [status.database]);

  const clear = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, error, loading, evaluate, clear };
};
