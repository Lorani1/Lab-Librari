import React, { useEffect, useState } from 'react';
import apiService from './apiService'; // Import your exchange service
import { Container, Table } from 'react-bootstrap'; // Example imports, adjust as needed
import 'bootstrap/dist/css/bootstrap.min.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExchanges();
  }, []);

  const fetchExchanges = async () => {
    try {
      console.log('Fetching exchanges...');
      const exchangesData = await apiService.getExchangeById(); 
      console.log('Exchanges data:', exchangesData);

     
      if (exchangesData && exchangesData.$values) {
        setExchanges(exchangesData.$values);
      } else {
        console.error('Invalid exchanges data structure:', exchangesData);
        setError('Invalid exchanges data structure');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exchanges:', error);
      setError('Error fetching exchanges');
      setLoading(false);
    }
  };

  if (loading) {
    return <Container>Loading...</Container>; 
  }

  if (error) {
    return <Container>Error: {error}</Container>; 
  }

  return (
    <Container>
      <h1>Exchanges</h1>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Exchange ID</th>
            <th>Status</th>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Book ID</th>
            <th>Book Title</th>
            <th>Exchange Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {exchanges.length > 0 ? (
            exchanges.map((exchange) => (
              <tr key={exchange.exchangeId}>
                <td>{exchange.exchangeId}</td>
                <td>{exchange.status}</td>
                <td>{exchange.klient?.klientId}</td>
                <td>{exchange.klient?.emri}</td>
                <td>{exchange.libri?.libriId}</td>
                <td>{exchange.libri?.titulli}</td>
                <td>{formatDate(exchange.exchangeDate)}</td>
                <td>{formatDate(exchange.returnDate)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No exchanges found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Exchange;
