import instance from '.';

export const getAllUsers = async () => {
  const response = await instance.get('/auth/users');
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await instance.get(`/auth/users/${userId}`);
  return response.data;
};
