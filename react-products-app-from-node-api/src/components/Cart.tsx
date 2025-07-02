import { useState } from "react"
// import { useInitCart } from "../hooks/cartHooks.ts";
// import { useAppSelector } from "../redux/hooks.ts"
import CartItem  from "./CartItem.tsx"
// import type { CartQueryResponse } from "../vite-env.d.ts"
import { useInitCart } from "../hooks/cartHooks"

import '../assets/css/cart.css'

const Cart = () => {
    const {cart, isError, isLoading, isSuccess} = useInitCart()

    const products = cart?.products

    console.log('cart: ', cart)
    // const cart: CartProductType[] = useAppSelector(state => state.cart.cart)
    const [showCart, setShowCart] = useState(false)

    return (
        <>
            {/* Show Cart Button */}
            <button className="show-cart-button" onClick={() => setShowCart(!showCart)}>
                🛒 {products && products.length > 0 && <span className="cart-count">{products.length}</span>}
            </button>

            {/* Cart */}
            <div className={`cart ${showCart ? "cart-visible" : ""}`}>
                <h2>Cart</h2>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error</p>}
                
                {isSuccess && (

                    
                    products?.length === 0 ? <p>Cart is empty</p> : 
                    products?.map(item => <CartItem key={item._id} item={item}/>)

                )}
            </div>
        </>
        
    )
}

export default Cart