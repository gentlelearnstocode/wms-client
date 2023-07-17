import { useQuery } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const getPurchases = async () => {
  return await axios.get('/purchases');
};

export const useGetPurchases = () => {
  return useQuery({
    queryKey: ['purchases'],
    queryFn: getPurchases,
  });
};
