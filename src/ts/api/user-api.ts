import { useQuery, useMutation } from '@tanstack/react-query';

import { getAllUsers, createUser } from './apiCall';

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: getAllUsers,
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: createUser,
  });
};
