import instance from '.';

export const addChild = async (childData) => {
  const response = await instance.post('/children/parent', childData);
  return response.data;
};

export const addChore = async (childId, choreData) => {
  const response = await instance.post(`/chores/${childId}`, choreData);
  return response.data;
};

export const updateChoreStatus = async (choreId, status) => {
  const response = await instance.put(`/chores/status/${choreId}`, { status });
  return response.data;
};
