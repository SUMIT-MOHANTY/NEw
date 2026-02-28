import apiClient from '../api/apiClient';

export const evaluateExpression = async (expression) => {
  try {
    const response = await apiClient.post('/calculate', { expression }, {
      timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000')
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Calculation failed');
  }
};

export const fetchHistory = async () => {
  try {
    const response = await apiClient.get('/history', {
      timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000')
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch history');
  }
};

export const saveCalculation = async (expression, result) => {
  try {
    const response = await apiClient.post('/history', { expression, result }, {
      timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000')
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to save calculation');
  }
};
