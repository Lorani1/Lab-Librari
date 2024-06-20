import axios from 'axios';
import api from '../api';

const API_BASE_URL = 'https://localhost:7101/api/Exchange'; // Replace with your actual API base URL

const apiService = {
  
  getAllExchanges: async () => {
    return axios.get(API_BASE_URL);
  },
  
  getExchangeById: async (id) => {
    try {
      const response = await api.get('/Exchange/ByLoggedInKlient');
      return response.data;
    } catch (error) {
      console.error(`Error fetching exchange with ID ${id}:`, error);
      throw error;
    }
  },
  createExchange: async (exchangeData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, exchangeData);
      return response.data;
    } catch (error) {
      console.error('Error creating exchange:', error);
      throw error;
    }
  },
  updateExchange : async (id, updatedExchange) => {
    try {
      return await axios.put(`${API_BASE_URL}/${id}`, updatedExchange);
    } catch (error) {
      console.error('Error updating exchange:', error.response ? error.response.data : error.message);
      throw error; // Rethrow the error to propagate it further if needed
    }
  },
  
  deleteExchange: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting exchange with ID ${id}:`, error);
      throw error;
    }
  },

  approveExchange: async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/Approve/${id}`);
    } catch (error) {
      console.error(`Error approving exchange with ID ${id}:`, error);
      throw error;
    }
  },

  countExchangesByLibri: async (libriId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/CountByLibri/${libriId}`);
      return response.data;
    } catch (error) {
      console.error(`Error counting exchanges for Libri ID ${libriId}:`, error);
      throw error;
    }
  },

  getPendingApprovalExchangesLast24To48Hours: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/PendingApprovalLast24To48Hours`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pending approval exchanges:', error);
      throw error;
    }
  },
  endExchange: async (exchangeId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/EndExchange/${exchangeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error ending exchange with ID ${exchangeId}:`, error);
      throw error;
    }
  },
  fetchBooks: async () => {
    try {
      const response = await axios.get('https://localhost:7101/api/Libri');
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },
};
export const fetchClients = async () => {
  const response = await axios.get('https://localhost:7101/api/Klient');
  return response.data;
};

export default apiService;
