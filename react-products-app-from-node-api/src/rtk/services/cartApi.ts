/**
 * Cart API using RTK Query
 *
 * This API handles the cart-related endpoints:
 *  - GET /cart: Retrieve the current cart
 *  - POST /cart/addProduct: Add a product to the cart
 *  - PATCH /cart/updateProduct: Update the quantity of a product in the cart
 *  - PATCH /cart/deleteProduct: Remove a product from the cart
 *  - DELETE /cart/deleteCart: Clear the entire cart
 *
 * The API uses the fetchBaseQuery from RTK Query and sets the base URL to the
 * BACKEND_BASE_URL environment variable.
 *
 * The API also sets the credentials option to 'include' to allow cookies to be
 * sent with the requests.
 *
 * The API defines the following endpoints:
 *  - getCart: Retrieve the current cart
 *  - addProduct: Add a product to the cart
 *  - updateProduct: Update the quantity of a product in the cart
 *  - removeProduct: Remove a product from the cart
 *  - clearCart: Clear the entire cart
 *
 * The API uses the providesTags and invalidatesTags options to manage the cache
 * of the cart. The getCart endpoint provides the 'Cart' tag and the other
 * endpoints invalidate the 'Cart' tag. This means that when any of the other
 * endpoints are called, the cache will be invalidated and the getCart endpoint
 * will be re-run to retrieve the latest cart.
 *
 * @see https://redux-toolkit.js.org/rtk-query/usage/queries
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CartProductType, CartQueryResponse } from "../../vite-env.d.ts"

export const cartApi = createApi({
  reducerPath: 'cartApi', // The name of the slice
  baseQuery: fetchBaseQuery({ 
    baseUrl: `http://localhost:3005/api/cart`,
    credentials: 'include', // Critical for cookies - do not remove
    prepareHeaders: (headers) => {
      // Optional: Add other headers if needed
      headers.set('Accept', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['Cart'], // Define the tag type - used for invalidation
  endpoints: (build) => ({
    getCart: build.query<CartQueryResponse, void>({
      query: () => '/',
      providesTags: ['Cart']
    }),
    addProduct: build.mutation<CartQueryResponse, { productId: string; quantity: number }>({
      query: (body) => ({
        url: `/addProduct/${body.productId}`,
        method: 'POST',
        body: {product: body}
      }),
      invalidatesTags: ['Cart'] // Add the tag to the mutation - cache will be invalidated
    }),
    updateProduct: build.mutation<CartQueryResponse, { productId: string; quantity: number }>({
      query: (body) => ({
        url: `/updateProduct/${body.productId}`,
        method: 'PATCH',
        body: {product: body}
      }),
      invalidatesTags: ['Cart']
    }),
    removeProduct: build.mutation<void, { productId: string }>({
      query: (body) => ({
        url: `/deleteProduct/${body.productId}`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Cart']
    }),
    clearCart: build.mutation<void, void>({
      query: () => ({
        url: '/deleteCart',
        method: 'DELETE'
      }),
      invalidatesTags: ['Cart']
    })
  })
});

export const { useGetCartQuery, useAddProductMutation, useUpdateProductMutation, useRemoveProductMutation, useClearCartMutation } = cartApi