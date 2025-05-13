import cors from 'cors' // This code imports the CORS middleware for handling cross-origin requests.

const ACCEPTED_ORIGINS: string[] = ['http://127.0.0.1:5500', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005']
// This code defines a list of accepted origins for CORS requests.

// This code defines a middleware function for handling CORS (Cross-Origin Resource Sharing) in an Express application.
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    // This code sets the "Access-Control-Allow-Origin" header to allow cross-origin requests.
    // It checks if the origin is allowed and calls the callback function accordingly.
    if (origin === undefined || origin === null) {
      return callback(null, true) // when the request comes from the same server it will allow the request
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

    if (acceptedOrigins.includes(origin)) { // if the origin is in the list of accepted origins
      return callback(null, true) // allow the request
    }
    return callback(new Error('Not allowed by CORS')) // if the origin is not in the list of accepted origins
    // This code sets the "Access-Control-Allow-Origin" header to allow cross-origin requests.
    // It checks if the origin is allowed and calls the callback function accordingly.
  }
})
// This code enables CORS for all routes in the Express application.
