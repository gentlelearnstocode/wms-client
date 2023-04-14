import { useQuery, useMutation } from '@tanstack/react-query';

import { getProducts, createProduct } from './apiCall';

export const useProductQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ['products'],
    mutationFn: createProduct,
  });
};
