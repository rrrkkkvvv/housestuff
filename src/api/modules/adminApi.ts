import { IAdminUser } from '../../types/objectTypes/TAdminUser';
import { TDefaultResponse } from '../../types/responseTypes/TDefaultResponse';
import { apiURLs } from '../../values/stringValues';
import baseApi from '../baseApi';

const fragmentBaseUrl = apiURLs.paths.adminAPI

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginCheck: builder.mutation<TDefaultResponse, IAdminUser>({
        query: (userData: IAdminUser) => ({
            url: fragmentBaseUrl,
            method: 'POST',
            body:JSON.stringify({
                method: "login",
                params: userData
            }),
          }),
    
    }),

  }),
});

export const { 
  useLoginCheckMutation,
  usePrefetch
 } = adminApi;
export default adminApi;
