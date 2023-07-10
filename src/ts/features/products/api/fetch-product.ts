import { useQuery } from '@tanstack/react-query';

import { axios } from '../../../lib';
import { PRODUCT_ENDPOINT } from '../../../config';

export const getProducts = async () => {
  return await axios.get(PRODUCT_ENDPOINT);
};

export const useProductQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

