import { useMutation, useQuery } from '@tanstack/react-query';

import { createSupplier, getAllSuppliers } from './apiCall';
import { queryClient } from '../lib';

export const useCreateSupplier = () => {
  return useMutation({
    mutationFn: createSupplier,
    mutationKey: ['createSupplier'],
  });
};

export const useGetAllSuplliers = () => {
  return useQuery({
    queryFn: getAllSuppliers,
    queryKey: ['allSuppliers'],
  });
};

export const useSuppliersData = () => {
  return queryClient.getQueryData(['allSuppliers']);
};
