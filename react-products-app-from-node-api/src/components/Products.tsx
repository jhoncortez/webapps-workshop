import { useMemo, useState } from "react"
import Product from "./Product"
import CategoryFilter from "./CategoryFilter"
import type { ProductType } from "../vite-env.d.ts"

import '../assets/css/products.css'

const initProducts: ProductType[] = [
    {
        id: '5678g8f9g',
        name: 'Product 1',
        price: '9.99',
        categories: [
            {
                id: 1,
                name: 'Category 1',
                slug: 'category-1'
            },
            {
                id: 2,
                name: 'Category 2',
                slug: 'category-2'
            }
        ],
        images: [
            {
                id: 1,
                src: 'https://via.placeholder.com/150',
                name: 'Image 1',
                alt: 'Image 1'
            },
            {
                id: 2,
                src: 'https://via.placeholder.com/150',
                name: 'Image 2',
                alt: 'Image 2'
            }
        ]
    },
    {
        id: '5678g8f92',
        name: 'Product 2',
        price: '20.99',
        categories: [
            {
                id: 2,
                name: 'Category 2',
                slug: 'category-2'
            }
        ],
        images: [
        ]
    },
    {
        id: '5678g8f95',
        name: 'Product 3',
        price: '56.99',
        categories: [
            
        ],
        images: [
            {
                id: 1,
                src: 'https://via.placeholder.com/150',
                name: 'Image 1',
                alt: 'Image 1'
            }
        ]
    }
]
const Products = () => {

    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(initProducts)
    const [products, setProducts] = useState<ProductType[]>(initProducts)

    // calculate categories function 
    const calculateCategories = (products: ProductType[]) => {
        const allCategories = products.flatMap(product => product.categories || []);
        const uniqueCategories = Array.from(
            new Map(allCategories.map(category => [category.id, category])).values()
        );
        return uniqueCategories
    }

        // Memoize categories derived from the current product list
        const categories = useMemo(() => { // memoize the result of this function
            // if (!initProducts || initProducts.length === 0) {
            //     return [];
            // }
            return calculateCategories(products)
        }, [products]); // 
 
    // function to filter products by category
    const categoryFilterHandler = (categorySlug: string) => {
        if (categorySlug === 'all') {
            setFilteredProducts(products)
            return
        }
        const filtered = products.filter(product => product.categories?.some(category => category.slug === categorySlug))
        setFilteredProducts(filtered)
    }

    const removeProductHandler = (id: string) => {
        // Remove the product from the main product list
        const updatedProducts = products.filter(product => product.id !== id)

        // Update the filtered product list
        const updatedFilteredProducts = filteredProducts.filter(product => product.id !== id)

        setProducts(updatedProducts)
        setFilteredProducts(updatedFilteredProducts)
    }

    return (
        <div>
            <h1>Products</h1>
            {/* jsx structure to display the list of products */}
            <CategoryFilter categories={categories} onFilter={categoryFilterHandler} />
            {
                filteredProducts && filteredProducts.length > 0 ? ( 
                    <>
                        <div className="product-list">
                            {filteredProducts.map(product => <Product key={product.id} data={product} onRemove={removeProductHandler} />)}
                        </div>
                    </>
                
                ) : <p>No products found</p> 
            }
            {/* <div className="product-list">

                <div className="product-item">
                    <h2>Product 1</h2> 
                    <p>Description of Product 1</p>
                </div>
                <div className="product-item">
                    <h2>Product 2</h2> 
                    <p>Description of Product 2</p>
                </div>
                <div className="product-item">
                    <h2>Product 3</h2> 
                    <p>Description of Product 3</p>
                </div>
            </div> */}
        </div>
    )
}

export default Products