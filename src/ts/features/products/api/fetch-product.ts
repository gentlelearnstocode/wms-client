import { useQuery } from '@tanstack/react-query';

import { axios } from '@libs/axios';

export const getProducts = async () => {
  return await axios.get('/products');
};

export const useProductQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};
