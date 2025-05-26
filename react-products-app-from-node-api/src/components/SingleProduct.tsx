import { useEffect, useState } from "react";
import type { ProductType } from "../vite-env";

const SingleProduct = ({ id }: { id?: string }) => {
    const [product, setProduct] = useState<ProductType | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
        };

        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Price: {product.price}</p>
        </div>
    );
};

export default SingleProduct;