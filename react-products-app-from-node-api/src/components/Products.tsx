import { useGlobalContext } from "../contexts/GlobalContext"
import { useInitProducts } from "../hooks/productsHooks"
import Product from "./Product"
import CategoryFilter from "./CategoryFilter"
import { SearchProductsForm } from "./SearchProductsForm"
import { useInitCategoryFilter } from "../hooks/categoriesHooks"
// import { useInitProducts } from "../hooks/productsHooks"


import '../assets/css/products.css'

// Main component
const Products = () => {

    const loadingErrors = useGlobalContext()

    // init products custom hook
    const { products,
        filteredProducts,
        removeProduct,
    } = useInitProducts({req_url: '/products' })

    // init category filter custom hook
    const { categories } = useInitCategoryFilter({products})

 
    // // function to filter products by category
    // const categoryFilterHandler = (categorySlug: string) => {
    //     refreshCategorySlug(categorySlug)
    //     // if (categorySlug === 'all') {
    //     //     refreshFilteredProducts(products) 
    //     //     return
    //     // }
    //     // const filtered = products.filter(product => product.categories?.some(category => category.slug === categorySlug))
    //     // refreshFilteredProducts(filtered)
    // }

    // const removeProductHandler = (id: string) => {
    //     // Remove the product from the main product list
    //     removeProduct(id)
    //     // Remove the product from the filtered product list
    // }

    // const submitSearchHandler = (searchQuery: string) => {
    //     refreshSearchQuery(searchQuery)
    // }

    // // test if refreshProducts is being re-created in each render
    // // useEffect(() => {
    // //     console.log('refreshSearchQuery', refreshCategorySlug)
    // // }, [refreshCategorySlug])
    

    return (
        <div>
            <h1>Products</h1>
            
            {/* jsx structure to display the list of products */}
            <SearchProductsForm />
            <CategoryFilter categories={categories} />
            {
                loadingErrors.loading && (<p>Loading...</p>)
            }
            
            {
                !filteredProducts || filteredProducts.length === 0 ?
                (
                loadingErrors.error !== null && (
                    <>
                        {
                            loadingErrors.error && (<p>{loadingErrors.error}</p>)
                        }
                    </>
                    )
                
                ) : ( 
                    <>
                        <div className="product-list">
                            {filteredProducts.map(product => <Product key={product._id} data={product} onRemove={removeProduct} />)}
                        </div>
                    </>
                
                ) 
            }
        </div>
    )
}

export default Products