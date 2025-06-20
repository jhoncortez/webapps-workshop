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

            if (!userId) {
                return { success: false, error: 'User ID is required' }
            }

            if (!productId) {
                return { success: false, error: 'Product ID is required' }
            }

            return { success: true, data: await Cart.findOneAndUpdate({ userId }, { $pull: { products: { productId } } }, { new: true }) }
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

}