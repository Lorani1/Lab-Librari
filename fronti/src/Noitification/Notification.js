import React, { useEffect, useState } from 'react';
import notificationService from './notificationService'; // Import your notification service
import { Container, ListGroup, Button, Modal } from 'react-bootstrap'; // Example imports, adjust as needed
import 'bootstrap/dist/css/bootstrap.min.css';

const Notification = ({ showModal, toggleModal }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      console.log('Fetching notifications...');
      const notificationsData = await notificationService.fetchNotifications();
      console.log('Notifications data:', notificationsData);

      // Assuming notificationsData is in the format { $id: '1', $values: [...] }
      if (notificationsData && notificationsData.$values) {
        setNotifications(notificationsData.$values); // Set notifications to $values array
      } else {
        console.error('Invalid notifications data structure:', notificationsData);
        setError('Invalid notifications data structure');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Error fetching notifications');
      setLoading(false);
    }
  };

  if (loading) {
    return <Container>Loading...</Container>; // Display loading indicator
  }

  if (error) {
    return <Container>Error: {error}</Container>; // Display error message
  }

  return (
    <Modal show={showModal} onHide={toggleModal} dialogClassName="modal-dialog-centered">
      <Modal.Header className="justify-content-center bg-dark" style={{ borderBottom: 'none', color: 'white' }}>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark" style={{ color: 'white' }}>
        {notifications.length > 0 ? (
          <ListGroup>
            {notifications.map((notification) => (
              <ListGroup.Item key={notification.notificationId} className="bg-dark" style={{ color: 'white' }}>
                <p>Message: {notification.message}</p>
                <p>Status: {notification.isRead ? 'Not Read' : 'Read'}</p>
                <p>Client ID: {notification.klientId}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No notifications found.</p>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-dark" style={{ borderTop: 'none', color: 'white' }}>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Notification;
