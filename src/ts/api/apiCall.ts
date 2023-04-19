import { axios } from '../lib';

import { PRODUCT_ENDPOINT, AUTH_ENDPOINT } from '../config';
import storage from '../utils/storage';

//user API calls
const handleAuthResponse = async (response: any) => {
  const { token, user } = response;
  if (token) {
    storage.setStorage('token', token);
  }
  return user;
};

//auth api calls
export const signinRequest = async (authData: any) => {
  const response = await axios.post(`${AUTH_ENDPOINT}/signin`, authData);
  const user = await handleAuthResponse(response);
  return user;
};

//product API calls
export const getProducts = async () => {
  const response = await axios.get(PRODUCT_ENDPOINT);
  return response;
};

export const createProduct = async (productData: any) => {
  const response = await axios.post(
    `${PRODUCT_ENDPOINT}/create-product`,
    productData
  );
  return response;
};
