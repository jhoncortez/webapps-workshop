import type { CategoryType } from "../vite-env.d.ts"
const CategoryFilterButton = ({ selected, category, handleFilterChange }: { selected: string | null; category: CategoryType | undefined; handleFilterChange: (category: string) => void }) => {
    return category ? (
        <button className={selected === category.slug ? 'active' : ''} onClick={() => handleFilterChange(category.slug)}>
            {category.name}
        </button>
    ) : (
        <button className={selected === 'all' ? 'active' : ''} onClick={() => handleFilterChange('all')}>
            All
        </button>
    );
};

export default CategoryFilterButton