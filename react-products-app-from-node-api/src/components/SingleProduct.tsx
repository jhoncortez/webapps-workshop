/**
 * Component to display individual product details.
 *
 * @param data - The product data object containing id, name, and price information.
 * @returns A JSX element that displays product name, price, and a button to remove the product.
 */
// import { useEffect, useState } from "react"
import { FaCartArrowDown } from "react-icons/fa6"
// import type { ProductType } from "../vite-env.d.ts"
import ProductImageSlider from "./ProductImageSlider.tsx"
import ProductCategories from "./ProductCategores.tsx"
import Link from "./Link.tsx"
import { useInitSingleProduct } from "../hooks/productsHooks"
import { useInitCart } from "../hooks/cartHooks.ts"
import { useState } from "react"

const SingleProduct = ({ id }: { id?: string; }) => {
    
    // // console.log('targetRoute', id)
    
    const { data } =  useInitSingleProduct({ id: id as string})
    const { productInCart, productInCartQuantity, dispatchAddToCart, dispatchRemoveFromCart } = useInitCart()

    const isInCart = productInCart(data._id)
    const quantity = productInCartQuantity(data._id) || 1 // set quantity to 1 if not in cart
    console.log('quantity', quantity, ' product id ', data._id)

    const [localQuantity, setLocalQuantity] = useState(quantity);

    // const cart = useAppSelector((state) => state.cart.cart)
    // const dispatch = useAppDispatch()

    const handlerAddToCart = dispatchAddToCart
    const handleRemoveFromCart = dispatchRemoveFromCart

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 1) {
            setLocalQuantity(value);
        }
    }

    return (
        <div className="product-item">
            <ProductImageSlider images={ data.images }/>
            <h3><Link to={`/product/:id`} params={{ id: data._id }}>{ data.name }</Link></h3> 
            <span className="product-price">Price: { data.price }</span>
            <ProductCategories categories={ data.categories }/>

<div className="product-actions">
                <input
                    type="number"
                    className="product-quantity-input"
                    min="1"
                    value={localQuantity}
                    onChange={handleQuantityChange}
                />
                <button
                    className="add-to-cart-button"
                    onClick={() => handlerAddToCart({ productId: data._id, quantity: localQuantity })}
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
                        onClick={() => handleRemoveFromCart(data._id)}
                    >
                        <FaCartArrowDown />
                    </button>
                )}
            </div>

        </div>
    )
}

export default SingleProduct