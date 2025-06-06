import {Router} from 'express'
import ProfileController from '../controllers/profileController.js'
import AuthController from '../controllers/authController.js'

const profileRouter: Router = Router()
const profileController = new ProfileController()
const authController = new AuthController()

profileRouter.get('/profile/:id', profileController.getProfileById) // public route to get a profile by ID
profileRouter.get('/me', authController.protectedRoute, profileController.getMyProfile) // protected route to get the current user's profile
profileRouter.patch('/update-profile', authController.protectedRoute, profileController.updateProfile) // protected route to update the current user's profile
profileRouter.patch('/update-password', authController.protectedRoute, profileController.updatePassword) // protected route to update the current user's password
profileRouter.patch('/update-preferences', authController.protectedRoute, profileController.updateUserPreferences) // protected route to update the current user's preferences
profileRouter.patch('/delete-preferences', authController.protectedRoute, profileController.deleteUserPreferences) // protected route to delete the current user's preferences
profileRouter.delete('/delete-profile', authController.protectedRoute, profileController.deleteProfile) // protected route to delete the current user's profile

export default profileRouter