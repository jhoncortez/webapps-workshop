import User from '../db/users-schema.js'
import { UserContract } from '../types'
import type { Types } from 'mongoose'

// type CraatedUserResult = {
//     _id: string,
//     name: string,
//     email: string
// }

export default class UsersModel {
    async getAllUsers () {
        const users = await User.find()
        return users
    }
    async getUserById (id: Types.ObjectId) {
        const user = await User.findById(id)
        return user
    }
    async getUserByEmail (email: string) {
        const user = await User.findOne({ email })
        return user
    }
    async createUser (user: UserContract) {
        const result = await User.create(user)
        const resultClient = {
            _id: result._id,
            name: result.name,
            email: result.email,
            role: result.role
        }
        return resultClient 
    }
    async updateUser (id: Types.ObjectId, user: { name?: string; email?: string; role?: string }) {
        const result = await User.findByIdAndUpdate(id, user)
        return result
    }
    async deleteUser (id: Types.ObjectId) {
        const result = await User.findByIdAndDelete(id)
        return result
    }
    async updatePassword (id: Types.ObjectId, password: string) {
        const result = await User.findByIdAndUpdate(id, { password })
        return result
    }
    async getUserPreferences (id: Types.ObjectId) {
        const user = await User.findById(id, 'preferences')
        if (!user) {
            return null
        }
        return user.preferences
    }
    async updateUserPreferences (id: Types.ObjectId, preferences: UserContract['preferences']) {
        const user = await User.findByIdAndUpdate(id, { preferences }, { new: true })
        if (!user) {
            return null
        }
        return user.preferences
    }
    async deleteUserPreferences (id: Types.ObjectId) {
        const user = await User.findByIdAndUpdate(id, { preferences: {} }, { new: true })
        if (!user) {
            return null
        }
        return user.preferences
    }
}