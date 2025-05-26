import type { ProductCategoriesProps } from "../vite-env.d.ts"
import Link  from "./Link.tsx"

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
                            
                                <li key={category.id}><Link to={`/category/:category`} params={{ category: category.slug }} className="category-link">{category.name}</Link></li>
                            
                        ))
                    }
                    
                    </ul>
                
                </>
            )   
        }
        
        </div>
        
    )
}
