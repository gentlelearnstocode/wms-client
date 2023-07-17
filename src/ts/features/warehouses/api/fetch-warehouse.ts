import { useQuery } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const fetchAllWarehouses = async () => {
  return await axios.get('/warehouses');
};
export const useWarehouseQuery = () => {
  return useQuery({
    queryKey: ['warehouses'],
    queryFn: fetchAllWarehouses,
  });
};
