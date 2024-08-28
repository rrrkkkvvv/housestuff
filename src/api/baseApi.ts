import { BaseQueryFn, createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { apiURLs } from '../values/stringValues';
import axios from 'axios';
import type  { AxiosError, AxiosRequestConfig } from 'axios';


const axiosBaseQuery = 
(
  { baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<
  {
    url: string
    method?: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers']
  },
  unknown,
  unknown> => 
    async ({url, method, data, params, headers})=>{
    try{
      const result = await axios({
        url: baseUrl+url,
        method,
        data,
        params,
        headers,
      })
      return {data: result.data}
    }catch(axiosError ){
      const err = axiosError as AxiosError;
      console.log( err.response?.data || err.message)
      return {
        error:{
          status: err.response?.status,
          data: err.response?.data || err.message,
        }
      }
    }
  }

const staggeredBaseQuery = retry(axiosBaseQuery({ baseUrl: apiURLs.baseURL }), {
  maxRetries: 5,
})
const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: staggeredBaseQuery,
  endpoints: () => ({}),
  tagTypes:["Products", "Categories"],
  refetchOnFocus: true,
  refetchOnReconnect: true
});

export default baseApi;
