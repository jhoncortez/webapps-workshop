import CartsModel from '../models/cartsModel.js'
import { Request, Response } from 'express'
import type { RequestWithUser } from '../types'
import type { NextFunction } from 'express'
import { request } from 'node:https'

class CartController {

    private readonly cartsModel: CartsModel
    constructor() {
        this.cartsModel = new CartsModel()
    }

    // Helper to get cart owner id (user or guest)
    private getCartOwnerId(req: RequestWithUser | any): { id: string, isGuest: boolean } {
        console.log('cart owner id req.session.user: ', req.session.user)
        if (req.session.user && req.session.user.id) {
            return { id: req.session.user.id, isGuest: false }
        }
        console.log('cart owner id req.cookies?.guestId: ', req.cookies?.guestId)
        if (req.cookies?.guestId) {
            return { id: req.cookies.guestId, isGuest: true }
        }
        throw new Error('No user or guest id found')
    }

    getCartByUserId = async (req: Request, res: Response): Promise<void> => {
        try {
            
            const { id: userId } = this.getCartOwnerId(req)
            console.log('getting cart by user id  user: ', userId)
            // const authUser = (req as RequestWithUser | any).user
            const cart = await this.cartsModel.getCartByUserId(userId)
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
            const { id: userId } = this.getCartOwnerId(req)
            // if (!req.user) {
            //     res.status(400).json({ message: 'Unauthorized' })
            //     return
            // }
            const { id: productId } = req.params

            console.log('body from add to cart: ',req.body)

            const cart = await this.cartsModel.addProductToCart(userId, { productId, quantity: req.body.product.quantity })
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
            const { id: userId } = this.getCartOwnerId(req)
            // if (!req.user) {
            //     res.status(400).json({ message: 'Unauthorized' })
            //     return
            // }
            const { id: productId } = req.params
            const cart = await this.cartsModel.updateProductQuantity(userId, { productId, quantity: req.body.product.quantity })
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
            const { id: userId } = this.getCartOwnerId(req)
            // if (!req.user) {
            //     res.status(400).json({ message: 'Unauthorized' })
            //     return
            // }

            const { id: productId } = req.params
            const cart = await this.cartsModel.removeProductFromCart(userId, productId)
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
            const { id: userId } = this.getCartOwnerId(req)
            // if (!req.user) {
            //     res.status(400).json({ message: 'Unauthorized' })
            //     return
            // }
            const cart = await this.cartsModel.deleteCart(userId)
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

    // Merge guest cart into user cart when user logs in or signs up
    mergeGuestCart = async (req: Request | any, res: Response): Promise<void> => {
        if (!req.user || !req.user.id) return
        const guestId = req.cookies?.guestId
        if (!guestId) return
        const mergeResult = await this.cartsModel.mergeCarts(guestId, req.user.id)
        if (mergeResult.success) {
            await this.cartsModel.deleteCart(guestId)
            res.clearCookie?.('guestId')
        }
    }

    createGuestCart = async (req: Request | any, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id: ownerId, isGuest } = this.getCartOwnerId(req)
            
            if (!isGuest) {
                next()
                return
            }

            const guestId = ownerId
            if ((await this.cartsModel.getCartByUserId(guestId)).success) {
                next()
                return
            }
            const cart = await this.cartsModel.createCart(guestId, [])
            if (!cart.success) {
                res.status(404).json({ message: cart.error })
                return
            }
            next()
            return
        } catch (error) {
            res.status(500).json({ message: error })
            return
        }
    }

}

export default CartController