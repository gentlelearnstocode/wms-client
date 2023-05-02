import { axios } from '../lib';

import { PRODUCT_ENDPOINT, AUTH_ENDPOINT, USER_ENDPOINT, WAREHOUSE_ENDPOINT, SUPPLIER_ENDPOINT } from '../config';
import storage from '../utils/storage';

//user API calls
const handleAuthResponse = async (response: any) => {
  const { token, user } = response;
  if (token) {
    storage.setStorage('token', token);
  }
  return user;
};

//supplier API calls
export const createSupplier = async (supplierData: any) => {
  const response = await axios.post(`${SUPPLIER_ENDPOINT}/create-supplier`, supplierData);
  return response;
};

export const getAllSuppliers = async () => {
  const response = await axios.get(SUPPLIER_ENDPOINT);
  return response;
};

//warehouse API calls
export const getAllWarehouses = async () => {
  const response = await axios.get(WAREHOUSE_ENDPOINT);
  return response;
};

//auth api calls
export const getAllUsers = async () => {
  const response = await axios.get(USER_ENDPOINT);
  return response;
};
export const signinRequest = async (authData: any) => {
  const response = await axios.post(`${AUTH_ENDPOINT}/signin`, authData);
  const user = await handleAuthResponse(response);
  return user;
};
export const createUser = async (authData: any) => {
  const response = await axios.post(`${USER_ENDPOINT}/create-user`, authData);
  return response;
};
//product API calls
export const getProducts = async () => {
  const response = await axios.get(PRODUCT_ENDPOINT);
  return response;
};

export const createProduct = async (productData: any) => {
  const response = await axios.post(`${PRODUCT_ENDPOINT}/create-product`, productData);
  return response;
};
