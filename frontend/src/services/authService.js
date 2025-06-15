import axios from 'axios';

const API_URL = '/api/register/';

export const registerAdmin = async (data) => {
  const response = await axios.post(`${API_URL}admin`, data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post('/api/login', data);
  return response.data;
};

export default { registerAdmin, login };
