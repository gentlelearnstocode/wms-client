import { axios } from '@libs/axios';

export const createPurchase = (data) => axios.post('/purchase-orders/create-purchaseorder');
