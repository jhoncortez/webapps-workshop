const path = require('node:path')
const fs = require('node:fs/promises')

const dirname = path.resolve()
console.log('dirname', dirname)

const processRoutes = (req, res) => {
  // Set the response header
  if (req.url === '/favicon.ico') {
    res.writeHead(204)
    res.end()
  } else if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h1>Welcome to the Home Page</h1>')
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h1>About Us</h1>')
  } else if (req.url === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h1>Contact Us</h1>')
  } else if (req.url === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Hello, API!' }))
  } else if (req.url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify([{ name: 'John Doe' }, { name: 'Jane Doe' }]))
  } else if (req.url === '/api/products') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify([{ name: 'Product 1' }, { name: 'Product 2' }]))
  } else if (req.url === '/api/orders') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify([{ orderId: 1, product: 'Product 1' }, { orderId: 2, product: 'Product 2' }]))
  } else if (req.url === '/api/cart') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify([{ itemId: 1, product: 'Product 1' }, { itemId: 2, product: 'Product 2' }]))
  } else if (req.url === '/api/cart/checkout') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Checkout successful!' }))
  } else if (req.url === '/api/cart/checkout/confirm') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Checkout confirmed!' }))
  } else if (req.url === '/api/cart/checkout/cancel') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Checkout canceled!' }))
  } else if (req.url === '/api/cart/checkout/confirm/success') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Checkout confirmed successfully!' }))
  } else if (req.url === '/api/cart/checkout/confirm/failure') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Checkout confirmation failed!' }))
  } else if (req.url === '/api/cart/checkout/cancel/success') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Checkout canceled successfully!' }))
  } else if (req.url === '/api/cart/checkout/cancel/failure') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Checkout cancellation failed!' }))
  } else if (req.url === '/psg-logo') {
    const imagePath = path.resolve(dirname, './images/psg-logo.png') // Absolute path to the image
    fs.readFile(imagePath).then((data) => {
      res.writeHead(200, { 'Content-Type': 'image/png' })
      res.end(data)
    }).catch((err) => {
      console.error(err)
      res.writeHead(500, { 'Content-Type': 'text/html' })
      res.end('<h1>image doesnt exist</h1>')
    })
  } else { // Handle other routes
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('<h1>404 - Page Not Found</h1>')
  }
}
module.exports = { processRoutes }
// This code defines a function `processRoutes` that handles HTTP requests and responses.
