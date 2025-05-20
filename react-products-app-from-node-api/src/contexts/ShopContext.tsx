import {useMemo, createContext, useContext} from "react"
// import { ProductsContextType } from "../vite-env.d.ts"
import { useInitProducts } from "../hooks/productsHooks"

// Context for products
const ProductsContext = createContext<ReturnType<typeof useInitProducts> | undefined>(undefined)

export const ProductsProvider = ({children}: {children: React.ReactNode}) => {

    const {
        products,
        categorySlug,
        filteredProducts,
        refreshSearchQuery,
        refreshCategorySlug,
        removeProduct
    } = useInitProducts({req_url: `/products`})

    

    const value = useMemo(() => ({
        products,
        categorySlug,
        filteredProducts,
        refreshSearchQuery,
        refreshCategorySlug,
        removeProduct

    }), [products,
        categorySlug,
        filteredProducts])

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