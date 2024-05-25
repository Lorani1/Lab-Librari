import React, { useState, useEffect } from "react";
import { Navbar, Nav, Badge, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/circles.png";
import axios from 'axios';
import { getUserIdFromToken } from './utilities'; // Import the utility function

const CustomNavbar = ({ totalItems }) => {
  const [userInfo, setUserInfo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.log('No auth token found');
          return;
        }
  
        const userId = getUserIdFromToken(token); // Get user ID from token
        console.log('Decoded userId:', userId);
  
        if (userId) {
          const response = await axios.get(`https://localhost:7101/api/Klient/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          console.log('API response:', response.data); // Log the response data to check its structure
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        history.push('/login');
      }
    };
  
    fetchUserInfo();
  }, [history]);
  
  useEffect(() => {
    console.log('User info updated:', userInfo);
  }, [userInfo]);

  const logout = () => {
    localStorage.removeItem('authToken');
    history.push('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand as={Link} to="/">
        <img
          src={logo}
          alt="Book Store App"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        <span className="font-weight-bold text-uppercase" style={{ fontSize: "1.5em" }}>
          BOOKSHOP
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/cart">
            Cart{" "}
            {totalItems > 0 && (
              <Badge pill variant="light">
                {totalItems}
              </Badge>
            )}
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard">
            Dashboard
          </Nav.Link>
          {userInfo && (
            <NavDropdown title={userInfo.emri} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default CustomNavbar;

