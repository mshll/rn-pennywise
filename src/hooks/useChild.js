import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getChildProfile, getChildChores, getChildStoreItems, buyStoreItem, updateChoreStatus } from '../api/child';
import { useToast } from '../components/Toast';

export const useChildProfile = () => {
  const { showToast } = useToast();

  return useQuery({
    queryKey: ['childProfile'],
    queryFn: getChildProfile,
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to fetch profile', 'error');
    },
  });
};

export const useChildChores = () => {
  const { showToast } = useToast();

  return useQuery({
    queryKey: ['childChores'],
    queryFn: getChildChores,
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to fetch chores', 'error');
    },
  });
};

export const useUpdateChoreStatus = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ choreId, status }) => updateChoreStatus(choreId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(['childChores']);
      queryClient.invalidateQueries(['childProfile']); // Refresh balance
      showToast('Task completed successfully!');
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to update task status', 'error');
      console.log(error);
    },
  });
};

export const useChildStoreItems = () => {
  const { showToast } = useToast();

  return useQuery({
    queryKey: ['childStoreItems'],
    queryFn: getChildStoreItems,
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to fetch store items', 'error');
    },
  });
};

export const useBuyStoreItem = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: buyStoreItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['childStoreItems']);
      queryClient.invalidateQueries(['childProfile']); // Refresh balance
      showToast('Item purchased successfully!');
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to purchase item', 'error');
    },
  });
};
