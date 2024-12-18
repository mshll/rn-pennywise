import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getParentProfile, addChild, addChore, addStoreItem, getChildChoresParent, getChildStoreItemsParent } from '../api/parent';
import { useToast } from '../components/Toast';
import { getParentBalance, updateParentBalance } from '../api/storage';

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
  const updateBalance = useUpdateParentBalance();

  return useMutation({
    mutationFn: async ({ childData, username }) => {
      // First try to deduct the initial balance
      const success = await updateBalance.mutateAsync({
        username,
        amount: -childData.initialBalance,
      });

      if (!success) {
        throw new Error('Insufficient balance to set initial balance');
      }

      // If deduction successful, create the child
      return addChild(childData);
    },
    onSuccess: (data, { username }) => {
      queryClient.invalidateQueries(['parentProfile']);
      queryClient.invalidateQueries(['parentBalance', username]);
      showToast('Child added successfully!');
      return data;
    },
    onError: (error) => {
      showToast(error.message || 'Failed to add child', 'error');
    },
  });
};

export const useAddChore = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const updateBalance = useUpdateParentBalance();

  return useMutation({
    mutationFn: async ({ childId, choreData, username }) => {
      // First try to deduct the reward amount
      const success = await updateBalance.mutateAsync({
        username,
        amount: -choreData.rewardAmount,
      });

      if (!success) {
        throw new Error('Insufficient balance to create chore');
      }

      // If deduction successful, create the chore
      return addChore(childId, choreData);
    },
    onSuccess: (_, { childId }) => {
      queryClient.invalidateQueries(['parentProfile']);
      queryClient.invalidateQueries(['childChores', childId]);
      showToast('Chore added successfully!');
    },
    onError: (error) => {
      showToast(error.message || 'Failed to add chore', 'error');
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

export const useParentBalance = (username) => {
  const { showToast } = useToast();

  return useQuery({
    queryKey: ['parentBalance', username],
    queryFn: () => getParentBalance(username),
    enabled: !!username,
    onError: (error) => {
      showToast('Failed to fetch balance', 'error');
    },
  });
};

export const useUpdateParentBalance = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async ({ username, amount }) => {
      const success = await updateParentBalance(username, amount);
      if (!success) throw new Error('Insufficient balance');
      return success;
    },
    onSuccess: (_, { username }) => {
      queryClient.invalidateQueries(['parentBalance', username]);
    },
    onError: (error) => {
      showToast(error.message || 'Failed to update balance', 'error');
    },
  });
};
