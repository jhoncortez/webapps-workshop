import Product from "./Product"
import CategoryFilter from "./CategoryFilter"
import { SearchProductsForm } from "./SearchProductsForm"
import { validateSearchQuery } from "../services/formValidation"
import { useLoadingError } from "../hooks/mainHooks"
import { useInitCategoryFilter } from "../hooks/categoriesHooks"
import { useInitProducts } from "../hooks/productsHooks"

import '../assets/css/products.css'

// Main component
const Products = () => {

    const loadingErrors = useLoadingError()

    // init products custom hook
    const { products, refreshProducts } = useInitProducts({req_url: `/products` , loadingErrors: loadingErrors})

    // init category filter custom hook
    const { filteredProducts, categories, refreshFilteredProducts } = useInitCategoryFilter({products})

 
    // function to filter products by category
    const categoryFilterHandler = (categorySlug: string) => {
        if (categorySlug === 'all') {
            refreshFilteredProducts(products) 
            return
        }
        const filtered = products.filter(product => product.categories?.some(category => category.slug === categorySlug))
        refreshFilteredProducts(filtered)
    }

    const removeProductHandler = (id: string) => {
        // Remove the product from the main product list
        const updatedProducts = products.filter(product => product._id !== id)

        // Update the filtered product list
        // const updatedFilteredProducts = filteredProducts.filter(product => product._id !== id)

        // Update the state
        refreshProducts(updatedProducts)
        // setFilteredProducts(updatedFilteredProducts)
    }

    const submitSearchHandler = (searchQuery: string) => {

        if(searchQuery === '') {
            refreshFilteredProducts(products)
            return
        }

        const validateSearchQueryResponse = validateSearchQuery(searchQuery)
        if (!validateSearchQueryResponse.ok) {
            loadingErrors.refreshError(validateSearchQueryResponse.message)
            refreshFilteredProducts([])
            return
        }
        const filtered = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        if (filtered.length === 0) {
            loadingErrors.refreshError('No products found')
            refreshFilteredProducts([])
            return
        }
        refreshFilteredProducts(filtered)
    }

    const searchInputChangeHandler = (searchQuery: string | null) => {
        if (!searchQuery) {
            refreshFilteredProducts(products)
        }
    }

    return (
        <div>
            <h1>Products</h1>
            
            {/* jsx structure to display the list of products */}
            <SearchProductsForm onSearchProductSubmit={submitSearchHandler} onSearchInputChange={searchInputChangeHandler} />
            <CategoryFilter categories={categories} onFilter={categoryFilterHandler} />
            {
                loadingErrors.loading && (<p>Loading...</p>)
            }
            
            {
                !filteredProducts || filteredProducts.length === 0 ?
                (
                !loadingErrors.loading && (
                    <>
                        {
                            loadingErrors.error && (<p>{loadingErrors.error}</p>)
                        }
                    </>
                    )
                
                ) : ( 
                    <>
                        <div className="product-list">
                            {filteredProducts.map(product => <Product key={product._id} data={product} onRemove={removeProductHandler} />)}
                        </div>
                    </>
                
                ) 
            }
        </div>
    )
}

export default Products