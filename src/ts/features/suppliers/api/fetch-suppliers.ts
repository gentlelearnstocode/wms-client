import { axios, queryClient } from '../../../lib';
import { SUPPLIER_ENDPOINT } from '../../../config';
import { useQuery } from '@tanstack/react-query';

export const getAllSuppliers = async () => {
  return await axios.get(SUPPLIER_ENDPOINT);
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