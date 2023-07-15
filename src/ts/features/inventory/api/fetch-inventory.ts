import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../lib';
import { INVENTORY_ENDPOINT } from '../../../config';

export const getInventory = async () => {
  return await axios.get(INVENTORY_ENDPOINT);
};

export const useGetInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: getInventory,
  });
};
