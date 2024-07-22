import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  IDefaultResponse } from '../types/responseTypes/defaultResponseType';
import { ICategoriesResponse } from '../types/responseTypes/categoriesServiceResponse';
import { ICategory } from '../types/compontentTypes/ICategories';

const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/projects/housestuffbackend/servicies/categories_service.php' }),
  endpoints: (builder) => ({
    getCategories: builder.query<ICategoriesResponse, void>({
        query: () => ({
            url: '/',
            method: 'GET',
          }), 
    }),
    postCategory: builder.mutation<IDefaultResponse,ICategory>({
        query: ({title, visible_title}) => ({
            url: '/',
            method: 'POST',
            body:JSON.stringify({
                title: title,
                visible_title: visible_title,
              }),
          }), 
    }),
    updateCategory: builder.mutation<IDefaultResponse, ICategory>({
        query: ({title, visible_title, id}) => ({
            url: '/',
            method: 'PUT',
            body:JSON.stringify({
                id:id,
                title: title,
                visible_title: visible_title,
              }),
          }), 
    }),
    deleteCategory: builder.mutation<IDefaultResponse, number>({
      query: (id) => ({
          url: '/',
          method: 'DELETE',
          body:JSON.stringify({
              id:id,
            }),
        }), 
  }),

  }),
});

export const { useGetCategoriesQuery , usePostCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation} = categoriesApi;
export default categoriesApi;
