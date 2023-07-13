import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../lib';
import { USER_ENDPOINT } from '../../../config';

export const getAllUsers = async () => {
  return await axios.get(USER_ENDPOINT);
};
export const useUserQuery = () => {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: getAllUsers,
  });
};