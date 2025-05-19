import type { CategoryType } from "../vite-env.d.ts"
const CategoryFilterButton = ({ selected, category, handleFilterChange }: { selected: string | null; category: CategoryType | undefined; handleFilterChange: (category: string) => void }) => {
    const categorySlug = category ? category.slug : 'all';
    return  (
        <button className={selected === categorySlug ? 'active' : ''} onClick={() => handleFilterChange(categorySlug)}>
            { category ? category.name : 'All' }
        </button>
    )
};

export default CategoryFilterButton