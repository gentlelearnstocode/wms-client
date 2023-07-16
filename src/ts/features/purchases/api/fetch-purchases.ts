import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../libs';
import { PURCHASE_ORDER_ENDPOINT } from '../../../config';

export const getPurchases = async () => {
  return await axios.get(PURCHASE_ORDER_ENDPOINT);
};

export const useGetPurchases = () => {
  return useQuery({
    queryKey: ['purchases'],
    queryFn: getPurchases,
  });
};
