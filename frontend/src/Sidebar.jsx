import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar() {
  const [active, setActive] = useState(1);

  return (
    <div className="sidebar d-flex justify-content-between flex-column bg-dark text-white py-3 ps-3 pe-5 vh-100">
      <div>
        <Link to="/" className="p-3 text-decoration-none text-white">
          <i className="bi bi-code-slash fs-4 me-4"></i>
          <span className="fs-3">Sidebar</span>
        </Link>
        <hr className="text-white mt-2" />
        <ul className="nav nav-pills flex-column">
          <li className="nav-item p-2" onClick={() => setActive(1)}>
            <Link
              to="/"
              className={
                active === 1 ? "active p-1 text-white" : "p-1 text-white"
              }
            >
              <i className="bi bi-speedometer2 me-3 fs-4"></i>
              <span className="fs-4">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item p-2" onClick={() => setActive(2)}>
            <Link
              to="/users"
              className={
                active === 2 ? "active p-1 text-white" : "p-1 text-white"
              }
            >
              <i className="bi bi-people me-3 fs-4"></i>
              <span className="fs-4">Stafi</span>
            </Link>
          </li>
          <li className="nav-item p-2" onClick={() => setActive(3)}>
            <Link
              to="/orders"
              className={
                active === 3 ? "active p-1 text-white" : "p-1 text-white"
              }
            >
              <i className="bi bi-table me-3 fs-4"></i>
              <span className="fs-4">Orders</span>
            </Link>
          </li>
          <li className="nav-item p-2" onClick={() => setActive(4)}>
            <Link
              to="/report"
              className={
                active === 4 ? "active p-1 text-white" : "p-1 text-white"
              }
            >
              <i className="bi bi-grid me-3 fs-4"></i>
              <span className="fs-4">Report</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <hr className="text-white mt-2" />
        <div className="nav-item p-2">
          <a href="#" className="p-1 text-white">
            <i className="bi bi-person-circle me-3 fs-4"></i>
            <span className="fs-4">
              <strong>ErdinA</strong>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;