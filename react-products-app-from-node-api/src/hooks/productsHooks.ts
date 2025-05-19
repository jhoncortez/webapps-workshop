
import { useState, useEffect } from "react"
import type { ProductType, LoadingErrorsType } from "../vite-env.d.ts"
import { getInitProducts } from "../services/products"

// Custom hook to fetch initial product data
export const useInitProducts = ({req_url, loadingErrors}: {req_url: string; loadingErrors: LoadingErrorsType}) => {
    const [products, setProducts] = useState<ProductType[]>([])

    const refreshProducts = (products: ProductType[]): void => {
        setProducts(products)
    }
    

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
            refreshProducts(data)
        }).catch(err => {
            console.error(err)
            loadingErrors.refreshError('Failed to fetch products')
        }).finally(() => {
            loadingErrors.refreshLoading(false)
        })
    }, [])

    return {
        products,
        refreshProducts
    }
}