import { IAdminUser } from '../../types/objectTypes/TAdminUser';
import { TDefaultResponse } from '../../types/responseTypes/TDefaultResponse';
import baseApi from '../baseApi';

const fragmentBaseUrl = "/admin_service.php"

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginCheck: builder.mutation<TDefaultResponse, IAdminUser>({
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

export const { 
  useLoginCheckMutation,
  usePrefetch
 } = adminApi;
export default adminApi;
