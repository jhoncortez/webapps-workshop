
import { useEffect, useCallback, useMemo, useRef } from "react"
import { useProductsContext } from "../contexts/ShopContext.tsx"
import { useGlobalContext } from "../contexts/GlobalContext"
import { getInitProducts, filterProducts, deleteProduct, getSingleProduct } from "../services/products"
import { validateSearchQuery } from "../services/formValidation"
import type { ProductType } from "../vite-env.d.ts"

// Custom hook to fetch initial product data
export const useInitProducts = ({req_url}: {req_url: string}) => {

    const {
        products,
        filteredProducts,
        searchQuery,
        categorySlug,
        setSearchQuery,
        setCategorySlug,
        setProducts,
        setFilteredProducts
    } = useProductsContext()


    const loadingErrors = useGlobalContext()
    
        // Fetch initial product data
        useEffect(() => {
            // set loading state to true
            loadingErrors.refreshLoading(true)
            // set error state to null
            loadingErrors.refreshError(null)
            // fetch initial product data
            getInitProducts({req_url: '/products' }).then(data => {
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
    
    
    const refreshSearchQuery = useCallback((query: string): void => {
        setSearchQuery(query)
    }
    , [])

    const refreshCategorySlug = useCallback((category: string): void => {
        setCategorySlug(category)
    }
    , [])

    // Memoized filtered products with validation
    const filteredProductsMemo = useMemo(() => {
        // Validate the search query
        const validation = validateSearchQuery(searchQuery);

        if (!validation.ok) {
            // loadingErrors.refreshError(validation.message); // Set the error message
            return []; // Return an empty array if the query is invalid
        }
        
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

// init singleProduct hook
export const useInitSingleProduct = ({id}: {id: string}): {data: ProductType} => { 

    const loadingErrors = useGlobalContext()
    

    const productRef = useRef({}) // useRef to store the product data for better performanceProductType = useRef({}); // useRef to store the product data for better performance
    // useRef is used to store the product data so that it doesn't cause re-renders when the product data changes
    // this is because useRef does not trigger a re-render when the value changes

    useEffect(() => {
        // set loading state to true
        loadingErrors.refreshLoading(true);
        // set error state to null
        loadingErrors.refreshError(null);
        getSingleProduct(id).then(data => {
            productRef.current = data;
        }).catch(err => {
            console.error(err);
            loadingErrors.refreshError('Failed to fetch product');
        }).finally(() => {
            loadingErrors.refreshLoading(false);
        });
    }, [id]);

    return {
        data: productRef.current as ProductType
    }
}