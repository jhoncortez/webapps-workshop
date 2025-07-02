import { useCallback, useEffect, useMemo } from "react"
import { useGetCartQuery, useAddProductMutation, useUpdateProductMutation, useRemoveProductMutation, useClearCartMutation } from "../rtk/services/cartApi"
import type { CartQueryResponse, CartProductResponse, ProductType, CartItemResponse, CartProductRequestBody } from "../vite-env"
import { useInitAuth } from "./authHooks"



export const useInitCart = () => {

    const {IsAuth, user} = useInitAuth()
    
    const { data, isLoading, isError, isSuccess, refetch } = useGetCartQuery()
    
    
    // const cart = useMemo(() => data?.data, [data])
    
    const [addProduct, { isLoading: isLoadingAddProduct, isError: isErrorAddProduct, isSuccess: isSuccessAddProduct }] = useAddProductMutation() 
    // const [] = useUpdateProductMutation()
    const [removeProduct] = useRemoveProductMutation()

    const [updateProduct] = useUpdateProductMutation()

    const [clearCart] = useClearCartMutation()
    // const [{}] = useClearCartMutation()


    // const [isInCart, setIsInCart] = useState(false)
    // const [quantity, setQuantity] = useState(1)

    const dispatchAddToCart = useCallback(({productId, quantity}: {productId: string, quantity: number}) => {
        addProduct({productId, quantity})
    }, [])

    const dispatchUpdateProductInCart = useCallback(({productId, quantity}: {productId: string, quantity: number}) => {
        updateProduct({productId, quantity})
    }, [])

    const dispatchRemoveFromCart = useCallback((id: string) => {
        removeProduct({productId: id})
    }, [])

    const cart = useMemo(() => data?.data , [data?.data]) as CartProductResponse | null

    const productInCartQuantity = useCallback((id: string) => {
        console.log('productInCartQuantity cart: ', cart)
        if (!cart || !Array.isArray(cart.products)) return 1
        return cart.products.find((item) => item.productId === id)?.quantity || 1
    }, [data, cart?.products])

    const productInCart = useCallback((id: string) => {
        if (!cart || !Array.isArray(cart.products)) return undefined
        return cart.products.find((item) => item.productId === id)
    }, [data, cart?.products])

    // const handleSetInCart = useCallback((id: string) => {
    //     setIsInCart(cart.some((item) => item._id === id))
    // }, [cart])

    // const handleSetQuantity = useCallback((value: number) => {
    //     setQuantity(value)
    // }, [])


    useEffect(() => {
        if (IsAuth()) {
            refetch();
        }
    }, [data, refetch, user])



    console.log('data for cart: ', cart)


    return {
        cart, 
        isLoading, 
        isError, 
        isSuccess,
        isLoadingAddProduct, 
        isErrorAddProduct, 
        isSuccessAddProduct,
        productInCartQuantity, 
        productInCart,
        dispatchAddToCart, 
        dispatchRemoveFromCart,
        dispatchUpdateProductInCart, 
        refetch
    }
}