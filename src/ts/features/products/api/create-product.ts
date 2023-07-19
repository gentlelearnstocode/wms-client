import { useMutation } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import { ICreateProduct } from '../interfaces/product.interface';
import { enqueueSnackbar } from 'notistack';

export interface CreateProductDTO {
  data: ICreateProduct;
}

export const createProduct = ({ data }: CreateProductDTO) =>
  axios.post('/products/create-product', { ...data });

export const useCreateProduct = () => {
  return useMutation({
    onSuccess: (mutationData) => {
      const { product } = mutationData.data;
      enqueueSnackbar(`Success! Created product ${product.name}`, { variant: 'success' });
    },
    onError: (error) => enqueueSnackbar(`Error! ${error}`),
    mutationKey: ['products'],
    mutationFn: createProduct,
  });
};
