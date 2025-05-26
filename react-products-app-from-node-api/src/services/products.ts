import type { ProductType } from "../vite-env.d.ts"

// fetch initial product data
const BASE_ROOT = 'http://localhost:3005/api'
export const getInitProducts = ( {req_url}: {req_url: string}): Promise<ProductType[]> => {
    const response = fetch(`${BASE_ROOT}${req_url}`)
    const data = response.then(res => res.json())
    return data
}

export const filterProducts = (products: ProductType[], searchQuery: string, categorySlug: string) => products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
        categorySlug === "all" || product.categories?.some((category) => category.slug === categorySlug);
    return matchesSearch && matchesCategory;
});

export const deleteProduct = (products: ProductType[], id: string) => products.filter(product => product._id !== id)

    // calculate categories function 
    export const calculateCategories = (products: ProductType[]) => {
        const allCategories = products.flatMap(product => product.categories || []);
        const uniqueCategories = Array.from(
            new Map(allCategories.map(category => [category.id, category])).values()
        );
        return uniqueCategories
    }

export const getSingleProduct = (id: string): Promise<ProductType> => {
    console.log('getSingleProduct', id);
    const response = fetch(`${BASE_ROOT}/products/${id}`)
    const data = response.then(res => res.json())
    console.log('getSingleProduct', data);
    return data
}
//     if (validation.ok) {