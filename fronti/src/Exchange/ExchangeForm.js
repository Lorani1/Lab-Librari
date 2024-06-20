import React, { useState, useEffect } from 'react';
import apiService from './apiService'; // Import the default export object
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ExchangeForm = ({ exchange, onFormSubmit }) => {
  const [nrPersonal, setNrPersonal] = useState('');
  const [libriId, setLibriId] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (exchange) {
      setNrPersonal(exchange.nrPersonal);
      setLibriId(exchange.libriId);
      setStatus(exchange.status);
    } else {
      setNrPersonal('');
      setLibriId('');
      setStatus('');
    }
  }, [exchange]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const exchangeDTO = { nrPersonal, libriId, status };
    
    if (exchange) {
      await apiService.updateExchange(exchange.exchangeId, exchangeDTO); // Use the methods from apiService
    } else {
      await apiService.createExchange(exchangeDTO);
    }
    
    if (typeof onFormSubmit === 'function') {
      onFormSubmit();
    }
  };
  
  return (
    <Container className="mt-5">
      <h2>{exchange ? 'Update' : 'Create'} Exchange</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formNrPersonal">
          <Form.Label column sm="2">Nr Personal:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={nrPersonal}
              onChange={(e) => setNrPersonal(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formLibriId">
          <Form.Label column sm="2">Libri ID:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={libriId}
              onChange={(e) => setLibriId(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
       
        <Button variant="primary" type="submit">
          {exchange ? 'Update' : 'Create'} Exchange
        </Button>
      </Form>
    </Container>
  );
};

export default ExchangeForm;
