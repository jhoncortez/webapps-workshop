import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { UserContract } from '../types'



const userSchema = new mongoose.Schema<UserContract>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true , match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    password: { type: String, required: true, match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/ },
    role: { type: String, default: 'customer', enum: ['customer', 'super admin', 'admin', 'manager', 'seller'] },
    preferences: {
        favoriteCategories: {
            type: [String],
            default: []
    },
        priceRange: {
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: Infinity
            }
    }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  })
  
  // Hash password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        console.log('Hashing password...')
        // Hash the password before saving it to the database
        this.updatedAt = new Date()
        this.createdAt = this.createdAt || new Date()
        // Use bcrypt to hash the password
        if (this.password && this.password.length > 0) {
            console.log('Password before hashing:', this.password)
            // Hash the password with a salt rounds of 12
            console.log('Hashing password...')
            console.log('Password before hashing:', this.password)
            console.log('Hashing password...')
            console.log('Password before hashing:', this.password)
            this.password = await bcrypt.hash(this.password, 12)
            console.log('Password after hashing:', this.password)
        } else {
            console.log('No password provided')
        }
    } else {
        console.log('Password not modified, skipping hashing')
    }
    next()
})

  const User = mongoose.model<UserContract>('User', userSchema)

  export default User