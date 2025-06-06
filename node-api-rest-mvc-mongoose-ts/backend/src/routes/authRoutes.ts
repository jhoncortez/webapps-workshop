import { Router } from 'express'
// import type { RequestWithUser } from '../types/index.js'
import AuthController from '../controllers/authController.js'
// import UsersModel from '../models/usersModel.js'
// import  from '../db/users-schema.js'

const authRouter: Router = Router()
const authController = new AuthController()

authRouter.post('/register', authController.registerUser)
authRouter.post('/login', authController.loginUser)
// authRouter.patch('/update-password', authController.updatePassword)
// authRouter.get('/me', authController.protectedRoute, (req: Request, res: Response) => {
//     res.status(200).json((req as RequestWithUser | any).user)
// })
authRouter.post('/logout', authController.logoutUser)

export default authRouter