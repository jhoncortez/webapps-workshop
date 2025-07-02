import type {  CartItemResponse } from "../vite-env.d.ts"
import { useInitCart } from "../hooks/cartHooks"
import { useInitSingleProduct } from "../hooks/productsHooks"
// import { useInitCart } from "../hooks/cartHooks"
// import { useAppDispatch } from "../redux/hooks.ts"
// import {  removeFromCart, addToCart } from "../redux/features/cart/cartSlice.ts"

const CartItem = ({item}: {item: CartItemResponse}) => {

    const { data } =  useInitSingleProduct({ id: item.productId })

    const {dispatchUpdateProductInCart, dispatchRemoveFromCart, } = useInitCart()

    // const [quantity, setQuantity] = useState(1)
    // const {removeFromCart, addToCart} = useInitCart()
    // const dispatch = useAppDispatch()


    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10)
        if (value >= 1) {
            dispatchUpdateProductInCart({
                productId: item.productId,
                quantity: value
            })
        }
    }
    return (
        <div className="cart-item">
            <div className="cart-item-details">
                { // get the first image in the item images array */
                data.images && data.images.length > 0 && (
                    data.images[0] && (
                        <img src={data.images[0].src} alt={data.images[0].alt} />
                    )
                )}
                <h3 className="cart-item-name">{data.name}</h3>
                {/* <p>Quantity: {item.quantity}</p> */}
                <p className="">Price: {data.price}</p>
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
                    onClick={() => dispatchRemoveFromCart(item.productId)}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartItem