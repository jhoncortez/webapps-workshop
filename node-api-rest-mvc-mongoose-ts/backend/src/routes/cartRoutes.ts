import { Router } from 'express'
import CartController from "../controllers/cartController.js";
import AuthController from '../controllers/authController.js';

const cartRouter: Router = Router()

const cartController = new CartController()
const authController = new AuthController()

cartRouter.get('/', authController.protectedRoute ,cartController.getCartByUserId)
cartRouter.post('/addProduct', authController.protectedRoute, cartController.addProductToCart)
cartRouter.patch('/updateProduct', authController.protectedRoute, cartController.updateProductInCart)
cartRouter.patch('/deleteProduct', authController.protectedRoute, cartController.deleteProductFromCart)
cartRouter.delete('/deleteCart', authController.protectedRoute, cartController.deleteCart)


export default cartRouter