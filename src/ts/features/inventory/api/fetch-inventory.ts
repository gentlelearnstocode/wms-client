import { useQuery } from '@tanstack/react-query';
import { INVENTORY_ENDPOINT } from '../../../config';
import { axios } from '@libs/axios';

export const getInventory = async () => {
  return await axios.get(INVENTORY_ENDPOINT);
};

export const useGetInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: getInventory,
  });
};
