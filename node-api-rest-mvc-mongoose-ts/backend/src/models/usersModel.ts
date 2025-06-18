import User from '../db/users-schema.js'
import type { UserContract, UserResponse } from '../types'
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
    async processResult (result: UserContract): Promise<UserResponse> {

        let error = null
        if (!result) {
            error = 'No user found'
            return { success: false, error, data: null }
        }  
        const resultClient = {
            _id: result._id,
            name: result.name,
            email: result.email,
            role: result.role,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
        return { success: true, error, data: resultClient }
    }
    async getUserById (id: Types.ObjectId): Promise<UserResponse> {
        const user = await User.findById(id)
        return this.processResult(user as UserContract) 
    }
    async getUserByEmail (email: string) {
        const user = await User.findOne({ email })
        return user
    }
    async createUser (user: UserContract) : Promise<UserResponse> {
        const result = await User.create(user)
        console.log('result from register', result)
        // const resultClient = {
        //     _id: result._id,
        //     name: result.name,
        //     email: result.email,
        //     role: result.role
        // }
        return this.processResult(result) 
    }
    async updateUser (id: Types.ObjectId, user: { name?: string; email?: string; role?: string }): Promise<UserResponse> {
        const result = await User.findByIdAndUpdate(id, user)
        return this.processResult(result as UserContract) 
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