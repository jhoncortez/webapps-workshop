
import { useState, useEffect, useCallback, useMemo } from "react"
import type { ProductType } from "../vite-env.d.ts"
import { useGlobalContext } from "../contexts/GlobalContext"
import { getInitProducts, filterProducts, deleteProduct } from "../services/products"
import { validateSearchQuery } from "../services/formValidation"

// Custom hook to fetch initial product data
export const useInitProducts = ({req_url}: {req_url: string}) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [categorySlug, setCategorySlug] = useState<string>("all");

    const loadingErrors = useGlobalContext()
    
    const refreshSearchQuery = useCallback((query: string): void => {
        setSearchQuery(query)
    }
    , [])

    const refreshCategorySlug = useCallback((category: string): void => {
        setCategorySlug(category)
    }
    , [])

    // Fetch initial product data
    useEffect(() => {
        // set loading state to true
        loadingErrors.refreshLoading(true)
        // set error state to null
        loadingErrors.refreshError(null)
        // fetch initial product data
        getInitProducts({req_url: req_url }).then(data => {
            // handle error if data is ok
            if (!data) {
                loadingErrors.refreshError('Products not found') 
                return []
            }
            // update the product list
            setProducts(data)
        }).catch(err => {
            console.error(err)
            loadingErrors.refreshError('Failed to fetch products') 
        }).finally(() => {
            loadingErrors.refreshLoading(false)
        })
    }, [req_url])

    // Memoized filtered products with validation
    const filteredProductsMemo = useMemo(() => {
        // Validate the search query
        const validation = validateSearchQuery(searchQuery);

        if (!validation.ok) {
            // loadingErrors.refreshError(validation.message); // Set the error message
            return []; // Return an empty array if the query is invalid
        }

        // loadingErrors.refreshError(null); // Clear the error message if the query is valid

        // Filter products by search query and category
        // const filtered = filterProducts(products, searchQuery, categorySlug);
        // if (!filtered || filtered.length === 0) {
        //     loadingErrors.refreshError('Products not found');
        //     return []; // Return an empty array or handle the case appropriately
        // }
        // return filtered;
        const filtered = filterProducts(products, searchQuery, categorySlug)
        return filtered || []
    }, [products, searchQuery, categorySlug]);


    // Update filtered products whenever the memoized value changes
    useEffect(() => {

        setFilteredProducts(filteredProductsMemo)

        const validation = validateSearchQuery(searchQuery)

        if (!validation.ok) {
            loadingErrors.refreshError(validation.message) // State update moved to useEffect
            return
        }

        if (filteredProductsMemo.length === 0) {
            loadingErrors.refreshError('Products not found')
            return
        }

        loadingErrors.refreshError(null); // Clear error if valid
        
    }, [filteredProductsMemo, searchQuery]);

    // Remove a product
    const removeProduct = (id: string) => {
        const updatedProducts = deleteProduct(products, id);
        setProducts(updatedProducts);
    };

    // testing infinit loop for re-render
    useEffect(() => {
        console.log('ProductsProvider rendered');
    }, []);

    return {
        products,
        categorySlug,
        filteredProducts,
        refreshSearchQuery,
        refreshCategorySlug,
        removeProduct
    }
}