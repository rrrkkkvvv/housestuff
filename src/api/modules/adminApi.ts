import { IAdminUser } from '../../types/IAdminUser';
import baseApi from '../baseApi';

const fragmentBaseUrl = "/admin_service.php"

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query({
        query: (userData: IAdminUser) => ({
            url: fragmentBaseUrl,
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
