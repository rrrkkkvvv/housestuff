import { TProductResponse, TProductsResponse } from '../../types/responseTypes/TProductsServiceResponse';
import { TDefaultResponse } from '../../types/responseTypes/TDefaultResponse';
import { TProduct } from '../../types/objectTypes/TProduct';
import baseApi from '../baseApi';
import { providesList } from '../../utils/providingTagsWIds';

const fragmentBaseUrl = "/product_service.php"

const productsApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    getProducts: builder.query<TProductsResponse, {page:number, limit:number, category: string}>({
      query: ({page, limit, category}) => ({
          url: `${fragmentBaseUrl}?page=${page}&limit=${limit}&category=${category}`,
          method: 'GET',
        }), 
      providesTags: (result) => providesList(result, "Products")
    }),
    getProduct: builder.query<TProductResponse, {id:number}>({
      query: ({id}) => ({
          url: `${fragmentBaseUrl}?id=${id}`,
          method: 'GET',
        }), 
      providesTags: (_, __, arg) => [{ type: 'Products', id: arg.id }],

  }),
    
    postProduct: builder.mutation<TDefaultResponse,TProduct>({
        query: (product) => ({
            url: fragmentBaseUrl,
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
        invalidatesTags:["Products"]
    }),
    updateProduct: builder.mutation<TDefaultResponse, TProduct>({
      query: (product) => ({
        url: fragmentBaseUrl,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: product.title,
          price: product.price,
          category: product.category,
          description: product.description,
          fullDesc: product.fullDesc,
          img: product.img,
          id: product.id
        }),
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Products', id: arg.id }],
    }),
    
    deleteProduct: builder.mutation<TDefaultResponse, number>({
      query: (id) => ({
          url: fragmentBaseUrl,
          method: 'DELETE',
          body:JSON.stringify({
              id:id,
            }),
        }),
        invalidatesTags: (_, __, arg) => [{ type: 'Products', id: arg }],
      }),
  }),
});
export const { 
  useGetProductsQuery,
  useGetProductQuery,
  useDeleteProductMutation,
  usePostProductMutation,
  useUpdateProductMutation,
  usePrefetch 
} = productsApi;
export default productsApi;
