import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import apiService from "./apiService";
import "../dashboard/styles.css";
const ExchangeApprove = () => {
  const [exchanges, setExchanges] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPendingExchanges();
  }, []);

  const fetchPendingExchanges = async () => {
    try {
      const response = await apiService.getAllExchanges();
      const allExchanges = response.data.$values;

      if (Array.isArray(allExchanges)) {
        const pendingExchanges = allExchanges.filter(
          (exchange) => exchange.status === "Pending Approval"
        );
        setExchanges(pendingExchanges);
      } else {
        console.error(
          "Expected an array of exchanges but received:",
          allExchanges
        );
      }
    } catch (error) {
      console.error("Error fetching pending approval exchanges:", error);
    }
  };

  const handleApproveClick = (exchangeId) => {
    const selected = exchanges.find(
      (exchange) => exchange.exchangeId === exchangeId
    );
    setSelectedExchange(selected);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExchange(null);
  };

  const handleApproveExchange = async () => {
    try {
      await apiService.approveExchange(selectedExchange.exchangeId);
      fetchPendingExchanges(); // Refresh the list after approval
      handleCloseModal();
    } catch (error) {
      console.error("Error approving exchange:", error);
    }
  };

  const handleDelete = async (exchangeId) => {
    try {
      await apiService.deleteExchange(exchangeId);
      setExchanges(
        exchanges.filter((exchange) => exchange.exchangeId !== exchangeId)
      );
    } catch (error) {
      console.error(`Error deleting exchange with ID ${exchangeId}:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedExchange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <h2>Pending Approval Exchanges</h2>
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
            {exchanges.map((exchange) => (
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
                  <Button
                    className="mr-2 edit-button"
                    variant="custom"
                    onClick={() => handleApproveClick(exchange.exchangeId)}
                  >
                    Approve
                  </Button>
                  <Button
                    className="mr-3 delete-button"
                    variant="custom"
                    onClick={() => handleDelete(exchange.exchangeId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Exchange</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to approve this exchange?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="custom" className="delete-button" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="custom" className="edit-button" onClick={handleApproveExchange}>
            Approve Exchange
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExchangeApprove;
