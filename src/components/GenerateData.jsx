/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from './layout/Modal';

const GenerateData = ({ onGenerate }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    typeofaction: '',
    sourceid: '',
    destinationid: '',
    amountofmoney: '',
    date: '',
    typeoffraud: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://api.autogon.ai/api/v1/models/generate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: Object.values(formData) }),
    });

    const data = await response.json();
    if (data.status) {
      onGenerate(data.data);
    } else {
      console.error('Failed to generate CSV');
    }

    setShowModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Generate Data</button>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Generate CSV Data</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="typeofaction"
            value={formData.typeofaction}
            onChange={handleChange}
            placeholder="e.g cash or transfer"
          />
          <input
            type="text"
            name="sourceid"
            value={formData.sourceid}
            onChange={handleChange}
            placeholder="Source ID. e.g 54874"
          />
          <input
            type="text"
            name="destinationid"
            value={formData.destinationid}
            onChange={handleChange}
            placeholder="Destination ID e.g 59074"
          />
          <input
            type="text"
            name="amountofmoney"
            value={formData.amountofmoney}
            onChange={handleChange}
            placeholder="Amount e.g 478195"
          />
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="2019-04-30 8:05:00"
          />
          <input
            type="text"
            name="typeoffraud"
            value={formData.typeoffraud}
            onChange={handleChange}
            placeholder="Type 1 or type 2 or none"
          />
          <button type="submit">Generate</button>
        </form>
      </Modal>
    </div>
  );
};

export default GenerateData;