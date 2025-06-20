import { useEffect, useMemo, useState, useCallback } from "react"
import type { ProductType } from "../vite-env.d.ts"
// import { useCartContext } from "../contexts/ShopContext";
import { removeFromCart, addToCart } from "../redux/features/cart/cartSlice.ts"
import { useAppDispatch, useAppSelector } from "../redux/hooks.ts"
import type { CartProductType } from "../vite-env.d.ts"
// import { useCartContext } from "../contexts/ShopContext.tsx"

export const useInitCart = (productId?: string) => {
    const cart: CartProductType[] = useAppSelector((state) => state.cart.cart)
    const dispatch = useAppDispatch()

    const [isInCart, setIsInCart] = useState(false)
    const [quantity, setQuantity] = useState(1)
    // console.log(isInCart, quantity)

    
    const dispatchAddToCart = useCallback(({product, quantity}: {product: ProductType, quantity: number}) => {
        dispatch(addToCart({...product, quantity}))
    }, [])

    const dispatchRemoveFromCart = useCallback((id: string) => {
        dispatch(removeFromCart(id))
    }, [])

    const productInCartQuantity = useMemo(() => (id: string) => {
        return cart.find((item) => item._id === id)?.quantity || 1
    }, [cart])

    const productInCart = useMemo(() => (id: string) => {
        return cart.find((item) => item._id === id)
    }, [])

    const handleSetInCart = useCallback((id: string) => {
        setIsInCart(cart.some((item) => item._id === id))
    }, [cart])

    const handleSetQuantity = useCallback((value: number) => {
        setQuantity(value)
    }, [])



    // useEffect(() => {
    //     localStorage.setItem('cart', JSON.stringify()) // save cart to local storage
    // }, [cart])
    
    
    
    // check if the product is in the cart
    useEffect(() => {
        // console.log(productId, cart.some((item) => item._id === productId))
        setIsInCart(cart.some((item) => item._id === productId))
    },[cart, productId])
    
    // update the quantity of the product in the cart
    useEffect(() => {
            
        // setQuantity( isInCart ? cart.find((item) => item._id === productId)?.quantity || 1 : 1)
        setQuantity(productInCartQuantity(productId as string))
    }, [isInCart, cart])

    return { isInCart, quantity, cart, dispatchAddToCart, dispatchRemoveFromCart, productInCartQuantity, productInCart, handleSetInCart, handleSetQuantity } // return useCartContext()
}