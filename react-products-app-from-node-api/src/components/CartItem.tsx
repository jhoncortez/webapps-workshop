import type {  CartProductType } from "../vite-env.d.ts"
// import { useInitCart } from "../hooks/cartHooks"
import { useAppDispatch } from "../redux/hooks.ts"
import {  removeFromCart, addToCart } from "../redux/features/cart/cartSlice.ts"

const CartItem = ({item}: {item: CartProductType}) => {
    // const {removeFromCart, addToCart} = useInitCart()
    const dispatch = useAppDispatch()


    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10)
        if (value >= 1) {
            // addToCart(item, value)
            dispatch(addToCart({...item, quantity: value}))
        }
    }
    return (
        <div className="cart-item">
            <div className="cart-item-details">
                { // get the first image in the item images array */
                item.images && item.images.length > 0 && (
                    item.images[0] && (
                        <img src={item.images[0].src} alt={item.images[0].alt} />
                    )
                )}
                <h3 className="cart-item-name">{item.name}</h3>
                {/* <p>Quantity: {item.quantity}</p> */}
                <p className="">Price: {item.price}</p>
            </div>
            
            <div className="cart-item-actions">
                <input
                    type="number"
                    className="cart-item-quantity"
                    value={item.quantity}
                    min="1"
                    onChange={handleQuantityChange}
                />
                <button
                    className="cart-item-remove"
                    onClick={() => dispatch(removeFromCart(item._id))}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartItem