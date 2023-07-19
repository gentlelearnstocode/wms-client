import { axios } from '@libs/axios';
import { ICreateInventory } from '../interfaces/inventory.interface';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

type CreateInventoryDTO = {
  data: ICreateInventory;
};
export const createInventory = ({ data }: CreateInventoryDTO) =>
  axios.post(`inventory/create-inventory`, data);

export const useCreateInventory = () => {
  return useMutation({
    onSuccess: (mutationData) =>
      enqueueSnackbar(`Success! Inventory created`, { variant: 'success' }),
    onError: (error) => enqueueSnackbar(`Error! ${error}!`, { variant: 'error' }),
    mutationKey: ['inventory'],
    mutationFn: createInventory,
  });
};
