import { useEffect, useMemo } from "react"
import { useCartContext } from "../contexts/ShopContext";

export const useInitCart = () => {

    const { cart, addToCart, removeFromCart, updateProductInCart } = useCartContext()

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart)) // save cart to local storage
    }, [cart])
    
    // get the product quantity from the cart with useMemo
    const productInCartQuantity = useMemo(() => {
        return (id: string) => {
            return cart.find((item) => item._id === id)?.quantity || 0
        }
    }, [cart])

    return { cart, addToCart, removeFromCart, updateProductInCart, productInCartQuantity } // return useCartContext()
}