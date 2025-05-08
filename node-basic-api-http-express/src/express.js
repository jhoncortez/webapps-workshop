/* eslint-disable no-undef */
const express = require('express')
// The Pokémon data is stored in a file named 'pokemonData.json' located in the 'db' directory.
const pokemonData = require('../db/pokemonData.json')

const app = express()
app.disable('x-powered-by') // Disable the 'X-Powered-By' header for security reasons

const PORT = process.env.PORT || 3002

// Middleware to parse JSON request bodies
app.use((req, res, next) => {
  // This code parses JSON request bodies and makes the parsed data available in req.body.
  // ask if is not post method or is not json then keep going
  if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
    // If the request method is not POST or the content type is not JSON, call the next middleware or route handler.
    return next()
  }

  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    try {
      const newPokemonData = JSON.parse(body)
      newPokemonData.timestamp = Date.now()
      // Here you would typically save the newPokemonData to a database
      // For this example, we just log it to the console
      console.log('Parsed JSON:', newPokemonData)
      // Set the parsed data to req.body
      req.body = newPokemonData
      // Call the next middleware or route handler
      next()
    } catch (error) {
      res.status(400).json({ error: 'Invalid JSON' })
    }
  })
  req.on('error', () => {
    res.status(500).json({ error: 'Internal Server Error' })
  })
})

// Middleware to handle CORS (Cross-Origin Resource Sharing)
// app.use((req, res, next) => {
//   // This code sets CORS headers to allow requests from any origin.
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
//   next()
// })
// // Middleware to handle OPTIONS requests
// app.options('*', (req, res) => {
//   // This code handles preflight requests by responding with a 200 OK status.
//   res.status(200).end()
// })
// // Middleware to serve static files
// app.use(express.static('public'))
// // Middleware to parse URL-encoded request bodies
// app.use(express.urlencoded({ extended: true }))
// // Middleware to parse JSON request bodies
// app.use(express.json())
// // Middleware to log request details
// app.use((req, res, next) => {
//   // This code logs the request method, URL, headers, and body to the console.
//   console.log(`Request Method: ${req.method}`)
//   console.log(`Request URL: ${req.url}`)
//   console.log('Request Headers:', req.headers)
//   if (req.method !== 'GET') {
//     console.log('Request Body:', req.body)
//   }
//   next()
// })

app.get('/', (req, res) => {
  res.send('<h1>Hello, World!</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  // This code retrieves Pokémon data from a JSON file and sends it as a response.
  res.status(200).json(pokemonData)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json({
    message: 'Pokémon data received successfully',
    data: req.body
  })
})

app.use((req, res) => {
  // This code handles requests to undefined routes and sends a 404 Not Found response.
  res.status(404).send('<h1>404 Not Found</h1>')
})
// This code handles errors that occur during the request processing.
app.use((err, req, res, next) => {
  console.error(err.stack)
  if (!res.headersSent) {
    res.status(500).send('<h1>500 Internal Server Error</h1>')
  }
})

// Start the server
// This code creates an Express server that listens on a specified port (default is 3002).

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
// This code creates an Express server that listens on a specified port (default is 3001).
// It defines a single route ("/") that responds with "Hello, World!" when accessed.
// The server is started and logs the URL to the console.
// The server is created using the Express framework, which simplifies the process of building web applications in Node.js.
// The server listens for incoming requests and responds with a message.
