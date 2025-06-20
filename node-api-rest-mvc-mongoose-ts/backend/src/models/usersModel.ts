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
    // async processResult (result: UserContract): Promise<UserResponse> {

    //     try {
    //         if (!result) {
    //             return { success: false, error: 'No user found', data: null }
    //         }
    //     } catch (error) {
    //         return { success: false, error: 'Error finding user', data: null }
    //     }

    //     // let error = null
    //     // if (!result) {
    //     //     error = 'No user found'
    //     //     return { success: false, error, data: null }
    //     // }  
    //     const resultClient = {
    //         _id: result._id,
    //         name: result.name,
    //         email: result.email,
    //         role: result.role,
    //         createdAt: result.createdAt,
    //         updatedAt: result.updatedAt
    //     }

    //     return { success: true, error: null, data: resultClient }
    // }
    async getUserById ({ id }: { id: string }) : Promise<UserResponse> {
        try {
            if (!id) {
                return { success: false, error: 'User ID is required', data: null }
            }

            const user = await User.findById(id)
            if (!user) {
                return { success: false, error: 'User not found', data: null }
            }
            const resultClient = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
            return { success: true, error: null, data: resultClient }

        } catch (error) {
            return { success: false, error: 'Error finding user', data: null }
        }
        
        // return this.processResult(user as UserContract) 
    }
    async getUserByEmail (email: string) {
        try {

            if (!email) {
                return { success: false, error: 'User email is required', data: null }
            }

            const user = await User.findOne({ email })

            if (!user) {
                return { success: false, error: 'User not found', data: null }
            }

            return { success: true, error: null, data: user }

        } catch (error) {
            return { success: false, error: 'Error finding user', data: null }
        }
        
    }
    async createUser (user: UserContract) : Promise<UserResponse> {
        try {
            if (!user) {
                return { success: false, error: 'Not user to create', data: null }
            }

            const result = await User.create(user)
            if (!result) {
                return { success: false, error: 'The user could not be created', data: null }
            }
            const resultClient = {
                _id: result._id,
                name: result.name,
                email: result.email,
                role: result.role,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            }
            return { success: true, error: null, data: resultClient }
            
        } catch (error) {
            return { success: false, error: 'Error creating user', data: null }
        }
        
    }
    async updateUser (id: string, user: { name?: string; email?: string; role?: string }): Promise<UserResponse> {
        try {
            if (!id) {
                return { success: false, error: 'User ID is required', data: null }
            }
            console.log('id for update', id, user)
            const result = await User.findByIdAndUpdate(id, user)
                
            if (!result) {
                return { success: false, error: 'User not found', data: null }
            }
            const resultClient = {
                _id: result._id,
                name: result.name,
                email: result.email,
                role: result.role,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            }
            return { success: true, error: null, data: resultClient }
        }
        catch (error) {
            console.log(error)
            return { success: false, error: 'Error updating user', data: null }
        }
    }
    async deleteUser (id: string) {
        try {
            if (!id) {
                return { success: false, error: 'User ID is required', data: null }
            }
            const result = await User.findByIdAndDelete(id)
            if (!result) {
                return { success: false, error: 'User not found', data: null }
            }
            return { success: true, error: null, data: result }
            
        } catch (error) {
            return { success: false, error: 'Error deleting user', data: null }
        }
        
    }
    async updatePassword (id: string, password: string) {
        try {
            if (!id) {
                return { success: false, error: 'User ID is required', data: null }
            }
            if (!password) {
                return { success: false, error: 'Password is required', data: null }
            }
            
            const result = await User.findByIdAndUpdate(id, { password })

            if (!result) {
                return { success: false, error: 'User not found', data: null }
            }
            const resultClient = {
                _id: result._id,
                name: result.name,
                email: result.email,
                role: result.role,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            }
            return { success: true, error: null, data: resultClient }

        } catch (error) {
            return { success: false, error: 'Error updating password', data: null }
        }
    }
    async getUserPreferences (id: string) {
        try {
            if (!id) {
                return { success: false, error: 'User ID is required', data: null }
            }

            const user = await User.findById(id, 'preferences')
            if (!user) {
                return { success: false, error: 'User not found', data: null }
            }

            return { success: true, error: null, data: user.preferences }


        } catch (error) {
            return null
        }
        
    }
    async updateUserPreferences (id: string, preferences: UserContract['preferences']) {
        const user = await User.findByIdAndUpdate(id, { preferences }, { new: true })
        if (!user) {
            return null
        }
        return user.preferences
    }
    async deleteUserPreferences (id: string) {
        const user = await User.findByIdAndUpdate(id, { preferences: {} }, { new: true })
        if (!user) {
            return null
        }
        return user.preferences
    }
}