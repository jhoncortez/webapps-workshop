import express, { Application, json } from 'express' // This code imports the express module and the json middleware for parsing JSON requests.
import productsRouter from './routes/products.js' // This code imports the products router from the routes module.
import { corsMiddleware } from './middlewares/cors.js' // This code imports the CORS middleware for handling cross-origin requests.
import connectToDatabase from './config/db-connect-mongoose.js' // This code imports the connectToDatabase function from the mongoose module.

const PORT = process.env.PORT ?? 3002

const app: Application = express()
app.disable('x-powered-by')
// This code disables the "X-Powered-By" header in the HTTP response.

// mongoose based conection to database
connectToDatabase()

// MIDDLEWARES
app.use(json()) // This code enables the Express application to parse incoming JSON requests.
app.use(corsMiddleware()) // This code enables CORS for all routes in the Express application.

// middleware to handle routes
app.use('/api/products', productsRouter)
// This code mounts the products router on the "/api/products" path.

// export the routing object
export { app, PORT }
// This code creates an Express application and defines a route for the root URL ("/") that responds with "Hello, World!".
// It also exports the app and port as a module for use in other files.
