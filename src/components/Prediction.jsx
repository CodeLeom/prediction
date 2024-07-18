import { useState } from 'react';
import Spinner from './layout/Spinner';

function Prediction() {
  const [transactionUrl, setTransactionUrl] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const FLOW_ID = import.meta.env.VITE_FLOW_ID;

  const handleChange = (e) => {
    setTransactionUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(`${BASE_URL}/models/production/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Aug-Key': API_KEY,
      },
      body: JSON.stringify({
        flow_id: FLOW_ID,
        data: transactionUrl,
      }),
    });

    const data = await response.json();

    if (data.status) {
      const predResponse = await fetch(data.pred_url);
      const predData = await predResponse.text(); // Assuming the response is a CSV
      setResult(predData);
    } else {
      setResult('Failed to get prediction');
    }
    setTransactionUrl('')
    setIsLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fraud Detection</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={transactionUrl}
            onChange={handleChange}
            placeholder="Enter transaction data URL"
          />
          <button type="submit">Check</button>
        </form>
        {isLoading ? <Spinner /> : result && <p>Result: {result}</p>}
      </header>
    </div>
  );
}

export default Prediction;