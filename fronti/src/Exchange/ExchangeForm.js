import React, { useState, useEffect } from 'react';
import apiService from './apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';

const ExchangeForm = ({ open, onClose, libriId }) => {
  const [nrPersonal, setNrPersonal] = useState('');
  const [status, setStatus] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Reset form fields when modal opens or libriId changes
    setNrPersonal('');
    setStatus('');
  }, [open, libriId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const exchangeDTO = { nrPersonal, libriId, status };

    try {
      await apiService.createExchange(exchangeDTO);
      setShowToast(true); // Show success toast after submission
      setErrorMessage(''); // Clear any previous error message
      onClose(); // Close the modal after submission
    } catch (error) {
      setErrorMessage(error.response ? error.response.data : 'Error creating exchange.');
    }
  };

  const handleToastClose = () => setShowToast(false);

  return (
    <>
      <Modal show={open} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Exchange</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNrPersonal">
              <Form.Label>Nr Personal:</Form.Label>
              <Form.Control
                type="text"
                value={nrPersonal}
                onChange={(e) => setNrPersonal(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLibriId">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                value={libriId}
                readOnly
                hidden
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Exchange
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Toast
        show={showToast}
        onClose={handleToastClose}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          minWidth: '250px',
          zIndex: 9999,
        }}
      >
        <Toast.Header closeButton={false} className="bg-warning text-white">
          <strong className="me-auto">Exchange Submitted</strong>
        </Toast.Header>
        <Toast.Body>
          Exchange has been sent for approval. Please obtain the book from one of our libraries within the next 24 hours.
        </Toast.Body>
      </Toast>
    </>
  );
};

export default ExchangeForm;
