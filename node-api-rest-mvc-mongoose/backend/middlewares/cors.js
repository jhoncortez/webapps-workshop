import cors from 'cors' // This code imports the CORS middleware for handling cross-origin requests.

const ACCEPTED_ORIGINS = ['http://127.0.0.1:5500', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005']
// This code defines a list of accepted origins for CORS requests.

// This code defines a middleware function for handling CORS (Cross-Origin Resource Sharing) in an Express application.
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    // This code sets the "Access-Control-Allow-Origin" header to allow cross-origin requests.
    // It checks if the origin is allowed and calls the callback function accordingly.
    if (origin === undefined || origin === null) {
      return callback(null, true)
    }
    // if (origin === 'http://localhost:3000') {
    //   return callback(null, true)
    // }
    // if (origin === 'http://localhost:3001') {
    //   return callback(null, true)
    // }
    // if (origin === 'http://localhost:3002') {
    //   return callback(null, true)
    // }
    // if (origin === 'http://localhost:3003') {
    //   return callback(null, true)
    // }
    // if (origin === 'http://localhost:3004') {
    //   return callback(null, true)
    // }
    // if (origin === 'http://localhost:3005') {
    //   return callback(null, true)
    // }

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
    // This code sets the "Access-Control-Allow-Origin" header to allow cross-origin requests.
    // It checks if the origin is allowed and calls the callback function accordingly.
  }
})
// This code enables CORS for all routes in the Express application.
