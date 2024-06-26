import React, { useState, useEffect } from "react";
import { Navbar, Nav, Badge } from "react-bootstrap"; // Import Badge from react-bootstrap
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/circles.png";
import api from "../../api";
import { getUserIdFromToken } from './utilities';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../AuthContext'; 
import checkRefreshTokenValidity from './checkRefreshTokenValidity'; 
import Notification from "../../Noitification/Notification"; 

const CustomNavbar = ({ totalItems }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editSurname, setEditSurname] = useState("");
  const [editNrPersonal, setEditNrPersonal] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [changesMade, setChangesMade] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false); 
  const history = useHistory();
  const [newNotifications, setNewNotifications] = useState(false);
  const { userRole } = useAuth(); 


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.log('No auth token found');
          return;
        }

        const userId = getUserIdFromToken(token);
        if (userId) {
          const response = await api.get(`/Klient/${userId}`);
          setUserInfo(response.data);
          setEditName(response.data.emri);
          setEditSurname(response.data.mbiemri);
          setEditNrPersonal(response.data.nrPersonal);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        history.push('/login');
      }
    };

    fetchUserInfo();
  }, [history]);

  useEffect(() => {
    const validateRefreshToken = async () => {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                const response = await api.post('/api/Klient/refresh-token', { refreshToken });
                const { Token, RefreshToken } = response.data;

                sessionStorage.setItem('refreshToken', RefreshToken);
                localStorage.setItem('authToken', Token);
            } catch (error) {
                console.error('Error validating refresh token:', error);
                sessionStorage.removeItem('refreshToken');
                localStorage.removeItem('authToken');
                history.push('/login');
            }
        } else {
            history.push('/login');
        }
    };

    const interval = setInterval(validateRefreshToken, 300000); 
    return () => clearInterval(interval);
  }, [history]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/Notification/klient');
        setNewNotifications(response.data.newNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNameChange = (e) => {
    setEditName(e.target.value);
    setChangesMade(true);
  };

  const handleSurnameChange = (e) => {
    setEditSurname(e.target.value);
    setChangesMade(true);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePicture(file);
      setUserInfo((prevState) => ({
        ...prevState,
        profilePictureUrl: previewUrl,
      }));
      setChangesMade(true);

      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const saveChanges = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.log('No auth token found');
        return;
      }

      const userId = getUserIdFromToken(token);
      if (userId) {
        const formData = new FormData();
        if (editName !== userInfo.emri) formData.append('Emri', editName);
        if (editSurname !== userInfo.mbiemri) formData.append('Mbiemri', editSurname);
        if (profilePicture) formData.append('ProfilePicturePath', profilePicture);

        await api.patch(`/Klient/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        setUserInfo((prevState) => ({
          ...prevState,
          emri: editName !== userInfo.emri ? editName : prevState.emri,
          mbiemri: editSurname !== userInfo.mbiemri ? editSurname : prevState.mbiemri,
          profilePictureUrl: profilePicture ? URL.createObjectURL(profilePicture) : prevState.profilePictureUrl
        }));
        setDropdownOpen(false);
        setChangesMade(false);

        if (editName !== userInfo.emri) {
          console.log(`Name updated to ${editName}`);
          toast.success(`Name updated to ${editName}`, { className: 'toast-success' });
        }
        if (editSurname !== userInfo.mbiemri) {
          console.log(`Surname updated to ${editSurname}`);
          toast.success(`Surname updated to ${editSurname}`, { className: 'toast-success' });
        }
      }
    } catch (error) {
      console.error('Error saving user info:', error);
    }
  };

  const logout = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (refreshToken) {
        try {
            await api.post(`https://localhost:7101/api/Klient/logout`, { refreshToken });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('refreshToken'); // Ensure refresh token is also removed
    history.push('/login');
  };

  const triggerFileInput = () => {
    document.getElementById('profilePicInput').click();
  }

  const toggleNotificationModal = () => {
    setShowNotificationModal(!showNotificationModal);
  }

  

  return (
    <>
      <style>
        {`
          .toast-success {
            background-color: white !important;
            color: #001524 !important;
          }
        `}
      </style>
      <ToastContainer />
      <Navbar style={{ backgroundColor: "#001524" }} variant="dark" expand="lg" fixed="top">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Book Store App" height="30" className="d-inline-block align-top" />{" "}
          <span className="font-weight-bold text-uppercase" style={{ fontSize: "1.5em", fontFamily: "system-ui", fontWeight: "bold" }}>
            BIBLIOTEKA
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="mr-auto">
            {userRole === 'admin' && ( // Conditionally render the dashboard link
              <Nav.Link as={Link} to="/dashboard">
                <span className="font-weight-bold text-uppercase" style={{ fontSize: "1em", color: "white", fontFamily: "system-ui", fontWeight: "bold" }}>
                  Dashboard
                </span>
              </Nav.Link>
            )}
             <Nav.Link onClick={toggleNotificationModal}>
              <span 
                className={`font-weight-bold text-uppercase ${newNotifications ? 'new-notification' : ''}`}
                style={{ fontSize: "1em", color: "white", fontFamily: "system-ui", fontWeight: "bold" }}
              >
                Notifications
                {newNotifications && (
                  <Badge variant="danger" className="ml-2">New</Badge>
                )}
              </span>
            </Nav.Link>
            <Nav.Link as={Link} to="/Exchange">
              <span className="font-weight-bold text-uppercase" style={{ fontSize: "1em", color: "white", fontFamily: "system-ui", fontWeight: "bold" }}>
                My Exchanges
              </span>
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto" style={{ marginRight: '120px', color: "white" }}>
            {userInfo && (
              <>
                <img 
                  src={userInfo.profilePictureUrl} 
                  alt="Profile" 
                  style={{ 
                    width: '30px', 
                    height: '30px', 
                    borderRadius: '50%', 
                    marginRight: '10px' 
                  }} 
                />
                <div onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-toggle" style={{ cursor: 'pointer' , paddingTop: '5px' ,fontSize:'1em'}}>
                  {userInfo.emri}
                  </div>
              </>
            )}
            {dropdownOpen && userInfo && (
              <div className="dropdown-menu show" style={{ position: 'absolute', right: '0', padding: '10px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '4px', textAlign: 'center' }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Edit Profile</strong>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <img 
                    src={userInfo.profilePictureUrl} 
                    alt="Profile" 
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      borderRadius: '50%', 
                      marginBottom: '10px' 
                    }} 
                  />
                  <input
                    type="file"
                    id="profilePicInput"
                    style={{ display: 'none' }}
                    onChange={handleProfilePictureChange}
                  />
                  <button onClick={triggerFileInput} className="btn btn-primary btn-sm" style={{ display: 'block', width: '100%', margin: '10px 0', padding: '10px', backgroundColor: '#001524', color: '#fff', border: 'none', borderRadius: '4px' }}>Change Picture</button>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={editName}
                    onChange={handleNameChange}
                    placeholder="Edit Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={editSurname}
                    onChange={handleSurnameChange}
                    placeholder="Edit Surname"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={editNrPersonal}
                    readOnly
                  />
                </div>

                <button onClick={saveChanges} style={{ display: 'block', width: '100%', margin: '10px 0', padding: '10px', backgroundColor: '#001524', color: '#fff', border: 'none', borderRadius: '4px' }}>
                  Save Changes
                </button>
                <button onClick={logout} style={{ display: 'block', width: '100%', margin: '10px 0', padding: '10px', backgroundColor: '#001524', color: '#fff', border: 'none', borderRadius: '4px' }}>
                  Logout
                </button>
    <button onClick={() => setDropdownOpen(false)} style={{ display: 'block', width: '100%', margin: '10px 0', padding: '10px', backgroundColor: '#001524', color: '#fff', border: 'none', borderRadius: '4px' }}>
      Close
    </button>
                </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Notification showModal={showNotificationModal} toggleModal={toggleNotificationModal} />
    </>
  );
};

export default CustomNavbar;
