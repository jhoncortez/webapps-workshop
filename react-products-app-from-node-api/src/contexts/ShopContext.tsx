import { createContext, useContext, useState, useMemo, useEffect } from "react"
import type { ProductType, ProductsContextType, CartContextType, CartProductType } from "../vite-env.d.ts"
import { useCartReducer } from "../reducers/cartReducer.ts"
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

/**
 * context for cart
 * this context handles the cart
 */

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({children}: {children: React.ReactNode}) => {

    const initialCart: CartProductType[] = JSON.parse(localStorage.getItem('cart') || '[]') // get cart from local storage

    // use cart reducer
    const {cart, addToCart, removeFromCart, updateProductInCart} = useCartReducer(initialCart) // use cart reducer

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart)) // save cart to local storage
    }, [cart])

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