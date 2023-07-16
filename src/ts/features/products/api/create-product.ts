import { useMutation } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import { PRODUCT_ENDPOINT } from '@config/index';
import { ICreateProduct } from '../interfaces/product.interface';

export const createProduct = async (productData: ICreateProduct) =>
  await axios.post(`${PRODUCT_ENDPOINT}/create-product`, productData);
export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ['products'],
    mutationFn: createProduct,
  });
};
