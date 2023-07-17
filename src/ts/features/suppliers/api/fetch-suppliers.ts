import { axios, queryClient } from '../../../libs';
import { useQuery } from '@tanstack/react-query';

export const getAllSuppliers = async () => {
  return await axios.get('/suppliers');
};

export const useGetAllSuppliers = () => {
  return useQuery({
    queryFn: getAllSuppliers,
    queryKey: ['allSuppliers'],
  });
};

export const useSuppliersData = () => {
  return queryClient.getQueryData(['allSuppliers']);
};
