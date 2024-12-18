import instance from '.';

export const getParentProfile = async () => {
  const response = await instance.get('/parents/me');
  return response.data;
};

export const getAllParents = async () => {
  const response = await instance.get('/parents');
  return response.data;
};
