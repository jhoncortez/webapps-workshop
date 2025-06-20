import mongoose, { Types, ObjectId } from 'mongoose'

import { cartContract } from '../types'




const cartSchema = new mongoose.Schema<cartContract>({
        userId: { type: mongoose.Schema.Types.ObjectId, required: true},
        products: [{ 
            type: { 
                productId: mongoose.Schema.Types.ObjectId, 
                quantity: Number 
            }
        }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    })

  const Cart = mongoose.model<cartContract>('Cart', cartSchema)

  export default Cart