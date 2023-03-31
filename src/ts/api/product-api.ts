import { useQuery } from '@tanstack/react-query';

import { getProducts } from './apiCall';

export const useProductQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};
