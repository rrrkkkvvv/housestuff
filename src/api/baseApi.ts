import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { apiURLs } from '../values/stringValues';

const staggeredBaseQuery = retry(fetchBaseQuery({ baseUrl: apiURLs.baseURL }), {
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
