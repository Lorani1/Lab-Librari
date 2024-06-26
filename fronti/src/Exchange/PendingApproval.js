import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import apiService from "./apiService";
import "../dashboard/styles.css";

const PendingApproval = () => {
  const [exchanges, setExchanges] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPendingExchanges();
  }, []);

  const fetchPendingExchanges = async () => {
    try {
      const response = await apiService.getPendingApprovalExchangesLast24To48Hours();
      const allExchanges = response.$values;

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
                <td>{exchange.klient?.klientId ?? 'N/A'}</td>
                <td>{exchange.klient?.emri ?? 'N/A'}</td>
                <td>{exchange.klient?.email ?? 'N/A'}</td>
                <td>{exchange.libri?.libriId ?? 'N/A'}</td>
                <td>{exchange.libri?.isbn ?? 'N/A'}</td>
                <td>{exchange.libri?.titulli ?? 'N/A'}</td>
                <td>{exchange.status}</td>
                <td>{new Date(exchange.exchangeDate).toLocaleDateString()}</td>
                <td>{new Date(exchange.returnDate).toLocaleDateString()}</td>
                <td>
                  <Button
                    className="edit-button"
                    variant="current"
                    onClick={() => handleApproveClick(exchange.exchangeId)}
                  >
                    Approve
                  </Button>
                  <Button
                    className="delete-button"
                    variant="current"
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleApproveExchange}>
            Approve Exchange
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PendingApproval;
