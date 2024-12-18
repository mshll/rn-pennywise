import instance from '.';

// Get child's chores
export const getChildChores = async () => {
  const response = await instance.get('/children/me/chores');
  return response.data;
};

// Get child's store items
export const getChildStoreItems = async () => {
  const response = await instance.get('/children/me/store-items');
  return response.data;
};

// Buy store item
export const buyStoreItem = async (itemId) => {
  const response = await instance.post('/store/buy', { id: itemId });
  return response.data;
};
