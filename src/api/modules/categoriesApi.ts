import {  TDefaultResponse } from '../../types/responseTypes/TDefaultResponse';
import { ICategoriesResponse } from '../../types/responseTypes/TCategoriesServiceResponse';
import { TCategory } from '../../types/objectTypes/TCategory';
import baseApi from '../baseApi';
import { providesList } from '../../utils/providingTagsWIds';
import { apiURLs } from '../../values/stringValues';

const fragmentBaseUrl = apiURLs.paths.categoriesAPI

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategoriesResponse, void>({
        query: () => ({
            url: fragmentBaseUrl,
            method: 'GET',
          }), 
      providesTags: (result) => providesList(result, "Categories")
        
    }),
    getCategory: builder.query<ICategoriesResponse, {id:number}>({
      query: ({id}) => ({
          url: `${fragmentBaseUrl}?id=${id}`,
          method: 'GET',
        }), 
      providesTags: (_, __, arg) => [{ type: 'Categories', id: arg.id }],

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
        invalidatesTags: (_, __, arg) => [{ type: 'Categories', id: arg.id }], 
        }),
    deleteCategory: builder.mutation<TDefaultResponse, number>({
      query: (id) => ({
          url: fragmentBaseUrl,
          method: 'DELETE',
          body:JSON.stringify({
              id:id,
            }),
        }), 
        invalidatesTags: (_, __, arg) => [{ type: 'Categories', id: arg }],   }),
  }),
});

export const { 
  useGetCategoriesQuery,
  useGetCategoryQuery,
  usePostCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  usePrefetch,
} = categoriesApi;

export default categoriesApi;
