import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import pexelsImage from "./images/log.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const { login } = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        `https://localhost:7101/api/Klient/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log("Login Response Data:", response.data);

      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.token) {
          localStorage.setItem("authToken", responseData.token);
          console.log("Token set in localStorage:", {
            authToken: localStorage.getItem("authToken"),
          });

          login(responseData.token); // Pass the auth token to the login function
          history.push("/home");
          setEmail("");
          setPassword("");
        } else {
          setErrorMessage("Invalid email or password.");
        }
      } else {
        setErrorMessage("An error occurred while logging in.");
      }
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("An error occurred while logging in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <img
            src={pexelsImage}
            alt="Image"
            style={{ maxWidth: "100%", height: "100%" }}
          />
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center vh-100">
          <div className="card p-4" style={{ width: "600px", maxWidth: "90%" }}>
            <h1
              className="text-center mb-4"
              style={{
                fontSize: "3em",
                color: "#001524",
                fontFamily: "system-ui",
                fontWeight: "bold",
              }}
            >
              Welcome back
            </h1>

            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <form onSubmit={handleLogin}>
              <div className="form-group mb-4">
                <label
                  className="mb-3"
                  style={{
                    fontSize: "1em",
                    color: "#001524",
                    fontFamily: "system-ui",
                    fontWeight: "bold",
                  }}
                >
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control custom-input mb-4"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-group mb-2">
                <label
                  className="mb-2"
                  style={{
                    fontSize: "1em",
                    color: "#001524",
                    fontFamily: "system-ui",
                    fontWeight: "bold",
                  }}
                >
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control custom-input mb-4"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mb-3 custom-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>{" "}
            </form>
            <p
              style={{
                fontSize: "1.1em",
                color: "#001524",
                fontFamily: "system-ui",
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/registration"
                className="text-decoration-none"
                style={{
                  color: "#001524",
                  transition: "color 0.3s ease",
                  fontFamily: "system-ui",
                  fontWeight: "bold",
                }}
              >
                Register
              </Link>
            </p>
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
            color: black; /* Change text color to black on hover */
            background-color: white; /* Change background color to white on hover */
            border: none;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
