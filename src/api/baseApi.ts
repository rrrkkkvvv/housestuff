import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/projects/housestuffbackend/servicies' }),
  endpoints: () => ({}),
  tagTypes:["Products", "Categories"],
  refetchOnFocus: true,
  refetchOnReconnect: true
});

export default baseApi;
