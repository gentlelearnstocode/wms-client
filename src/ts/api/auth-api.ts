import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryClient } from '../lib/react-query';

import { signinRequest } from './apiCall';
import storage from '../utils/storage';

export type LoginUser = {
  email: string;
  password: string;
};

export const useAuthSignin = () => {
  const setUserAuthData = (userData: any) => {
    queryClient.setQueryData(['authData'], userData || null);
  };
  return useMutation({
    mutationKey: ['authData'],
    mutationFn: signinRequest,
    onSuccess: (data) => {
      setUserAuthData(data);
      storage.setStorage('userData', data);
    },
  });
};

export const useAuthData = () => {
  return queryClient.getQueryData(['authData']);
};
