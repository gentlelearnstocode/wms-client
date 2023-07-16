import { axios } from '@libs/axios';
import { ICreateInventory } from '../interfaces/inventory.interface';
import { INVENTORY_ENDPOINT } from '@config/index';
import { useMutation } from '@tanstack/react-query';

export const createInventory = (data: ICreateInventory) =>
  axios.post(`${INVENTORY_ENDPOINT}/create-inventory`, data);

export const useCreateInventory = () => {
  return useMutation({
    mutationKey: ['inventory'],
    mutationFn: createInventory,
  });
};
