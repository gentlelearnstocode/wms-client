import { useQuery } from '@tanstack/react-query';

import { getAllUsers } from './apiCall';

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: getAllUsers,
  });
};
