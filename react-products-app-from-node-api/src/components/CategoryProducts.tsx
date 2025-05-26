import { useEffect, useState } from "react";
import type { ProductType } from "../vite-env";

const CategoryProducts = ({ category }: { category?: string }) => {
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`/api/categories/${category}/products`);
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, [category]);

    if (products.length === 0) return <p>No products found in this category.</p>;

    return (
        <div>
            <h1>Category: {category}</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryProducts;