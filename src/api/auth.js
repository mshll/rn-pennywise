import instance from '.';
import { setToken } from './storage';

export const login = async (username, password) => {
  const response = await instance.post('/auth/login', { username, password });
  if (response.data.token) {
    await setToken(response.data.token);
  }
  return response.data;
};

export const register = async (email, username, password, avatarUrl) => {
  const response = await instance.post('/auth/signup', { email, username, password, avatarUrl });
  if (response.data.token) {
    await setToken(response.data.token);
  }
  return response.data;
};
