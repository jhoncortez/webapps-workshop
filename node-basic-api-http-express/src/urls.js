const http = require('node:http')

const { processRoutes } = require('./processRoutes')

// Create a server
const server = http.createServer(processRoutes)
// Export the server
module.exports = { server }
// This code creates an HTTP server that listens for incoming requests and logs the request method, URL, headers, and body.
