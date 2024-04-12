import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Home from "./Home";
import Client from "./Client";
import CRUD from "./CRUD"; // Import User component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Libri from "./Libri";

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* Wrap your entire component tree with BrowserRouter */}
      <div className="d-flex">
        <div className="w-auto">
          <Sidebar />
        </div>
        <div className="col overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              }
            ></Route>
            <Route
              path="/users"
              element={
                <>
                  <Navbar />
                  <CRUD />
                </>
              }
            ></Route>
            <Route
              path="/libri"
              element={
                <>
                  <Navbar />
                  <Libri />
                </>
              }
            ></Route>
            <Route
              path="/Client"
              element={
                <>
                  <Navbar />
                  <Client />
                </>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
