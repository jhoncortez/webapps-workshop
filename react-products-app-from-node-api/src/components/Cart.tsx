import { useState } from "react"
// import { useInitCart } from "../hooks/cartHooks.ts";
import { useAppSelector } from "../redux/hooks.ts"
import CartItem  from "./CartItem.tsx"
import type { CartProductType } from "../vite-env.d.ts"

import '../assets/css/cart.css'

const Cart = () => {
    // const {cart} = useInitCart()
    const cart: CartProductType[] = useAppSelector(state => state.cart.cart)
    const [showCart, setShowCart] = useState(false)

    return (
        <>
            {/* Show Cart Button */}
            <button className="show-cart-button" onClick={() => setShowCart(!showCart)}>
                🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>

            {/* Cart */}
            <div className={`cart ${showCart ? "cart-visible" : ""}`}>
                <h2>Cart</h2>
                {
                    cart.length === 0 ? <p>Cart is empty</p> : 
                    cart.map(item => <CartItem key={item._id} item={item}/>)}
            </div>
        </>
        
    )
}

export default Cart