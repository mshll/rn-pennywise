import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getParentProfile, addChild, addChore, addStoreItem, getChildChoresParent, getChildStoreItemsParent } from '../api/parent';
import { useToast } from '../components/Toast';

export const useParentProfile = () => {
  const { showToast } = useToast();

  return useQuery({
    queryKey: ['parentProfile'],
    queryFn: getParentProfile,
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to fetch profile', 'error');
    },
  });
};

export const useAddChild = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: addChild,
    onSuccess: () => {
      queryClient.invalidateQueries(['parentProfile']);
      showToast('Child added successfully!');
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to add child', 'error');
    },
  });
};

export const useAddChore = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ childId, choreData }) => addChore(childId, choreData),
    onSuccess: (_, { childId }) => {
      queryClient.invalidateQueries(['parentProfile']);
      queryClient.invalidateQueries(['childChores', childId]);
      showToast('Chore added successfully!');
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to add chore', 'error');
    },
  });
};

export const useAddStoreItem = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ childId, itemData }) => addStoreItem(childId, itemData),
    onSuccess: (_, { childId }) => {
      queryClient.invalidateQueries(['parentProfile']);
      queryClient.invalidateQueries(['childStoreItems', childId]);
      showToast('Store item added successfully!');
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to add store item', 'error');
    },
  });
};

export const useChildChores = (childId) => {
  const { showToast } = useToast();

  return useQuery({
    queryKey: ['childChores', childId],
    queryFn: () => getChildChoresParent(childId),
    enabled: !!childId,
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to fetch chores', 'error');
    },
  });
};

export const useChildStoreItems = (childId) => {
  const { showToast } = useToast();

  return useQuery({
    queryKey: ['childStoreItems', childId],
    queryFn: () => getChildStoreItemsParent(childId),
    enabled: !!childId,
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to fetch store items', 'error');
    },
  });
};
