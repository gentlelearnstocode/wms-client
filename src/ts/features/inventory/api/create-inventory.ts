import { axios } from '@libs/axios';
import { ICreateInventory } from '../interfaces/inventory.interface';
import { useMutation } from '@tanstack/react-query';

export const createInventory = (data: ICreateInventory) =>
  axios.post(`inventory/create-inventory`, data);

export const useCreateInventory = () => {
  return useMutation({
    mutationKey: ['inventory'],
    mutationFn: createInventory,
  });
};
