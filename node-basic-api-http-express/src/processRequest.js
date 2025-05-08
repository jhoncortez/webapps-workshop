// This code defines a function `processRequest` that handles HTTP requests and responses.

// get pokemon data
const pokemonData = require('../db/pokemonData.json')

const processRequest = (req, res) => {
  // get the request method and URL
  const { method, url } = req

  // switch methods
  switch (method) {
    case 'GET':
      // Handle GET requests
      if (url === '/pokemon/ditto') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(pokemonData))
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        return res.end('<h1>Pokemon not found</h1>')
      }
    case 'POST':
      // Handle POST requests
      if (url === '/pokemon') {
        let body = ''
        req.on('data', chunk => {
          body += chunk.toString()
        })
        req.on('end', () => {
          try {
            const newPokemonData = JSON.parse(body)
            // Here you would typically save the newPokemonData to a database
            res.writeHead(201, { 'Content-Type': 'application/json' })
            newPokemonData.timestamp = Date.now()
            res.end(JSON.stringify(newPokemonData))
          } catch (error) {
            // Handle JSON parsing errors
            if (!res.headersSent) {
              res.writeHead(400, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: 'Invalid JSON' }))
            }
          }
        })
        req.on('error', () => {
          if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'Internal Server Error' }))
          }
        })
      }
      break
    default:
      // Handle other request methods
      res.writeHead(405, { 'Content-Type': 'text/html' })
      return res.end('<h1>Method Not Allowed</h1>')
  }
}
module.exports = { processRequest }
// This code defines a function `processRequest` that handles HTTP requests and responses.
