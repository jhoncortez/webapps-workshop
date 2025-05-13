import { Router } from 'express'

import { loginUser, createUser, getUser, logoutUser, protectedAuth } from '../controllers/auth.js'

const authEndpoint = Router()

// Create a Home route for user
authEndpoint.get('/', getUser)

// Create a login route for user authentication
authEndpoint.post('/login', loginUser)

// Create a register route for user authentication
authEndpoint.post('/register', createUser)

// Create a register route for user authentication
authEndpoint.post('/logout', logoutUser)

// Create a register route for user authentication
authEndpoint.get('/protected', protectedAuth)

export default authEndpoint
