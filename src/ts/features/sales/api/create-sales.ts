import { axios } from '@libs/axios';
import { ICreateSales } from '../interfaces/sales.interface';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

type CreateSalesDTO = {
  data: ICreateSales;
};
export const createSales = ({ data }: CreateSalesDTO) =>
  axios.post('/sales-orders/create-salesorder', data);

export const useCreateSales = () => {
  return useMutation({
    onSuccess: () => enqueueSnackbar(`Success! Sales orders created`, { variant: 'success' }),
    onError: (error) => enqueueSnackbar(`Error! ${error}`),
    mutationKey: ['createSales'],
    mutationFn: createSales,
  });
};
