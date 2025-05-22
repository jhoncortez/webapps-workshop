import { createContext, useContext, useState, useMemo, useEffect, useReducer } from "react"
import type { ProductType, ProductsContextType, CartContextType, CartProductType } from "../vite-env.d.ts"

// Context for products

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({children}: {children: React.ReactNode}) => {

    const [products, setProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [categorySlug, setCategorySlug] = useState<string>("all");



    const value = {
        products,
        categorySlug,
        filteredProducts,
        searchQuery,
        setProducts,
        setFilteredProducts,
        setSearchQuery,
        setCategorySlug
    }

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProductsContext = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProductsContext must be used within a ProductsProvider");
    }
    return context;
}

// context for cart
const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({children}: {children: React.ReactNode}) => {

    // const [cart, setCart] = useState<CartProductType[]>([])
    const [cart, dispatch] = useReducer(cartReducer, [])

    const addToCart = (product: ProductType, quantity: number = 1) => {

        dispatch({type: "ADDED_TO_CART", payload: {product, quantity}})

    }

    const removeFromCart = (id: ProductType['_id']) => {
        
        dispatch({type: "REMOVED_FROM_CART", payload: { id }})
    }

    // unused un the products and cart components
    const updateProductInCart = (id: string, quantity: number) => {

        dispatch({type: "UPDATED_PRODUCT_IN_CART", payload: {id, quantity}})
        
    };

    // get the product quantity from the cart with useMemo
    const productInCartQuantity = useMemo(() => {
        return (id: string) => {
            return cart.find((item) => item._id === id)?.quantity || 0
        }
    }, [cart])


    const value = useMemo(() => ({
        
        cart,
        addToCart,
        removeFromCart,
        updateProductInCart,
        productInCartQuantity,
    }), [cart])

    // test cart rendering
    useEffect(() => {
        console.log(cart)
    }, [cart])

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
}

export function cartReducer(
    state: CartProductType[], 
    action: {
        type: string; 
        payload: {id?: string; product?: ProductType; quantity?: number}
    } ): CartProductType[] {
    
    const { type, payload } = action 

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
