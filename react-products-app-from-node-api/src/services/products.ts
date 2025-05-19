import type { ProductType } from "../vite-env.d.ts"

// fetch initial product data
const BASE_ROOT = 'http://localhost:3004/api'
export const getInitProducts = ( {req_url}: {req_url: string}): Promise<ProductType[]> => {
    const response = fetch(`${BASE_ROOT}${req_url}`)
    const data = response.then(res => res.json())
    return data
}

    // calculate categories function 
    export const calculateCategories = (products: ProductType[]) => {
        const allCategories = products.flatMap(product => product.categories || []);
        const uniqueCategories = Array.from(
            new Map(allCategories.map(category => [category.id, category])).values()
        );
        return uniqueCategories
    }