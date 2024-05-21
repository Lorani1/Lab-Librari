import React from "react";
import { Navbar, Nav, Badge } from "react-bootstrap";
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/circles.png";

const CustomNavbar = ({ totalItems }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand as={Link} to="/">
        <img
          src={logo}
          alt="Book Store App"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        <span
          className="font-weight-bold text-uppercase"
          style={{ fontSize: "1.5em" }}
        >
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
