// http://localhost/projects/housestuffbackend/servicies/product_service.php?page=${page}&limit=${limit}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProductsResponse } from '../types/responseTypes/productsServiceResponse';
import { IDefaultResponse } from '../types/responseTypes/defaultResponseType';
import { IProduct } from '../types/compontentTypes/IProducts';

const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/projects/housestuffbackend/servicies/product_service.php' }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProductsResponse, {page:number, limit:number, category: string}>({
        query: ({page, limit, category}) => ({
            url: `?page=${page}&limit=${limit}&category=${category}`,
            method: 'GET',
          }), 
    }),
    
    postProduct: builder.query<IDefaultResponse,IProduct>({
        query: (product) => ({
            url: '/',
            method: 'POST',
            body:JSON.stringify({
                title: product.title,
                price: product.price,
                category: product.category,
                description: product.description,
                fullDesc: product.fullDesc,
                img: product.img
              }),
          }), 
    }),
    updateProduct: builder.query<IDefaultResponse, IProduct>({
        query: (product) => ({
            url: '/',
            method: 'PUT',
            body:JSON.stringify({
                title: product.title,
                price: product.price,
                category: product.category,
                description: product.description,
                fullDesc: product.fullDesc,
                img: product.img
              }),
          }),     
        }),
    deleteProduct: builder.query<IDefaultResponse, number>({
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

export const { useGetProductsQuery, useDeleteProductQuery, useUpdateProductQuery, usePostProductQuery } = productsApi;
export default productsApi;
