import React from 'react';
import { useHistory } from '../hooks/useHistory';
import './HistoryList.css';

const HistoryList = ({ refreshTrigger = 0 }) => {
  const { history, loading, error } = useHistory(refreshTrigger);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="history-list">
        <h2 className="history-list__title">Calculation History</h2>
        <div className="history-list__loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-list">
        <h2 className="history-list__title">Calculation History</h2>
        <div className="history-list__error">{error}</div>
      </div>
    );
  }

  return (
    <div className="history-list">
      <h2 className="history-list__title">Calculation History</h2>
      {history.length === 0 ? (
        <div className="history-list__empty">
          No calculation history yet. Start calculating!
        </div>
      ) : (
        <ul className="history-list__items">
          {history.map((item) => (
            <li key={item.id} className="history-list__item">
              <div className="history-list__expression">{item.expression}</div>
              <div className="history-list__result">= {item.result}</div>
              <div className="history-list__timestamp">
                {formatTimestamp(item.createdAt)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryList;
