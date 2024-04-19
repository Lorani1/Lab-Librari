// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import b from "./images/images.jpg";
// import Home from "./home";
// import Registration from "./Registration";
// import "./App.css";

// function Login({ onLoginSuccess, isAuthenticated }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setErrorMessage("Email and password are required.");
//       return;
//     }

//     setIsSubmitting(true);
//     setErrorMessage("");

//     try {
//       const response = await axios.post(
//         `https://localhost:7101/api/Klient/login`,
//         {
//           email,
//           password,
//         }
//       );

//       console.log("Login Response Data:", response.data);

//       if (response.status === 200) {
//         const responseData = response.data;
//         if (responseData.id) {
//           navigate("/home");
//           setEmail("");
//           setPassword("");
//         } else {
//           setErrorMessage("Invalid email or password.");
//         }
//       } else {
//         setErrorMessage("An error occurred while logging in.");
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       setErrorMessage("An error occurred while logging in.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/home");
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <div
//       className="container-fluid d-flex justify-content-center align-items-center vh-100"
//       style={{
//         backgroundImage: `url(${b})`,
//         backgroundSize: "cover",
//         height: "100vh",
//       }}
//     >
//       <div className="card p-4" style={{ width: "500px", maxWidth: "90%" }}>
//         <h1 className="text-center mb-4">Welcome back</h1>

//         {errorMessage && (
//           <div className="alert alert-danger">{errorMessage}</div>
//         )}
//         <form onSubmit={handleLogin}>
//           <div className="form-group mb-4">
//             <label className="mb-3">Email:</label>
//             <input
//               type="email"
//               className="form-control custom-input mb-4"
//               value={email}
//               onChange={handleEmailChange}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <label className="mb-2">Password:</label>
//             <input
//               type="password"
//               className="form-control custom-input mb-4"
//               value={password}
//               onChange={handlePasswordChange}
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn btn-primary mb-3 custom-btn"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Logging in..." : "Login"}
//           </button>{" "}
//           <style>
//             {`
//             .custom-input {
//               border-top: 0;
//               border-right: 0;
//               border-left: 0;
//               border-bottom: 1px solid black;
//               background-color: transparent;
//               outline: none;
//               border-radius: 0;
//             }

//             .custom-input:focus {
//               border-bottom: 1px solid black;
//             }
//           .custom-btn {
//             padding: 10px 20px; /* Increase padding to make the button bigger */
//             border-radius: 0; /* Remove border-radius */
//             background-color: black; /* Set background color to black */
//             color: white; /* Set text color to white */
//           }

//           .custom-btn:hover {
//             color: black; /* Change text color to black on hover */
//             background-color: white; /* Change background color to white on hover */
//             border: none;
//           }
//         `}
//           </style>
//         </form>
//         <p>
//           Don't have an account?{" "}
//           <Link
//             to="/registration"
//             className="text-decoration-none"
//             style={{ color: "black", transition: "color 0.3s ease" }}
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import pexelsImage from "./images/loginpic.jpg";
import Home from "./home";
import Registration from "./Registration";
import "./App.css";

function Login({ onLoginSuccess, isAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
        }
      );

      console.log("Login Response Data:", response.data);

      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.id) {
          navigate("/home");
          setEmail("");
          setPassword("");
        } else {
          setErrorMessage("Invalid email or password.");
        }
      } else {
        setErrorMessage("An error occurred while logging in.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setErrorMessage("An error occurred while logging in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

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
            <h1 className="text-center mb-4">Welcome back</h1>

            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <form onSubmit={handleLogin}>
              <div className="form-group mb-4">
                <label className="mb-3">Email:</label>
                <input
                  type="email"
                  className="form-control custom-input mb-4"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-group mb-2">
                <label className="mb-2">Password:</label>
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
            <p>
              Don't have an account?{" "}
              <Link
                to="/registration"
                className="text-decoration-none"
                style={{ color: "black", transition: "color 0.3s ease" }}
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
            padding: 10px 20px; /* Increase padding to make the button bigger */
            border-radius: 0; /* Remove border-radius */
            background-color: black; /* Set background color to black */
            color: white; /* Set text color to white */
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
}

export default Login;
