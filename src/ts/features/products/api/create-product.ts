import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../lib';
import { PRODUCT_ENDPOINT } from '../../../config';

export const createProduct = async (productData: any) => {
  return await axios.post(`${PRODUCT_ENDPOINT}/create-product`, productData);
};
export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ['products'],
    mutationFn: createProduct,
  });
};