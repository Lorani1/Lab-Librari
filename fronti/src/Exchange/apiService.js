
import axios from 'axios';

const API_URL = 'https://localhost:7101/api/Exchange'; 

export const getExchanges = async () => {
  return axios.get(API_URL);
};

export const getExchangeById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createExchange = async (exchangeDTO) => {
  return axios.post(API_URL, exchangeDTO);
};

export const updateExchange = async (id, updatedExchange) => {
  return axios.put(`${API_URL}/${id}`, updatedExchange);
};

export const deleteExchange = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
