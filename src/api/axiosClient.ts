// api/axiosClient.js
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import queryString from 'query-string';
// Set up default config for http requests here



const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
    var jwt = localStorage.getItem('access_token');
    config.headers.common = { 'Authorization': `Bearer ${jwt}` }
    return config;
})
axiosClient.interceptors.response.use((response: AxiosResponse) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;