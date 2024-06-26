import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Home from "./Home";
import Client from "./Client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Libri from "./Libri";
import Login from "./Login";
import AUTORICRUD from "./AUTORICRUD";
import Registration from "./Registration";
import Staf from "./Staf";

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
              path="/login"
              element={
                <>
                  <Navbar />
                  <Login />
                </>
              }
            ></Route>
            <Route
              path="/registration"
              element={
                <>
                  <Navbar />
                  <Registration />
                </>
              }
            ></Route>

            <Route
              path="/"
              element={<Navigate to="/login" />}
            ></Route>

            <Route
              path="/home"
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
                  <Staf />
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
            <Route
              path="/Autori"
              element={
                <>
                  <Navbar />
                  <AUTORICRUD />
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
