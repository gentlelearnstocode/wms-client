import { axios } from '../../../libs';
import { useMutation } from '@tanstack/react-query';
import { SUPPLIER_ENDPOINT } from '../../../config';

export const createSupplier = async (supplierData: any) => {
  return await axios.post(`${SUPPLIER_ENDPOINT}/create-supplier`, supplierData);
};

export const useCreateSupplier = () => {
  return useMutation({
    mutationFn: createSupplier,
    mutationKey: ['createSupplier'],
  });
};
