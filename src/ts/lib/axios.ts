import Axios, { InternalAxiosRequestConfig } from 'axios';
import { enqueueSnackbar } from 'notistack';

import { API_URL } from '../config';
import storage from '../utils/storage';

export const axios = Axios.create({
  baseURL: API_URL,
});

const handleRequest = (config: InternalAxiosRequestConfig) => {
  const token = storage.getStorage('token');
  config.headers = config.headers || {};
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
};

axios.interceptors.request.use(handleRequest);

axios.interceptors.response.use(
  (response) => {
    console.log('response intercepted', response.data);
    return response.data;
  },
  (error) => {
    console.log('error intercepted', error);
    let message = error?.response?.data?.message || error.message;
    enqueueSnackbar(message, { variant: 'error' });
    return Promise.reject(error);
  }
);
