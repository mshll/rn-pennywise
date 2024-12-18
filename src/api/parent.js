import instance from '.';

export const getParentProfile = async () => {
  const response = await instance.get('/parents/me');
  return response.data;
};

// Add child to parent
export const addChild = async (childData) => {
  const response = await instance.post('/children/parent', childData);
  return response.data;
};

// Add chore to child
export const addChore = async (childId, choreData) => {
  const response = await instance.post(`/chores/${childId}`, choreData);
  return response.data;
};

// Add store item for child
export const addStoreItem = async (childId, itemData) => {
  const response = await instance.post('/store/add', {
    name: itemData.name,
    description: itemData.description,
    price: itemData.price,
    image: itemData.image,
    child_id: itemData.child_id,
  });
  return response.data;
};

// Get child's chores (parent view)
export const getChildChoresParent = async (childId) => {
  const response = await instance.get(`/parents/children/${childId}/chores`);
  return response.data;
};

// Get child's store items (parent view)
export const getChildStoreItemsParent = async (childId) => {
  const response = await instance.get(`/parents/children/${childId}/store-items`);
  return response.data;
};
