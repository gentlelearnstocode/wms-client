import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../lib';
import { WAREHOUSE_ENDPOINT } from '../../../config';

export const fetchAllWarehouses = async () => {
  return await axios.get(WAREHOUSE_ENDPOINT);
};
export const useWarehouseQuery = () => {
  return useQuery({
    queryKey: ['warehouses'],
    queryFn: fetchAllWarehouses,
  });
};
