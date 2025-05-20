import { useMemo } from "react"
import type { ProductType } from "../vite-env.d.ts"
import { calculateCategories } from "../services/products"

// Custom hook to filter products by category
export const useInitCategoryFilter = ({products}: {products: ProductType[]}) => {
    // const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])
    // const [categories, setCategories] = useState<CategoryType[]>([])

    // const refreshFilteredProducts = (products: ProductType[]): void => {
    //     if (!products || products.length === 0) {
    //         setFilteredProducts([])
    //         return
    //     }
    //     setFilteredProducts(products)
    // }

    // Update the filtered product list and categories when the main product list changes
    // useEffect(() => {
    //     // refreshFilteredProducts(products)
    //     setCategories(calculateCategories(products))
    // }, [products])

    const categories = useMemo(() => calculateCategories(products), [products])

    return {
        // filteredProducts,
        categories, 
        // refreshFilteredProducts
    }
    
}