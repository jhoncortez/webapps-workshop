import { useReducer } from "react";
import type { CartProductType, ProductType } from "../vite-env"

// cart reducer
export function cartReducer(
    state: CartProductType[], 
    action: {
        type: string; 
        payload: {id?: string; product?: ProductType; quantity?: number}
    } ): CartProductType[] {
    
    const { type, payload } = action // destructuring the action

    switch (type) {
        case "ADDED_TO_CART":

            if (!payload.product || !payload.product._id) {
                throw new Error("Product or product ID is missing");
            }            
            // if the product is already in the cart, increase the quantity
            if (state.some((p: CartProductType) => p._id === payload.product?._id)) {
                return(state.map((p: CartProductType) => {
                    if (p._id === payload.product?._id) {
                        return {...p, quantity: payload.quantity}
                    }
                    return p
                }))
            }
            // add the product to the cart
            return[...state, {...payload.product, quantity: payload.quantity || 1}]
            
        case "REMOVED_FROM_CART":
            return state.filter((p: CartProductType) => p._id !== payload.id)
            
            
        case "UPDATED_PRODUCT_IN_CART":
            return state.map((p: CartProductType) => {
                if (p._id === payload.id) {
                    return {...p, quantity: payload.quantity || 1}
                }
                return p
            })
            
        default:
            console.warn(`Unhandled action type: ${type}`)
            return state
    }
}

// custom hook to use the cart reducer
export function useCartReducer(initialCart: CartProductType[] = []) {

    const [cart, dispatch] = useReducer(cartReducer, initialCart)

    const addToCart = (product: ProductType, quantity: number = 1) => {

        dispatch({type: "ADDED_TO_CART", payload: {product, quantity}})

    }

    const removeFromCart = (id: ProductType['_id']) => {
        
        dispatch({type: "REMOVED_FROM_CART", payload: { id }})
    }

    // unused un the products and cart components
    const updateProductInCart = (id: string, quantity: number) => {

        dispatch({type: "UPDATED_PRODUCT_IN_CART", payload: {id, quantity}})
        
    }

    return {cart, addToCart, removeFromCart, updateProductInCart}

}

