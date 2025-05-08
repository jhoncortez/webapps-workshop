const http = require('node:http')
const { processRequest } = require('./processRequest')
// This code creates an HTTP server that listens for incoming requests and logs the request method, URL, headers, and body.
// It also sends a response with a "Hello, World!" message.
// Import the http module
// Import the processRequest function from the processRequest module
// const http = require('node:http')
// const { processRequest } = require('./processRequest')
// Create a server
const server = http.createServer(processRequest)
module.exports = { server }
