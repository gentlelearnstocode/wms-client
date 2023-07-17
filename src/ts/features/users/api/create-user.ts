import { useMutation } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const createUser = async (authData: any) => {
  return await axios.post(`users/create-user`, authData);
};
export const useCreateUser = () => {
  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: createUser,
  });
};
