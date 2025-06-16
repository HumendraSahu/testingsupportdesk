import axios from 'axios';

const API_URL = '/api/v2/register/';

export const registerAdmin = async (data) => {
  const response = await axios.post(`${API_URL}admin`, data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post('/api/v2/auth/login', data);
  return response.data;
};

export const checkUsersExist = async () => {
  const response = await axios.get('/api/v2/users/exist');
  return response.data;
};

export default { registerAdmin, login, checkUsersExist };
