import { useQuery } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const getSales = async () => {
  return await axios.get('/sales-orders');
};

export const useGetSales = () => {
  return useQuery({
    queryKey: ['sales'],
    queryFn: getSales,
  });
};
