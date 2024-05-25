import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { getUserIdFromToken } from './utilities'; // Corrected import path

const Profile = () => {
  const [klientData, setKlientData] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchKlientData = async () => {
      try {
        if (isAuthenticated) {
          const token = localStorage.getItem('authToken');
          const userId = getUserIdFromToken(token); // Get user ID from token

          if (userId) {
            const response = await axios.get(`https://localhost:7101/api/Klient/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setKlientData(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching klient data:', error);
      }
    };

    fetchKlientData();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }

  if (!klientData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Your Profile</h1>
      <img src={klientData.profilePictureUrl} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <p>Name: {klientData.emri}</p>
      <p>Email: {klientData.email}</p>
      {/* Display other klient data as needed */}
    </div>
  );
};

export default Profile;
