/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://www.majorcineplex.com/apis/';

const instance = axios.create({
  baseURL: corsProxyUrl + baseUrl, // Use CORS proxy URL to bypass CORS restrictions
  timeout: 10000, // Increased timeout to 10 seconds
  headers: { 'X-Custom-Header': 'cinemo-web' },
});

// Request interceptor
instance.interceptors.request.use(
  (config) =>
    // You can modify the request config here, such as adding headers or modifying data
    config,
  (error) =>
    // Handle request errors
    Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
  (response) =>
    // You can modify the response data here before passing it to the caller
    response,
  (error) =>
    // Handle response errors
    Promise.reject(error)
);

const httpService = {
  async get(url, config) {
    return instance.get(url, config);
  },
};

export default httpService;
