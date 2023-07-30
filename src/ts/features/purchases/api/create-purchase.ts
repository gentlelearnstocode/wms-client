import { axios } from '@libs/axios';
import { ICreatePurchase } from '../interfaces/purchases.interface';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

type CreatePurchaseDTO = {
  data: ICreatePurchase;
};

export const createPurchase = ({ data }: CreatePurchaseDTO) =>
  axios.post('/purchase-orders/create-purchaseorder', data);

export const useCreatePurchase = () => {
  return useMutation({
    onSuccess: (data) => enqueueSnackbar('Success! Created purchase order', { variant: 'success' }),
    onError: (error) => enqueueSnackbar(`Error! ${error}`),
    mutationKey: ['createPurchase'],
    mutationFn: createPurchase,
  });
};
