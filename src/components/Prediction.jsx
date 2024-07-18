import { useState } from 'react';
import Spinner from './layout/Spinner';
import GenerateData from './GenerateData';

function Prediction() {
  const [transactionUrl, setTransactionUrl] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const FLOW_ID = import.meta.env.VITE_FLOW_ID;

  const handleChange = (e) => {
    setTransactionUrl(e.target.value);
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transactionUrl) {
      setError('The input field is empty');
      return;
    }

    if (!transactionUrl.endsWith('.csv')) {
      setError('Invalid text. The input must be a .csv file');
      return;
    }

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
    setTransactionUrl('');
    setIsLoading(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <nav>
        <h1>Fraud Detection Check</h1>
        <button className="nav-button" onClick={toggleModal}>
          <GenerateData />
        </button>
      </nav>
      <div className="App">
        <header className="App-header">
          <form onSubmit={handleSubmit}>
            <label>
              Transaction Data URL
              <input
                type="text"
                value={transactionUrl}
                onChange={handleChange}
                placeholder="Enter transaction data URL"
              />
            </label>
            <button type="submit">Check</button>
          </form>
          {error && <p style={{ color: 'white' }}>{error}</p>}
          {isLoading ? <Spinner /> : result && <p>Result: {result}</p>}
        </header>
      </div>
    </div>
  );
}

export default Prediction;