import { useMutation } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const createSupplier = async (supplierData: any) => {
  return await axios.post('suppliers/create-supplier', supplierData);
};

export const useCreateSupplier = () => {
  return useMutation({
    mutationFn: createSupplier,
    mutationKey: ['createSupplier'],
  });
};
