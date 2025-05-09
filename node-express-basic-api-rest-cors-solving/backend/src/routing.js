const express = require('express')
const crypto = require('crypto')
// import cors from 'cors' with commonjs
const cors = require('cors') // This code imports the CORS middleware for handling cross-origin requests.

const { validateProduct, validateProductPartial } = require('../db/prodcts-schema.js')

const app = express()
const PORT = process.env.PORT || 3002

app.disable('x-powered-by')
// This code disables the "X-Powered-By" header in the HTTP response.

// import the products data from the json file
const productsData = require('../db/products.json')

app.use(express.json()) // This code enables the Express application to parse incoming JSON requests.

app.use(cors({
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
    const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005']
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
    // This code sets the "Access-Control-Allow-Origin" header to allow cross-origin requests.
    // It checks if the origin is allowed and calls the callback function accordingly.
  }
})) // This code enables CORS for all routes in the Express application.

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

// gett all the products from the products.json file
app.get('/products', (req, res) => {
  // This code retrieves all products from the products data and sends it as a response.
  // It also sets the "Access-Control-Allow-Origin" header to allow cross-origin requests.

  // This code sets the "Access-Control-Allow-Origin" header to allow cross-origin requests.
  res.header('Access-Control-Allow-Origin', '*')

  // filter the products data based on the query parameters
  const { category } = req.query
  let filteredProducts = []
  if (category) {
    filteredProducts = productsData.filter(product => product.categories.some(cat => cat.slug.toLowerCase() === category.toLowerCase()))
  }
  // This code retrieves product data from a JSON file and sends it as a response.
  res.status(200).json(category ? filteredProducts : productsData)
})

// get a product by id
app.get('/products/:id', (req, res) => { // path-to-regexp
  // This code retrieves a specific product by its ID from the products data and sends it as a response.
  const { id } = req.params
  const product = productsData.find(product => product.id === id)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }
  res.status(200).json(product)
})
// This code defines a route to get a product by its ID from the products data and sends it as a response.
// If the product is not found, it returns a 404 status with an error message.
// This code defines a route to get all products from the products data and sends it as a response.
// If the request is successful, it returns a 200 status with the product data in JSON format.
// This code defines a route for the root URL ("/") that responds with "Hello, World!".
// It also sets the response status to 200 (OK) and sends a JSON response with the product data.

// post a new product
app.post('/products', (req, res) => {
  // This code handles the creation of a new product by adding it to the products data and sending a response.
  const validatedProduct = validateProduct(req.body)

  if (!validatedProduct.success) {
    return res.status(400).json({ message: 'Invalid product data', error: JSON.parse(validatedProduct.error.message) })
  }
  // This code validates the new product data using a schema and returns a 400 status with an error message if the validation fails.
  // If the product data is valid, it adds the new product to the products data and sends a response with a 201 status and the newly created product data in JSON format.
  // check if the product data is valid

  const newProduct = {
    ...validatedProduct.data,
    id: crypto.randomUUID() // generate a unique id for the new product
    // date_created: new Date().toISOString(),
    // date_modified: new Date().toISOString()
  }
  // This code generates a unique ID for the new product using the crypto module and adds it to the product data.
  // add the new product to the products data
  // productsData.push(newProduct) // this is not a REST API princile but for the sake of simplicity
  // This code adds a new product to the products data and sends a response.
  // It checks if the product data is valid and returns a 400 status with an error message if not.
  // If the product is successfully created, it returns a 201 status with the newly created product data in JSON format.
  // add the new product to the products data

  productsData.push(newProduct) // this is not a REST API princile but for the sake of simplicity
  // This code adds a new product to the products data and sends a response.
  // It checks if the product data is valid and returns a 400 status with an error message if not.
  // If the product is successfully created, it returns a 201 status with the newly created product data in JSON format.
  res.status(201).json(newProduct)
})
// This code defines a route to create a new product by adding it to the products data and sending a response.
// If the request is successful, it returns a 201 status with the newly created product data in JSON format.

// update a product by id
app.patch('/products/:id', (req, res) => {
  // This code handles the update of a product by its ID and sends a response.
  const { id } = req.params
  const productIndex = productsData.findIndex(product => product.id === id)

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' })
  }
  // This code retrieves the index of a specific product by its ID from the products data and sends a response.
  // If the product is not found, it returns a 404 status with an error message.

  const validatedProduct = validateProductPartial(req.body)

  if (!validatedProduct.success) {
    return res.status(400).json({ message: 'Invalid product data', error: JSON.parse(validatedProduct.error.message) })
  }
  // This code validates the updated product data using a schema and returns a 400 status with an error message if the validation fails.
  // If the product data is valid, it updates the existing product in the products data and sends a response with a 200 status and the updated product data in JSON format.

  const updatedProduct = {
    ...productsData[productIndex],
    ...validatedProduct.data,
    id: productsData[productIndex].id,
    // date_created: productsData[productIndex].date_created,
    date_modified: new Date().toISOString()
  }
  // This code updates the existing product in the products data and sends a response.
  // It checks if the product data is valid and returns a 400 status with an error message if not.
  // If the product is successfully updated, it returns a 200 status with the updated product data in JSON format.

  productsData[productIndex] = updatedProduct
  res.status(200).json(updatedProduct)
})
// This code defines a route to update a product by its ID in the products data and sends a response.
// If the request is successful, it returns a 200 status with the updated product data in JSON format.

// delete a product by id
app.delete('/products/:id', (req, res) => {
  // This code sets the "Access-Control-Allow-Origin" header to allow cross-origin requests.
  // res.header('Access-Control-Allow-Origin', '*') // commenting this line to avoid CORS issues because we use the middleware
  // This code handles the deletion of a product by its ID and sends a response.
  const { id } = req.params
  const productIndex = productsData.findIndex(product => product.id === id)

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' })
  }
  // This code retrieves the index of a specific product by its ID from the products data and sends a response.
  // If the product is not found, it returns a 404 status with an error message.

  productsData.splice(productIndex, 1)
  // This code removes the specified product from the products data and sends a response.
  // It checks if the product exists and returns a 404 status with an error message if not.
  // If the product is successfully deleted, it returns a 204 status with no content.

  res.status(204).send()
})
// This code defines a route to delete a product by its ID from the products data and sends a response.
// If the request is successful, it returns a 204 status with no content.
// This code handles the deletion of a product by its ID and sends a response.
// This code defines a route to update a product by its ID in the products data and sends a response.
// If the request is successful, it returns a 200 status with the updated product data in JSON format.

// PRELIGHT REQUESTS
// PUT, PATCH, DELETE SHOULD BE ALLOWED
app.options('/products/:id', (req, res) => {
  // This code handles preflight requests for the /products endpoint and sends a response.
  // res.header('Access-Control-Allow-Origin', '*') // commenting this line to avoid CORS issues because we use the middleware
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE') // Allow only specific methods
  res.sendStatus(200)
})
// This code handles preflight requests for the /products endpoint and sends a response.
// It sets the "Access-Control-Allow-Origin" header to allow cross-origin requests and specifies the allowed methods.
// This code defines a route to handle preflight requests for the /products endpoint and sends a response.

// create object to export module with app and port
const routing = {
  app,
  PORT
}
// export the routing object
module.exports = routing
// This code creates an Express application and defines a route for the root URL ("/") that responds with "Hello, World!".
// It also exports the app and port as a module for use in other files.
