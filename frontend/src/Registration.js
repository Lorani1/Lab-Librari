import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pexelsImage from "./images/loginpic.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";

function Registration() {
  const [Emri, setEmri] = useState("");
  const [Mbiemri, setMbiemri] = useState("");
  const [NrPersonal, setNrPersonal] = useState("");
  const [Email, setEmail] = useState("");
  const [Adresa, setAdresa] = useState("");
  const [Statusi, setStatusi] = useState("");
  const [NrTel, setNrTel] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmriChange = (value) => {
    setEmri(value);
  };

  const handleMbiemriChange = (value) => {
    setMbiemri(value);
  };

  const handleNrPersonalChange = (value) => {
    setNrPersonal(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleAdresaChange = (value) => {
    setAdresa(value);
  };

  const handleStatusiChange = (value) => {
    setStatusi(value);
  };

  const handleNrTelChange = (value) => {
    setNrTel(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const handleSave = () => {
    setErrorMessage("");

    if (
      Emri.trim() === "" ||
      Mbiemri.trim() === "" ||
      NrPersonal.trim() === "" ||
      Email.trim() === "" ||
      Adresa.trim() === "" ||
      Statusi.trim() === "" ||
      NrTel.trim() === "" ||
      Password.trim() === "" ||
      ConfirmPassword.trim() === ""
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    // const nameRegex = /^[A-Z][a-z]*$/;
    // if (!nameRegex.test(Emri)) {
    //   toast.error("Name should start with a capital letter");
    //   return;
    // }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(Email)) {
    //   toast.error("Invalid email format");
    //   return;
    // }

    // if (NrPersonal.trim().length !== 10) {
    //   toast.error("NrPersonal should be 10 characters long");
    //   return;
    // }

    // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    // if (!passwordRegex.test(Password)) {
    //   toast.error("Password should contain at least one letter and one number");
    //   return;
    // }

    if (Password.trim() !== ConfirmPassword.trim()) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      Emri: Emri,
      Mbiemri: Mbiemri,
      NrPersonal: NrPersonal,
      Email: Email,
      Adresa: Adresa,
      Statusi: Statusi,
      NrTel: NrTel,
      Password: Password,
      ConfirmPassword: ConfirmPassword,
    };
    const url = "https://localhost:7101/api/Klient";

    axios
      .post(url, data)
      .then((result) => {
        toast.success(result.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Fragment>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="row">
          <div className="col-md-6">
            <img
              src={pexelsImage}
              alt="Image"
              style={{ maxWidth: "100%", height: "100%" }}
            />
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div
              className="card p-4"
              style={{ width: "600px", maxWidth: "80%" }}
            >
              <h1
                className="text-center mb-4"
                style={{ fontFamily: "Segoe Script" }}
              >
                Register
              </h1>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <form onSubmit={handleSave}>
                <div className="row mb-3">
                  <div className="col">
                    <label>Emri dhe Mbiemri:</label>
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control custom-input mb-4"
                        value={Emri}
                        onChange={(e) => handleEmriChange(e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control custom-input mb-4"
                        value={Mbiemri}
                        onChange={(e) => handleMbiemriChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label>NrPersonal:</label>
                    <input
                      type="text"
                      className="form-control custom-input mb-4"
                      value={NrPersonal}
                      onChange={(e) => handleNrPersonalChange(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label>Email:</label>
                    <input
                      type="email"
                      className="form-control custom-input mb-4"
                      value={Email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label>Statusi:</label>
                    <input
                      type="text"
                      className="form-control custom-input mb-4"
                      value={Statusi}
                      onChange={(e) => handleStatusiChange(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label>Adresa:</label>
                    <input
                      type="text"
                      className="form-control custom-input mb-4"
                      value={Adresa}
                      onChange={(e) => handleAdresaChange(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label>NrTel:</label>
                    <input
                      type="text"
                      className="form-control custom-input mb-4"
                      value={NrTel}
                      onChange={(e) => handleNrTelChange(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label>Password:</label>
                    <input
                      type="password"
                      className="form-control custom-input mb-4"
                      value={Password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label>Confirm Password:</label>
                    <input
                      type="password"
                      className="form-control custom-input mb-4"
                      value={ConfirmPassword}
                      onChange={(e) =>
                        handleConfirmPasswordChange(e.target.value)
                      }
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mb-3 custom-btn"
                >
                  Register
                </button>
              </form>
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "black", textDecoration: "none" }}
                  onClick={(e) => {
                    e.currentTarget.style.color = "purple";
                  }}
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .custom-input {
            border-top: 0;
            border-right: 0;
            border-left: 0;
            border-bottom: 1px solid black;
            background-color: transparent;
            outline: none;
            border-radius: 0;
          }
  
          .custom-input:focus {
            border-bottom: 1px solid black;
          }
  
          .custom-btn {
            padding: 10px 20px;
            border-radius: 0;
            background-color: black;
            color: white;
          }
  
          .custom-btn:hover {
            color: black;
            background-color: white;
            border: none;
          }
        `}
      </style>
    </Fragment>
  );
}

export default Registration;
