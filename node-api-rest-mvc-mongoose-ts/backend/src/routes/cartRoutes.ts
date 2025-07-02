import { Router } from 'express'
import CartController from "../controllers/cartController.js";
import AuthController from '../controllers/authController.js';

const cartRouter: Router = Router()

const cartController = new CartController()
const authController = new AuthController()

cartRouter.get('/', cartController.createGuestCart, cartController.getCartByUserId)
cartRouter.post('/addProduct/:id', cartController.createGuestCart, cartController.addProductToCart)
cartRouter.patch('/updateProduct/:id', cartController.createGuestCart, cartController.updateProductInCart)
cartRouter.patch('/deleteProduct/:id', cartController.createGuestCart, cartController.deleteProductFromCart)
cartRouter.delete('/deleteCart',  cartController.createGuestCart, cartController.deleteCart)


export default cartRouter