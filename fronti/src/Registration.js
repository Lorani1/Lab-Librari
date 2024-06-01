import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pexelsImage from "./images/l.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

function Registration() {
  const [qytetiList, setQytetiList] = useState([]);
  const [selectedQytetiID, setSelectedQytetiID] = useState("");

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
  const [selectedFile, setSelectedFile] = useState(null);

  const history = useHistory();

  const handleEmriChange = (value) => setEmri(value);
  const handleMbiemriChange = (value) => setMbiemri(value);
  const handleNrPersonalChange = (value) => setNrPersonal(value);
  const handleEmailChange = (value) => setEmail(value);
  const handleAdresaChange = (value) => setAdresa(value);
  const handleStatusiChange = (value) => setStatusi(value);
  const handleNrTelChange = (value) => setNrTel(value);
  const handleProfileChange = (e) => setSelectedFile(e.target.files[0]);
  const handlePasswordChange = (value) => setPassword(value);
  const handleConfirmPasswordChange = (value) => setConfirmPassword(value);

  const resetForm = () => {
    setEmri("");
    setMbiemri("");
    setNrPersonal("");
    setEmail("");
    setAdresa("");
    setStatusi("");
    setNrTel("");
    setPassword("");
    setConfirmPassword("");
    setSelectedQytetiID("");
    setSelectedFile(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
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
      ConfirmPassword.trim() === "" ||
      selectedQytetiID.trim() === ""
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (Password.trim() !== ConfirmPassword.trim()) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("Emri", Emri);
    formData.append("Mbiemri", Mbiemri);
    formData.append("NrPersonal", NrPersonal);
    formData.append("Email", Email);
    formData.append("Adresa", Adresa);
    formData.append("Statusi", Statusi);
    formData.append("NrTel", NrTel);
    formData.append("Password", Password);
    formData.append("ConfirmPassword", ConfirmPassword);
    formData.append("qytetiId", selectedQytetiID);

    if (selectedFile) {
      formData.append("profilePicturePath", selectedFile);
    }

    const url = "https://localhost:7101/api/Klient";

    axios
      .post(url, formData)
      .then((result) => {
        console.log("Registration success response:", result.data);
        toast.success("Registration successful!", { autoClose: 3000 });
        resetForm();
        setTimeout(() => {
          history.push('/login');
        }, 3000);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
          for (const field in errors) {
            if (Array.isArray(errors[field])) {
              errors[field].forEach((message) => {
                toast.error(message);
              });
            } else {
              toast.error(errors[field]);
            }
          }
        } else {
          toast.error("Registration failed. Please try again.");
        }
      });
  };

  useEffect(() => {
    const getData = () => {
      axios
        .get(`https://localhost:7101/api/Klient`)
        .then((result) => {
          setData(result.data); // You need to define setData if you're using it here
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getQytetiList = () => {
      axios
        .get(`https://localhost:7101/api/Qyteti`)
        .then((result) => {
          const qytetiData = result.data?.$values;
          if (Array.isArray(qytetiData)) {
            setQytetiList(qytetiData);
          } else {
            console.error("Unexpected data format:", result.data);
            toast.error("Failed to fetch city data.");
          }
        })
        .catch((error) => {
          console.error("Error fetching city data:", error);
          toast.error("Failed to fetch city data.");
        });
    };

    getData();
    getQytetiList();
  }, []);

  const handleCityChange = (event) => {
    setSelectedQytetiID(event.target.value);
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 p-0">
  <div className="row w-100 h-100 m-0">
    <div className="col-md-6 d-flex align-items-center justify-content-center p-0">
      <img
        src={pexelsImage}
        alt="Image"
        style={{ width: "100%", height: "100%", objectFit: "cover", margin: "0", padding: "0" }}
      />
    </div>
    <div className="col-md-6 d-flex justify-content-center align-items-center p-0">
      <div
        className="card p-4"
        style={{ width: "600px", maxWidth: "80%", marginTop: "20px", marginBottom: "20px" }}
      >
        <h1
          className="text-center mb-4"
          style={{ fontSize: "3em", color: "#001524", fontFamily: "system-ui", fontWeight: "bold" }}
        >
          Register
        </h1>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form onSubmit={handleSave}>
          <div className="row mb-3">
            <div className="col">
              <label style={{ fontSize: "1em", color: "#001524", fontFamily: "system-ui", fontWeight: "bold" }}>Emri dhe Mbiemri:</label>
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
              <label style={{ fontSize: "1em", color: "#001524", fontFamily: "system-ui", fontWeight: "bold" }}>NrPersonal:</label>
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
              <label style={{ fontSize: "1em", color: "#001524", fontFamily: "system-ui", fontWeight: "bold" }}>Email:</label>
              <input
                type="email"
                className="form-control custom-input mb-4"
                value={Email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
            </div>
            <div className="col">
              <label style={{ fontSize: "1em", color: "#001524", fontFamily: "system-ui", fontWeight: "bold" }}>Statusi:</label>
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
              <label style={{ fontSize: "1em", color: "#001524", fontFamily: "system-ui", fontWeight: "bold" }}>Adresa:</label>
              <input
                type="text"
                className="form-control custom-input mb-4"
                value={Adresa}
                onChange={(e) => handleAdresaChange(e.target.value)}
              />
            </div>
            <div className="col">
              <label style={{ fontSize: "1em", color: "#001524", fontFamily: "system-ui", fontWeight: "bold" }}>NrTel:</label>
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
              <label style={{ fontSize: "1em", color: "#001524", fontFamily: "system-ui", fontWeight: "bold" }}>Password:</label>
              <input
                type="password"
                className="form-control custom-input mb-4"
                value={Password}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
            </div>
            <div className="col">
              <label style={{ fontSize: "1em", color: "#001524", fontFamily: "system-ui", fontWeight: "bold" }}>Confirm Password:</label>
              <input
                type="password"
                className="form-control custom-input mb-4"
                value={ConfirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              />
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="qyteti" style={{ fontSize: "1em", color: "#001524", fontFamily: "system-ui", fontWeight: "bold" }}>Qyteti</label>
                <select
                  onChange={handleCityChange}
                  className="form-control custom-input mb-4"
                >
                  <option value="">Select a city</option>
                  {qytetiList.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.emri}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label style={{ fontSize: "1em", color: "#001524", fontFamily: "system-ui", fontWeight: "bold" }}>Profile Picture:</label>
              <input
                type="file"
                className="form-control custom-input mb-4"
                onChange={handleProfileChange}
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
            style={{ color: "#001524", transition: "color 0.3s ease", fontFamily: "system-ui", fontWeight: "bold" }}
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
      background-color: #001524 !important;
      border: none !important;
    }

    .custom-btn:hover {
      color: black;
      background-color: white;
      border: none;
    }
    /* Add this CSS to your stylesheet */
.toastify.toast-success {
  background-color: blue !important; /* Change background color to blue */
  color: white !important;
}

  `}
</style>

    </Fragment>
  );
}

export default Registration;
