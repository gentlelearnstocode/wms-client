import { useQuery } from '@tanstack/react-query';

import { getAllWarehouses } from './apiCall';

export const useWarehouseQuery = () => {
  return useQuery({
    queryKey: ['warehouses'],
    queryFn: getAllWarehouses,
  });
};
