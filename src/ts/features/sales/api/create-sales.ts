import { axios } from '@libs/axios';

export const createSales = (data) => axios.post('/sales-orders/create-salesorder');
