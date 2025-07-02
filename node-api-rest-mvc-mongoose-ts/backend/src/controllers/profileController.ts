import { Request, Response } from 'express'
import UsersModel from '../models/usersModel.js'
import { RequestWithUser, UserContract, AuthenticatedUser } from '../types/index.js'
import { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

class ProfileController {
    private readonly usersModel: UsersModel
    constructor() {
        this.usersModel = new UsersModel()  
    }

    getMyProfile = async (req:  RequestWithUser | any , res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ message: 'Unauthorized' })
                return
            }

            const user = await this.usersModel.getUserById({ id: req.user.id });
            if (!user.success) {
                res.status(404).json({ message: user.error })
                return
            }
            res.status(200).json(user.data)
            return
        } catch (error) {
            res.status(500).json({ message: error })
            return
        }
        
    }
    
    updateProfile = async (req:  RequestWithUser | any , res: Response): Promise<void> => {
        try {
            // Validate the request body
            if (!req.body || typeof req.body !== 'object') {
                res.status(400).json({ message: 'Invalid request body' })
                return
            }

            const { name, email, role } = req.body as UserContract

            // if there is not changes in email or name then do not update
            if( email === req.user.email && name === req.user.name ) {
                res.status(200).json(req.user)
                return
            }

            // check if user already exists
            const userByEmail = await this.usersModel.getUserByEmail(email)

            // email already exists
            if (userByEmail.success && userByEmail.data?.email === email && userByEmail.data?._id.toString() !== req.user.id) {
                res.status(400).json({ message: 'Email already exists' })
                return
            }

            // validate data
            const user = await this.usersModel.updateUser(req.user.id , { name, email, role })

            if (!user.success) {
                res.status(400).json({ message: user.error })
                return
            }

            res.status(200).json(user.data)

            return
        } catch (error) {
            console.error('Error updating profile:', error)
            res.status(500).json({ message: 'Failed to update profile' })
            return
        }
    }

    updatePassword = async (req: Request, res: Response): Promise<void> => {
            try {
                // const token = req.cookies.token
                const { password, email } = req.body as UserContract

                const user = (req as RequestWithUser | any).user // get user from request, set query to protected route in authRoutes.ts
    
                // const data = await this.usersModel.getUserById(user.id as Types.ObjectId)
    
                if (user?.email !== email) {
                    res.status(404).json({ message: 'Unauthorized to make this request' })
                    return
                }
    
                // const userByEmail = await this.usersModel.getUserByEmail(email)
                // const id = userByEmail?._id as Types.ObjectId
    
                // hash password
                if (!password || password.length < 8) {
                    res.status(400).json({ message: 'Password must be at least 8 characters long' })
                    return
                }
                const hashedPassword = await bcrypt.hash(password, 12)
    
                // update password
                const result = await this.usersModel.updatePassword(user.id , hashedPassword)

                if (!result.success) {
                    res.status(404).json({ message: result.error })
                    return
                }
    
                res.status(200).json({ message: 'Password updated successfully' })
    
            } catch (error) {
                res.status(500).json({ message: 'Failed to update password', error })
            }
        }
    deleteProfile = async (req: RequestWithUser | any, res: Response): Promise<void> => {
        try {
            const userId = req.user._id
            const result = await this.usersModel.deleteUser(userId)

            if (!result) {
                res.status(404).json({ message: 'User not found' })
                return
            }

            res.status(200).json({ message: 'User deleted successfully' })
        } catch (error) {
            console.error('Error deleting profile:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getUserPreferences = async (req: RequestWithUser | any, res: Response): Promise<void> => {
        try {
            const userId = req.user._id 
            const preferences = await this.usersModel.getUserPreferences(userId)

            if (!preferences) {
                res.status(404).json({ message: 'Preferences not found' })
                return
            }

            res.status(200).json(preferences)
        } catch (error) {
            console.error('Error fetching user preferences:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    updateUserPreferences = async (req: RequestWithUser | any, res: Response): Promise<void> => {
        try {
            const userId = req.user._id
            const preferences = req.body as UserContract['preferences']

            if (!preferences || typeof preferences !== 'object') {
                res.status(400).json({ message: 'Invalid preferences data' })
                return
            }

            const updatedPreferences = await this.usersModel.updateUserPreferences(userId, preferences)

            if (!updatedPreferences) {
                res.status(404).json({ message: 'Preferences not found' })
                return
            }

            res.status(200).json(updatedPreferences)
        } catch (error) {
            console.error('Error updating user preferences:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    deleteUserPreferences = async (req: RequestWithUser | any, res: Response): Promise<void> => {
        try {
            const userId = req.user._id 
            const preferences = await this.usersModel.deleteUserPreferences(userId)

            if (!preferences) {
                res.status(404).json({ message: 'Preferences not found' })
                return
            }

            res.status(200).json(preferences)
        } catch (error) {
            console.error('Error deleting user preferences:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getProfileById = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.params.id as string
            const user = await this.usersModel.getUserById({ id: userId })

            if (!user) {
                res.status(404).json({ message: 'User not found' })
                return
            }

            res.status(200).json(user)
        } catch (error) {
            console.error('Error fetching user profile:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }

}

export default ProfileController