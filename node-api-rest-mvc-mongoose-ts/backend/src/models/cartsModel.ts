import Cart from '../db/cart-schema.js'
import { cartContract, cartProduct } from '../types'
import { Types } from 'mongoose'

interface cartResponse {
    success: boolean
    data?: cartContract | null
    error?: string
}

export default class CartsModel {
    async getCartByUserId(userId: string): Promise<cartResponse> {
        try {
            if (!userId) {
                return { success: false, error: 'User ID is required' }
            }
            return { success: true, data: await Cart.findOne({ userId }) }
        }
        catch (error) {
            return { success: false, error: 'Error finding cart' }
        }
    }

    async createCart(userId: string, products: cartProduct[]): Promise<cartResponse> {
        try {
            if (!userId) {
                return { success: false, error: 'User ID is required' }
            }
            if (!products) {
                return { success: false, error: 'Products are required' }
            }
            return { success: true, data: await Cart.create({ userId, products }) }
        }
        catch (error) {
            console.log(error)
            return { success: false, error: 'Error creating cart' }
        }
    }

async addProductToCart(userId: string, product: cartProduct): Promise<cartResponse> {
    try {
        const { productId, quantity } = product

        if (!userId) {
            return { success: false, error: 'User ID is required' }
        }
        if (!productId) {
            return { success: false, error: 'Product ID is required' }
        }
        if (!quantity) {
            return { success: false, error: 'Quantity is required' }
        }

        // Try to update the quantity if the product exists
        let cart = await Cart.findOneAndUpdate(
            { userId, 'products.productId': productId }, // Find cart by user ID and product ID
            { $set: { 'products.$.quantity': quantity } }, // Update the quantity
            { new: true } // Return the updated document
        );

        // If not found, add the product to the cart (or create cart if needed)
        if (!cart) {
            cart = await Cart.findOneAndUpdate(
                { userId }, // Find cart by user ID
                { $addToSet: { products: { productId, quantity } } }, // Add the product
                { upsert: true, new: true } // Create cart if not found
            );
        }

        return { success: true, data: cart }
    } catch (error) {
        return { success: false, error: 'Error adding product to cart' }
    }
}

    async updateProductQuantity(userId: string, product : cartProduct): Promise<cartResponse> {
        try {

            const { productId, quantity } = product

            if (!userId) {
                return { success: false, error: 'User ID is required' }
            }

            if (!productId) {
                return { success: false, error: 'Product ID is required' }
            }

            if (!quantity) {
                return { success: false, error: 'Quantity is required' }
            }

            return { success: true, data: await Cart.findOneAndUpdate({ userId, 'products.productId': productId }, { $set: { 'products.$.quantity': quantity } }, { new: true }) }

        } catch (error) {
            return { success: false, error: 'Error updating product quantity' }
        }
    }

    async removeProductFromCart(userId: string, productId: string): Promise<cartResponse> {
        try {

            console.log('Removing product from cart:', userId, productId);

            if (!userId) {
                return { success: false, error: 'User ID is required' }
            }

            if (!productId) {
                return { success: false, error: 'Product ID is required' }
            }
            const cart = await Cart.findOneAndUpdate(
                { userId }, 
                { $pull: { products: { productId: new Types.ObjectId(productId) } } }, 
                { new: true }) 
            console.log('cart after removing product', cart);

            return { success: true, data: cart}
        } catch (error) {
            return { success: false, error: 'Error removing product from cart' }
        }
    }

    async deleteCart(userId: string): Promise<cartResponse> {
        try {
            if (!userId) {
                return { success: false, error: 'User ID is required' }
            }
            return { success: true, data: await Cart.findOneAndDelete({ userId }) }
        } catch (error) {
            return { success: false, error: 'Error deleting cart' }
        }
    }

    async mergeCarts(guestId: string, userId: string) {

        try {
            if (!guestId) {
                return { success: false, error: 'Guest ID is required' }
            }
            if (!userId) {
                return { success: false, error: 'User ID is required' }
            }

            // Pseudocode: adjust for your schema
            const guestCart = await Cart.findOne({ userId: guestId })
            const userCart = await Cart.findOne({ userId: userId })

            if (!guestCart) return { success: true, data: userCart } // nothing to merge

            if (!userCart) {
                guestCart.userId = userId
                await guestCart.save()
                return { success: true, data: guestCart }
            }

            // Merge products (add quantities or append new)
            for (const guestProduct of guestCart.products) {
                const userProduct = userCart.products.find(p => 
                    p.productId.toString() === guestProduct.productId.toString()
                )
                if (userProduct) {
                    userProduct.quantity += guestProduct.quantity
                } else {
                    userCart.products.push(guestProduct)
                }
            }
            await userCart.save()
            return { success: true, data: userCart }

        } catch (error) {
            return { success: false, error: 'Error merging carts' }
        }
        
    }

}