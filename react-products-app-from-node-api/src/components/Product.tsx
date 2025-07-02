/**
 * Component to display individual product details.
 *
 * @param data - The product data object containing id, name, and price information.
 * @returns A JSX element that displays product name, price, and a button to remove the product.
 */
// import { useEffect, useState } from "react"
import { FaCartArrowDown } from "react-icons/fa6"
import type { ProductType,  } from "../vite-env.d.ts"
import ProductImageSlider from "./ProductImageSlider.tsx"
import ProductCategories from "./ProductCategores.tsx"
import { useInitCart } from "../hooks/cartHooks"
import { useState } from "react"
// import { useAppDispatch, useAppSelector } from "../redux/hooks.ts"

import Link from "./Link.tsx"

const Product = ({ data, onRemove }: { data: ProductType; onRemove: (id: string) => void }) => {
    const { dispatchAddToCart, dispatchRemoveFromCart, productInCart, productInCartQuantity } = useInitCart()


    const [quantity, setQuantity] = useState(productInCartQuantity(data._id) || 1) // set quantity to 1 if not in cart

    const handleAddToCart = dispatchAddToCart
    const handleRemoveFromCart = dispatchRemoveFromCart


    return (
        <div className="product-item">
            <ProductImageSlider images={ data.images }/>
            <h3><Link to={`/product/:id`} params={{ id: data._id }}>{ data.name }</Link></h3> 
            <span className="product-price">Price: { data.price }</span>
            <ProductCategories categories={ data.categories }/>
            {/* <button
            className="remove-product-button" 
            onClick={ () => onRemove(data._id) }>Remove product</button> */}

<div className="product-actions">
                <input
                    type="number"
                    className="product-quantity-input"
                    min="0"
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
                    onClick={() => handleAddToCart({ productId: data._id, quantity })} // addToCart}
                >
                    {productInCart(data._id) ? ( 
                        <>
                        Update quantity </> ) : 
                        (
                            <> 
                            Add to cart 
                        </>

                        )
                        }
                </button>
                {productInCart(data._id) && (
                    <button
                        className="remove-from-cart-button"
                        onClick={() => handleRemoveFromCart(data._id)}
                    >
                        <FaCartArrowDown />
                    </button>
                )}
            </div>

        </div>
    )
}

export default Product