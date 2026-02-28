import { useState } from 'react';
import { useCalculator } from '../hooks/useCalculator';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const { result, error, loading, evaluate, clear } = useCalculator();

  const handleEvaluate = async () => {
    if (!expression.trim()) return;
    await evaluate(expression);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEvaluate();
  };

  return (
    <div className="calculator-container" style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
      <h2>Calculator</h2>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter expression (e.g., 2+2*3)"
        style={{ width: '100%', padding: '10px', fontSize: '18px', marginBottom: '10px' }}
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleEvaluate} disabled={loading} style={{ flex: 1, padding: '10px' }}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
        <button onClick={() => { clear(); setExpression(''); }} style={{ padding: '10px' }}>
          Clear
        </button>
      </div>
      {result && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '5px' }}>
          <strong>Result:</strong> {result}
        </div>
      )}
      {error && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f8d7da', borderRadius: '5px', color: '#721c24' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Calculator;
