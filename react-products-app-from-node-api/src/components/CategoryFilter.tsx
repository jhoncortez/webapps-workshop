// import { useState } from 'react'
import type { CategoryType } from '../vite-env'
import { useProductsContext } from '../contexts/ShopContext'
import CategoryFilterButton from './CategoryFilterButton'

import '../assets/css/categoryFilter.css'


const CategoryFilter = ({ categories }: { categories: CategoryType[] | undefined | null} ) => {

    // const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const { categorySlug: selectedCategory, refreshCategorySlug: onFilter } = useProductsContext()
    const handleFilterChange = (categorySlug: string = 'all') => {
        // setSelectedCategory(categorySlug);
        onFilter(categorySlug);
      };
      
    return (
        <div className="category-filter">
            <h2>Filter by Category</h2>
            <ul>
            <li><CategoryFilterButton selected={ selectedCategory ? selectedCategory : 'all' } category={undefined} handleFilterChange={handleFilterChange} /></li>
            {
                categories && categories.length > 0 && ( // check if categories is defined and not empty
                    
                        
                        categories.map(category => (
                            <li key={category.id}>
                                <CategoryFilterButton selected={ selectedCategory } category={category} handleFilterChange={handleFilterChange} />
                            </li>
                        ))
                    

                )
            }
            </ul>
            
        </div>
    )
}

export default CategoryFilter