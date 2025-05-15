/**
 * Component to display individual product details.
 *
 * @param data - The product data object containing id, name, and price information.
 * @returns A JSX element that displays product name, price, and a button to remove the product.
 */

import type { ProductType,  } from "../vite-env.d.ts"
import ProductImageSlider from "./ProductImageSlider.tsx"
import ProductCategories from "./ProductCategores.tsx";

const Product = ({ data, onRemove }: { data: ProductType; onRemove: (id: string) => void }) => {
    return (
        <div className="product-item">
            <ProductImageSlider images={ data.images }/>
            <h3>{ data.name }</h3> 
            Price: { data.price }
            <ProductCategories categories={ data.categories }/>
            <button onClick={ () => onRemove(data.id) }>Remove product</button>

        </div>
    )
}

export default Product