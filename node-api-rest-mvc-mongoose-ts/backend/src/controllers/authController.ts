import { Request, Response, NextFunction } from 'express'
import type { RequestWithUser } from '../types/index.js'
import UsersModel from '../models/usersModel.js'
import { UserContract } from '../types'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'
import dotenv from 'dotenv' // MongoDB connection URI
dotenv.config() // Load environment variables from .env file


class AuthController {
    private JWT_SECRET: string
    private JWT_EXPIRES_IN: number
    private ENVIRONMENT: string
    private readonly usersModel: UsersModel
    // private model: UsersModel = new UsersModel()
    constructor() {
        
        console.log('AuthController initialized')
        this.usersModel = new UsersModel()
        console.log(this.usersModel)
        this.JWT_SECRET = process.env.JWT_SECRET || 'secret' // Default secret key, should be replaced with a secure key in production
        this.JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRATION || '604800', 10) || 604800 // 7 days
        this.ENVIRONMENT = process.env.NODE_ENV || 'development'
    }

    // Helper to generate token
    private signToken = ({id, email, role}: { id: Types.ObjectId, email: string, role: string }) => {
        return jwt.sign({ id, email ,role }, this.JWT_SECRET, {
        expiresIn: this.JWT_EXPIRES_IN,
        })
    }

    /**
     * Register a new user in the database.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {void}
     * @throws {Error} - If the user already exists, or if there is an error creating the user.
     */
    registerUser = async (req: Request, res: Response): Promise<void>  => {
        // const usersModel = new UsersModel()
        // console.log(this.model)
        if (!this.usersModel) {
            throw new Error('Model is not initialized')
        }

        try {
            // get body
            const { name, email, password, role } = req.body as UserContract

            //1 check if user already exists
            const user = await this.usersModel.getUserByEmail(email)

            if (user) {
                res.status(400).json({ message: 'User already exists' })
                return
            }
            console.log(user)

            // 2 create user
            const result = await this.usersModel.createUser({ name,  email, password, role } as UserContract)

            // check if user was created
            if (result) {

                // 3 generate token
                const token = this.signToken({ id: result._id , email: result.email, role: result.role}  as { id: Types.ObjectId, email: string, role: string })
                
                // 4 set cookie
                res.cookie('token', token, { httpOnly: true, secure: this.ENVIRONMENT === 'production', sameSite: 'strict', maxAge: this.JWT_EXPIRES_IN })
                
                // 5 send response
                res.status(201).json({ user: result })

            }
            return 
        } catch (error) {
            res.status(500).json({ message: 'Failed to create user', error })
            return
        }
    }

    /**
     * Authenticates an existing user and generates a JWT token.
     * @param {UserContract} user - The user details to login.
     * @returns {Object} An object containing the authenticated user and a JWT token, or the result in case of failure.
     */
    loginUser = async (req: Request, res: Response): Promise<void>  => {
        // const usersModel = new UsersModel()
        const { email, password } = req.body as UserContract
        // console.log(req.body)
        try {

            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required' })
                return
            }

            // check if use exists
            const user = await this.usersModel.getUserByEmail(email)
            if (!user) {
                res.status(401).json({ message: 'User not found' })
                return
            }

            console.log(user)
            // check password
            if (! await bcrypt.compare(password, user.password)) {
                res.status(401).json({ message: 'Invalid password' })
                return
            }

            // check if user exists
            if (user) {
                // generate token
                const token = this.signToken({ id: user._id, email: user.email, role: user.role } as { id: Types.ObjectId, email: string, role: string })
                // return { user: result, token }
                // set cookie
                res.cookie('token', token, { httpOnly: true, secure: this.ENVIRONMENT === 'production', sameSite: 'none', maxAge: this.JWT_EXPIRES_IN })
                
                // return user
                res.status(200).json({ user: { id: user._id, email: user.email, role: user.role, preferences: user.preferences } })
                return
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to login user', error })
            return
        }
    }

    /**
     * A middleware that verifies a JWT token and assigns the user to the request.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {void}
     */
    protectedRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const { user } = (req as RequestWithUser | any).session

            console.log('user from session:', user)

            if (!user) {
                res.status(401).json({ message: 'Unauthorized' })
                return
            }

            // get user
            const data = await this.usersModel.getUserById(user.id as Types.ObjectId)

            // check if user exists
            if (!data || data.email !== user.email) {
                // if user does not exist, return unauthorized
                console.log('User not found or email mismatch')
                console.log(data)
                console.log(user.email)
                res.status(401).json({ message: 'User not found or email mismatch' })
                return
            }

            // try to assign user to request to use in next middleware
            (req as RequestWithUser | any).user = data
            next()
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized', error: error })
            return
        }
    }

    async logoutUser(req: Request, res: Response): Promise<void> {
        res.clearCookie('token')
        res.status(200).json({ message: 'Logout successful' })
        return
    }
}

export default AuthController