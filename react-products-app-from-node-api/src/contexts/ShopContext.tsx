import { createContext, useContext, useState, useMemo, useEffect } from "react"
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

    const [cart, setCart] = useState<CartProductType[]>([])

    const addToCart = (product: ProductType, quantity: number = 1) => {
        // if the cart already contains the product, increase the quantity
        // otherwise add the product to the cart
        if (cart.some((p: CartProductType) => p._id === product._id)) {
            setCart(cart.map((p: CartProductType) => {
                if (p._id === product._id) {
                    return {...p, quantity: quantity}
                }
                return p
            }))
            return
        }
        setCart(prevCart => [...prevCart, {...product, quantity: quantity}])
    
        // if the product is already in the cart, do nothing
        // if (cart.some((p: ProductType) => p._id === product._id)) {
        //     return
        // }
        // setCart(prevCart => [...prevCart, product])
    }

    const removeFromCart = (id: ProductType['_id']) => {
        // if the product is already in the cart, remove it
        if (cart.some((p: CartProductType) => p._id === id)) {
            setCart(prevCart => prevCart.filter((p: CartProductType) => p._id !== id))
            return
        }
    }

    // unused un the products and cart components
    const updateProductInCart = (id: string, quantity: number) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const itemIndex = updatedCart.findIndex((item) => item._id === id);
            if (itemIndex !== -1) {
                updatedCart[itemIndex] = { ...updatedCart[itemIndex], quantity };
            }
            return updatedCart;
        });
    };

    // get the product quantity from the cart with useMemo
    const productInCartQuantity = useMemo(() => {
        return (id: string) => {
            return cart.find((item) => item._id === id)?.quantity || 0
        }
    }, [cart])

    // calculate total price
    // const calculateTotalPrice = (cart: CartProductType[]) => {
    //     return cart.reduce((total, item) => total + item.price * item.quantity, 0)
    // }

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
};