import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import configuration from '../../config';

export const userHttp = axios.create({
    baseURL: `${configuration.userServer.protocol}://${configuration.userServer.host}:${configuration.userServer.port}`
})

export const requestInterceptor = (request: AxiosRequestConfig) => {
    // console.log(request.url);
    return request
}
export const requestErrorInterceptor = (error: unknown) => {
    // console.log(error.response);
    return Promise.reject(error)
}
export const responseInterceptor = (response: AxiosResponse) => {
    // console.log(response);
    return response
}
export const responseErrorInterceptor = (error: unknown) => {
    // console.log(error.response);
    return Promise.reject(error)
}



userHttp.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
userHttp.interceptors.response.use(responseInterceptor, responseErrorInterceptor);