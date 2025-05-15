import type { ProductCategoriesProps } from "../vite-env.d.ts"

import '../assets/css/productCategories.css'

export default function ProductCategories( { categories }: { categories: ProductCategoriesProps["categories"] } ) {
    return (
        <div className="product-categories">

        {
            categories && categories?.length > 0 && ( // check if categories is defined and not empty
                
                <>
                    <p className="label">Categories: </p>
                    <ul className="category-list">
                
                    {
                        categories.map(category => (
                            
                                <li key={category.id}><a href={`/category/${category.slug}`} className="category-link">{category.name}</a></li>
                            
                        ))
                    }
                    
                    </ul>
                
                </>
            )   
        }
        
        </div>
        
    )
}
