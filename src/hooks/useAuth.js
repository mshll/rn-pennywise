import { useMutation } from '@tanstack/react-query';
import { login, register } from '../api/auth';
import { useAuth as useAuthContext } from '../context/AuthContext';

export const useLogin = () => {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: async ({ username, password }) => {
      const response = await login(username, password);
      return response;
    },
    onSuccess: (data) => {
      if (data.token) {
        setUser(data.token);
      }
    },
  });
};

export const useSignup = () => {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: async ({ email, username, password }) => {
      const response = await register(email, username, password);
      return response;
    },
    onSuccess: (data) => {
      if (data.token) {
        setUser(data.token);
      }
    },
  });
};
