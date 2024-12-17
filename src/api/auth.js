import instance from '.';
import { setToken } from './storage';

export const getProfile = async () => {
  const response = await instance.get('/api/auth/profile');
  return response.data;
};

export const login = async (username, password) => {
  const response = await instance.post('/auth/login', { username, password });
  if (response.data.token) {
    await setToken(response.data.token);
  }
  return response.data;
};

export const register = async (email, username, password) => {
  const response = await instance.post('/auth/signup', { email, username, password });
  if (response.data.token) {
    await setToken(response.data.token);
  }
  return response.data;
};
