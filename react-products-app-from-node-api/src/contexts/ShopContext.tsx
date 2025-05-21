import { createContext, useContext, useState } from "react"
import type { ProductType, ProductsContextType } from "../vite-env.d.ts"

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
};

// export const ShopContext = createContext<any>(undefined)

// export const ShopProvider = ({children}: {children: React.ReactNod}) => {

//     const value = useMemo(() => [], [])

//     return (
//         <ShopContext.Provider value={}>
//             {children}
//         </ShopContext.Provider>
//     )
    
// )

// export const useShopContext = () => {
//     const context = useContext(ProductsContext);
//     if (!context) {
//         throw new Error("useShopContext must be used within a ShopProvider");
//     }
//     return context;
// };