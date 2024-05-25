import {jwtDecode} from 'jwt-decode';

export const getUserIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    console.log('Decoded token:', decoded);
    return decoded?.nameid || decoded?.id; // Ensure this matches the structure of your token
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
