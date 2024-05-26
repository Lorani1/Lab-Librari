// src/components/ExchangeList.js
import React, { useEffect, useState } from 'react';
import { getExchanges, deleteExchange } from './apiService';
import ExchangeForm from './ExchangeForm';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const ExchangeList = () => {
  const [exchanges, setExchanges] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState(null);

  useEffect(() => {
    fetchExchanges();
  }, []);

  const fetchExchanges = async () => {
    const response = await getExchanges();
    setExchanges(response.data);
  };

  const handleDelete = async (id) => {
    await deleteExchange(id);
    fetchExchanges();
  };

  const handleEdit = (exchange) => {
    setSelectedExchange(exchange);
  };

  const handleFormSubmit = () => {
    setSelectedExchange(null);
    fetchExchanges();
  };

  return (
    <div className="container">
      <h1 className="my-4">Exchange List</h1>
      <ExchangeForm exchange={selectedExchange} onFormSubmit={handleFormSubmit} />
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Klient ID</th>
            <th>Libri ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exchanges.map((exchange) => (
            <tr key={exchange.exchangeId}>
              <td>{exchange.klientId}</td>
              <td>{exchange.libriId}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(exchange)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(exchange.exchangeId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExchangeList;
