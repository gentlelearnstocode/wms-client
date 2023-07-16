import storage from '../../utils/storage';
import { axios, queryClient } from '../../libs';
import { AUTH_ENDPOINT } from '../../config';
import { useMutation } from '@tanstack/react-query';

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

export const signout = () => {
  storage.removeStorage('token');
  storage.removeStorage('userData');
  window.location.assign(window.location.origin);
};

const handleAuthResponse = async (response: any) => {
  const { token, user } = response;
  if (token) {
    storage.setStorage('token', token);
  }
  return user;
};

export const signinRequest = async (authData: any) => {
  const response = await axios.post(`${AUTH_ENDPOINT}/signin`, authData);
  return await handleAuthResponse(response);
};
