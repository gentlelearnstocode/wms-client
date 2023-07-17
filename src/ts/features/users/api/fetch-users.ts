import { useQuery } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const getAllUsers = async () => {
  return await axios.get('/users');
};
export const useUserQuery = () => {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: getAllUsers,
  });
};
