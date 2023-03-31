import Axios, { AxiosRequestConfig } from 'axios';

import { API_URL } from '../config';
import storage from '../utils/storage';

export const axios = Axios.create({
  baseURL: API_URL,
});

const handleRequest = (config: AxiosRequestConfig) => {
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
  }
);
