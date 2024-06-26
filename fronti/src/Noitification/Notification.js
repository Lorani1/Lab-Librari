import React, { useEffect, useState } from 'react';
import notificationService from './notificationService'; 
import { Container, ListGroup, Button, Modal } from 'react-bootstrap'; 
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

      if (notificationsData && notificationsData.$values) {
        setNotifications(notificationsData.$values); 
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
    return <Container>Loading...</Container>; 
  }

  if (error) {
    return <Container>Error: {error}</Container>; 
  }

  return (
    <Modal show={showModal} onHide={toggleModal} dialogClassName="modal-dialog-centered">
      <Modal.Header className="justify-content-center " style={{ borderBottom: 'none', color: 'white', backgroundColor: '#001524' }}>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-white" style={{ color: 'white' }}>
        {notifications.length > 0 ? (
          <ListGroup>
            {notifications.map((notification) => (
              <ListGroup.Item key={notification.notificationId}  style={{ color: 'white', backgroundColor: '#001524' }}>
                <p>Message: {notification.message}</p>
                <p>Status: {notification.isRead ? 'Read' : 'Not Read'}</p>
                <p>Client ID: {notification.klientId}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No notifications found.</p>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-white" style={{ borderTop: 'none', color: 'white' }}>
        <Button variant="current" onClick={toggleModal}
         style={{ backgroundColor: '#001524', color: '#fff' }}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Notification;
