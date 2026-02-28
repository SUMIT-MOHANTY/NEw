const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:3000';

export const APP_CONFIG = {
  API_BASE_URL,
  WS_URL,
  API_ENDPOINTS: {
    AUTH_LOGIN: '/api/v1/auth/login',
    AUTH_LOGOUT: '/api/v1/auth/logout',
    AUTH_VALIDATE: '/api/v1/auth/validate',
    CALCULATOR_EVALUATE: '/api/v1/calculator/evaluate',
    HISTORY_GET: '/api/v1/history',
    HISTORY_SAVE: '/api/v1/history',
    HEALTH: '/api/v1/health'
  },
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 2
};

export default APP_CONFIG;
