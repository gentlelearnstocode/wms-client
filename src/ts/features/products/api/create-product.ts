import { useMutation } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import { ICreateProduct } from '../interfaces/product.interface';

export const createProduct = async (productData: ICreateProduct) =>
  await axios.post('/products/create-product', productData);

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ['products'],
    mutationFn: createProduct,
  });
};
