import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiURLs } from '../values/stringValues';

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiURLs.baseURL }),
  endpoints: () => ({}),
  tagTypes:["Products", "Categories"],
  refetchOnFocus: true,
  refetchOnReconnect: true
});

export default baseApi;
