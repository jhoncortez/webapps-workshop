/**
 * Component to display individual product details.
 *
 * @param data - The product data object containing id, name, and price information.
 * @returns A JSX element that displays product name, price, and a button to remove the product.
 */
import { useEffect, useState } from "react"
import { FaCartArrowDown } from "react-icons/fa6"
import type { ProductType,  } from "../vite-env.d.ts"
import ProductImageSlider from "./ProductImageSlider.tsx"
import ProductCategories from "./ProductCategores.tsx"
import { useInitCart } from "../hooks/cartHooks.ts"
import Link from "./Link.tsx"

const Product = ({ data, onRemove }: { data: ProductType; onRemove: (id: string) => void }) => {
    const { cart, removeFromCart, addToCart, productInCartQuantity } = useInitCart()
    const [quantity, setQuantity] = useState(1)


    const isInCart = cart.some((item) => item._id === data._id)

    useEffect(() => {
        
        if (isInCart) {
            setQuantity(productInCartQuantity(data._id))
        }
    },[cart, data])

    return (
        <div className="product-item">
            <ProductImageSlider images={ data.images }/>
            <h3><Link to={`/product/:id`} params={{ id: data._id }}>{ data.name }</Link></h3> 
            Price: { data.price }
            <ProductCategories categories={ data.categories }/>
            <button
            className="remove-product-button" 
            onClick={ () => onRemove(data._id) }>Remove product</button>

<div className="product-actions">
                <input
                    type="number"
                    className="product-quantity-input"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (value >= 1) {
                            setQuantity(value);
                        }
                    }}
                />
                <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(data, quantity)}
                >
                    {isInCart ? ( 
                        <>
                        Update quantity </> ) : 
                        (
                            <> 
                            Add to cart 
                        </>

                        )
                        }
                </button>
                {isInCart && (
                    <button
                        className="remove-from-cart-button"
                        onClick={() => removeFromCart(data._id)}
                    >
                        <FaCartArrowDown />
                    </button>
                )}
            </div>

        </div>
    )
}

export default Product