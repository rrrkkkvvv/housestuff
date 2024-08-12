import {  TDefaultResponse } from '../../types/responseTypes/TDefaultResponse';
import { ICategoriesResponse } from '../../types/responseTypes/TCategoriesServiceResponse';
import { TCategory } from '../../types/objectTypes/TCategory';
import baseApi from '../baseApi';

const fragmentBaseUrl = "/categories_service.php"

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategoriesResponse, void>({
        query: () => ({
            url: fragmentBaseUrl,
            method: 'GET',
          }), 
        providesTags: ["Categories"]
    }),
    postCategory: builder.mutation<TDefaultResponse,TCategory>({
        query: ({title, visible_title}) => ({
            url: fragmentBaseUrl,
            method: 'POST',
            body:JSON.stringify({
                title: title,
                visible_title: visible_title,
              }),
          }), 
          invalidatesTags: ["Categories"]
    }),
    updateCategory: builder.mutation<TDefaultResponse, TCategory>({
        query: ({title, visible_title, id}) => ({
            url: fragmentBaseUrl,
            method: 'PUT',
            body:JSON.stringify({
                id:id,
                title: title,
                visible_title: visible_title,
              }),
          }), 
        invalidatesTags: ["Categories"]
    }),
    deleteCategory: builder.mutation<TDefaultResponse, number>({
      query: (id) => ({
          url: fragmentBaseUrl,
          method: 'DELETE',
          body:JSON.stringify({
              id:id,
            }),
        }), 
      invalidatesTags: ["Categories"]
  }),
  }),
});

export const { useGetCategoriesQuery , usePostCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation} = categoriesApi;
export default categoriesApi;
