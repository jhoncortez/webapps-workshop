import { useState } from 'react'
import type { CategoryFilterProps } from '../vite-env'
import CategoryFilterButton from './CategoryFilterButton'

import '../assets/css/categoryFilter.css'


const CategoryFilter = ({ categories, onFilter }: CategoryFilterProps) => {

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const handleFilterChange = (categorySlug: string = 'all') => {
        setSelectedCategory(categorySlug);
        onFilter(categorySlug);
      };
      
    return (
        <div className="category-filter">
            <h2>Filter by Category</h2>
            <ul>
            <li><CategoryFilterButton selected={ 'all' } category={undefined} handleFilterChange={handleFilterChange} /></li>
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