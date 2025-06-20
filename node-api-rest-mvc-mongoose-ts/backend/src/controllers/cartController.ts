import CartsModel from '../models/cartsModel.js'
import { Request, Response } from 'express'
import type { RequestWithUser } from '../types'

class CartController {

    private readonly cartsModel: CartsModel
    constructor() {
        this.cartsModel = new CartsModel()
    }

    getCartByUserId = async (req: Request, res: Response): Promise<void> => {
        try {
            const authUser = (req as RequestWithUser | any).user
            const cart = await this.cartsModel.getCartByUserId(authUser.id)
            if (!cart.success) {
                res.status(404).json({ message: cart.error })
                return
            }
            res.status(200).json(cart)
            return
        } catch (error) {
            res.status(500).json({ message: error })
            return
        }
        
    }

    addProductToCart = async (req:  RequestWithUser | any , res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(400).json({ message: 'Unauthorized' })
                return
            }
            console.log('body from add to cart: ',req.body)
            const cart = await this.cartsModel.addProductToCart(req.user.id, req.body.product)
            if (!cart.success) {
                res.status(404).json({ message: cart.error })
                return
            }
            res.status(200).json(cart)
            return
        } catch (error) {
            res.status(500).json({ message: error })
            return
        }
    }

    updateProductInCart = async (req: RequestWithUser | any, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(400).json({ message: 'Unauthorized' })
                return
            }
            const cart = await this.cartsModel.updateProductQuantity(req.user.id, req.body.product)
            if (!cart.success) {
                res.status(404).json({ message: cart.error })
                return
            }
            res.status(200).json(cart)
            return
        } catch (error) {
            res.status(500).json({ message: error })
            return
        }
    }

    deleteProductFromCart = async (req: RequestWithUser | any, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(400).json({ message: 'Unauthorized' })
                return
            }
            const cart = await this.cartsModel.removeProductFromCart(req.user.id, req.body.product.productId)
            if (!cart.success) {
                res.status(404).json({ message: cart.error })
                return
            }
            res.status(200).json(cart)
            return
        } catch (error) {
            res.status(500).json({ message: error })
            return
        }
    }

    deleteCart = async (req: RequestWithUser | any, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(400).json({ message: 'Unauthorized' })
                return
            }
            const cart = await this.cartsModel.deleteCart(req.user.id)
            if (!cart.success) {
                res.status(404).json({ message: cart.error })
                return
            }
            res.status(200).json(cart)
            return
        } catch (error) {
            res.status(500).json({ message: error })
            return
        }
    }

}

export default CartController