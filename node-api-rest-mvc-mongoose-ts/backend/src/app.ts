import express, { Application, json } from 'express' // This code imports the express module and the json middleware for parsing JSON requests.
import productsRouter from './routes/products.js' // This code imports the products router from the routes module.
import authRouter from './routes/authRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import profileRouter  from './routes/profileRoutes.js' // This code imports the profile router from the profileRoutes module.
import { corsMiddleware } from './middlewares/cors.js' // This code imports the CORS middleware for handling cross-origin requests.
import authenticateMiddleware from './middlewares/auths.js' // This code imports the authentication middleware for handling user authentication.
import connectToDatabase from './config/db-connect-mongoose.js' // This code imports the connectToDatabase function from the mongoose module.
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv' // MongoDB connection URI
dotenv.config() // Load environment variables from .env file

const PORT = process.env.PORT ?? 3004
const app: Application = express()

app.disable('x-powered-by')
// This code disables the "X-Powered-By" header in the HTTP response.

// mongoose based conection to database
connectToDatabase()

// MIDDLEWARES
app.use(json()) // This code enables the Express application to parse incoming JSON requests.
app.use(corsMiddleware()) // This code enables CORS for all routes in the Express application.
app.use(cookieParser())
// middleware to parse cookies from incoming requests
app.use(authenticateMiddleware)

// middleware to handle routes
app.use('/api/products', productsRouter)

app.use('/api/auth', authRouter)

app.use('/api/profile', profileRouter)

app.use('/api/cart', cartRouter)
// This code mounts the products router on the "/api/products" path.

// export the routing object
export { app, PORT }
// This code creates an Express application and defines a route for the root URL ("/") that responds with "Hello, World!".
// It also exports the app and port as a module for use in other files.
