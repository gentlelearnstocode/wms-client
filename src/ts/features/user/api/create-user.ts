import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../lib';
import { USER_ENDPOINT } from '../../../config';


export const createUser = async (authData: any) => {
  return await axios.post(`${USER_ENDPOINT}/create-user`, authData);
};
export const useCreateUser = () => {
  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: createUser,
  });
};