/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from './layout/Modal';

const GenerateData = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    typeofaction: '',
    sourceid: '',
    destinationid: '',
    amountofmoney: '',
    date: '',
    typeoffraud: '',
  });
  const [generatedData, setGeneratedData] = useState('');
  const [errors, setErrors] = useState({});

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      // Clear error when the user types
      [e.target.name]: '', 
    });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const response = await fetch(`${BASE_URL}/models/generate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Aug-Key': API_KEY,
      },
      body: JSON.stringify({ data: Object.values(formData) }),
    });

    const data = await response.json();
    if (data.status) {
      setGeneratedData(data.data);
      setFormData({
        typeofaction: '',
        sourceid: '',
        destinationid: '',
        amountofmoney: '',
        date: '',
        typeoffraud: '',
      });
    } else {
      console.error('Failed to generate CSV');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedData).then(() => {
      alert('CSV data copied to clipboard');
    });
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Generate CSV Data</button>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 className="heading">Generate CSV Data</h2>
        <form onSubmit={handleSubmit} className="generate-form">
          <label>
            Type of Action
            <input
              type="text"
              name="typeofaction"
              value={formData.typeofaction}
              onChange={handleChange}
              placeholder="e.g cash or transfer"
            />
            {errors.typeofaction && <p style={{ color: 'red' }}>{errors.typeofaction}</p>}
          </label>
          <label>
            Source ID
            <input
              type="number"
              name="sourceid"
              value={formData.sourceid}
              onChange={handleChange}
              placeholder="Source ID. e.g 54874"
            />
            {errors.sourceid && <p style={{ color: 'red' }}>{errors.sourceid}</p>}
          </label>
          <label>
            Destination ID
            <input
              type="number"
              name="destinationid"
              value={formData.destinationid}
              onChange={handleChange}
              placeholder="Destination ID e.g 59074"
            />
            {errors.destinationid && <p style={{ color: 'red' }}>{errors.destinationid}</p>}
          </label>
          <label>
            Amount of Money
            <input
              type="number"
              name="amountofmoney"
              value={formData.amountofmoney}
              onChange={handleChange}
              placeholder="Amount e.g 478195"
            />
            {errors.amountofmoney && <p style={{ color: 'red' }}>{errors.amountofmoney}</p>}
          </label>
          <label>
            Date
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="2019-04-30 8:05:00"
            />
            {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
          </label>
          <label>
            Type of Fraud
            <input
              type="text"
              name="typeoffraud"
              value={formData.typeoffraud}
              onChange={handleChange}
              placeholder="Type 1 or type 2 or none"
            />
            {errors.typeoffraud && <p style={{ color: 'black' }}>{errors.typeoffraud}</p>}
          </label>
          <button type="submit" className="center-button">Generate</button>
        </form>
        {generatedData && (
          <div className="copy-section">
            <p>Generated CSV Data:</p>
            <input type="text" value={generatedData} readOnly />
            <button onClick={handleCopy}>Copy to Clipboard</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default GenerateData;