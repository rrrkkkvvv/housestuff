import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAdminUser } from '../types/IAdminUser';

const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/projects/housestuffbackend/servicies/admin_service.php' }),
  endpoints: (builder) => ({
    login: builder.query({
        query: (userData: IAdminUser) => ({
            url: '/',
            method: 'POST',
            body: {
                method: "login",
                params:userData
            },
          }),
    
    }),

  }),
});

export const { useLoginQuery } = adminApi;
export default adminApi;
