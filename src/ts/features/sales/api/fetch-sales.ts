import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../lib';
import { SALES_ORDER_ENDPOINT } from '../../../config';

export const getSales = async () => {
  return await axios.get(SALES_ORDER_ENDPOINT);
};

export const useGetSales = () => {
  return useQuery({
    queryKey: ['sales'],
    queryFn: getSales,
  });
};
