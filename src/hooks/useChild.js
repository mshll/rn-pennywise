import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getChildChores, getChildStoreItems, buyStoreItem } from '../api/child';
import { useToast } from '../components/Toast';

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
      showToast('Item purchased successfully!');
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to purchase item', 'error');
    },
  });
};
