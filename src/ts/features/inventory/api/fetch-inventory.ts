import { useQuery } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const getInventory = async () => {
  return await axios.get('/inventory');
};

export const useGetInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: getInventory,
  });
};
