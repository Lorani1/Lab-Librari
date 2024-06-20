import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import apiService from './apiService';

const ExchangeList = () => {
  const [exchanges, setExchanges] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchExchanges();
  }, []);

  const fetchExchanges = async () => {
    try {
      const response = await apiService.getAllExchanges();
      console.log('Full API Response:', response);
      const allExchanges = response.data.$values;

      if (Array.isArray(allExchanges)) {
        setExchanges(allExchanges);
      } else {
        console.error('Expected an array of exchanges but received:', allExchanges);
      }
    } catch (error) {
      console.error('Error fetching exchanges:', error);
    }
  };

  const handleEdit = (exchange) => {
    setSelectedExchange(exchange);
    setShowEditModal(true);
  };

  const handleDelete = async (exchangeId) => {
    try {
      await apiService.deleteExchange(exchangeId);
      setExchanges(exchanges.filter(exchange => exchange.exchangeId !== exchangeId));
    } catch (error) {
      console.error(`Error deleting exchange with ID ${exchangeId}:`, error);
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setSelectedExchange((prevExchange) => ({
      ...prevExchange,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await apiService.updateExchange(selectedExchange.exchangeId, selectedExchange);
      setShowEditModal(false);
      fetchExchanges(); // Refresh the list after update
    } catch (error) {
      console.error('Error updating exchange:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Exchanges</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Klient ID</th>
              <th>Emri</th>
              <th>Email</th>
              <th>Libri ID</th>
              <th>ISBN</th>
              <th>Titulli</th>
              <th>Status</th>
              <th>Exchange Date</th>
              <th>Return Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exchanges.map(exchange => (
              <tr key={exchange.exchangeId}>
                <td>{exchange.klient.klientId}</td>
                <td>{exchange.klient.emri}</td>
                <td>{exchange.klient.email}</td>
                <td>{exchange.libri.libriId}</td>
                <td>{exchange.libri.isbn}</td>
                <td>{exchange.libri.titulli}</td>
                <td>{exchange.status}</td>
                <td>{new Date(exchange.exchangeDate).toLocaleDateString()}</td>
                <td>{new Date(exchange.returnDate).toLocaleDateString()}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(exchange)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(exchange.exchangeId)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Exchange</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedExchange && (
            <Form>
              <Form.Group controlId="formKlientId">
                <Form.Label>Klient ID</Form.Label>
                <Form.Control
                  type="text"
                  name="klientId"
                  value={selectedExchange.klientId}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="formLibriId">
                <Form.Label>Libri ID</Form.Label>
                <Form.Control
                  type="text"
                  name="libriId"
                  value={selectedExchange.libriId}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  value={selectedExchange.status}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="formExchangeDate">
                <Form.Label>Exchange Date</Form.Label>
                <Form.Control
                  type="date"
                  name="exchangeDate"
                  value={new Date(selectedExchange.exchangeDate).toISOString().split('T')[0]}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="formReturnDate">
                <Form.Label>Return Date</Form.Label>
                <Form.Control
                  type="date"
                  name="returnDate"
                  value={new Date(selectedExchange.returnDate).toISOString().split('T')[0]}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExchangeList;
