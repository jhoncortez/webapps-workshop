import { Router, Request, Response } from 'express' // Importing the express Router
// import { randomUUID } from 'crypto'
// import fs from 'fs'

// import { validateProduct, validateProductPartial } from '../db/prodcts-schema.js' // This code imports the file system module for reading files.
// import { readJSON } from '../src/utils.js' // This code imports the readJSON function from the utils module.
import ProductsController from '../controllers/productsController.js' // This code imports the ProductsController class from the ProductsController module.

// import the products data from the json file
// const productsData = JSON.parse(fs.readFileSync(new URL('../db/products.json', import.meta.url))) // this is an old way to import the json file

// import the products data from the json file
// const productsData = readJSON('../db/products.json') // This code imports the products data from a JSON file using the CommonJS require function.
// This code imports the products data from a JSON file using the CommonJS require function.

const productsRouter: Router = Router() // This code creates a new instance of the express Router, which is used to define routes for the API.
const productsController = new ProductsController() // This code creates a new instance of the ProductsController class, which is used to handle product-related operations.

// DEFINE ROUTES
// gett all the products from the products.json file
productsRouter.get('/', productsController.getProducts)

// get a product by id
productsRouter.get('/:id', productsController.getProduct)

// post a new product
productsRouter.post('/', productsController.postProduct)

// update a product by id
productsRouter.patch('/:id', productsController.patchProduct)

// delete a product by id
productsRouter.delete('/:id', productsController.deleteProductById)

// PRELIGHT REQUESTS
// PUT, PATCH, DELETE SHOULD BE ALLOWED
productsRouter.options('/products/:id', (req: Request, res: Response) => {
  // This code handles preflight requests for the /products endpoint and sends a response.
  // res.header('Access-Control-Allow-Origin', '*') // commenting this line to avoid CORS issues because we use the middleware
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE') // Allow only specific methods
  res.sendStatus(200)
})
// This code handles preflight requests for the /products endpoint and sends a response.
// It sets the "Access-Control-Allow-Origin" header to allow cross-origin requests and specifies the allowed methods.
// This code defines a route to handle preflight requests for the /products endpoint and sends a response.

export default productsRouter
// This code exports the productsRouter instance, which contains all the defined routes for the products API.
