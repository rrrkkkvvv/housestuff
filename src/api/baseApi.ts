import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/projects/housestuffbackend/servicies' }),
  endpoints: () => ({}),
  tagTypes:["Products", "Categories"]
});

export default baseApi;
