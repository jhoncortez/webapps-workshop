import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CartProductType } from "../../../vite-env.d.ts"

interface CartState {
    cart: CartProductType[]
}  

const initialState: CartState = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartProductType>): CartState => {
            // state.cart.push(action.payload)
            if (!action.payload || !action.payload._id) {
                throw new Error("Product or product ID is missing");
            }            
            // if the product is already in the cart, increase the quantity
            if (state.cart.some((p: CartProductType) => p._id === action.payload?._id)) {
                return {cart: (state.cart.map((p: CartProductType) => {
                    if (p._id === action.payload?._id) {
                        return {...p, quantity: action.payload.quantity}
                    }
                    return p
                }))}
            }
            // add the product to the cart
            return {cart: [...state.cart, {...action.payload, quantity: action.payload.quantity || 1}]}
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload)
        },
        updateProductInCart: (state, action: PayloadAction<{id: string, quantity: number}>) => {
            state.cart = state.cart.map((item) => {
                if (item._id === action.payload.id) {
                    item.quantity = action.payload.quantity
                }
                return item
            })
        }
    }
})

// Export the generated action creators for use in components
export const { addToCart, removeFromCart, updateProductInCart } = cartSlice.actions

// Export the slice reducer for use in the store configuration
export default cartSlice.reducer