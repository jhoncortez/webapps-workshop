import { randomUUID } from 'crypto'
import { validateProduct, validateProductPartial } from '../db/prodcts-schema.js'
import { readJSON, writeJSON } from '../src/utils.js'

class ProductsModel {
  constructor (filePath) {
    this.filePath = filePath
    this.productsData = readJSON(filePath)
  }

  async getAllProducts ({ category }) {
    // This code retrieves all products from the products data and sends it as a response.
    // filter the products data based on the query parameters
    if (category) {
      return this.productsData.filter(product =>
        product.categories.some(cat => cat.slug.toLowerCase() === category.toLowerCase())
      )
    }
    return this.productsData
  }

  async getProductById ({ id }) {
    return this.productsData.find(product => product.id === id)
  }

  async createProduct (productData) {
    // This code handles the creation of a new product by adding it to the products data and sending a response.
    const validatedProduct = validateProduct(productData)

    if (!validatedProduct.success) {
      return { success: false, error: JSON.parse(validatedProduct.error.message) }
    }
    // This code validates the new product data using a schema and returns a 400 status with an error message if the validation fails.
    // If the product data is valid, it adds the new product to the products data and sends a response with a 201 status and the newly created product data in JSON format.
    // check if the product data is valid

    const newProduct = {
      ...validatedProduct.data,
      id: randomUUID()
    //   date_created: new Date().toISOString(),
    //   date_modified: new Date().toISOString()
    }
    // This code generates a unique ID for the new product using the crypto module and adds it to the product data.
    // add the new product to the products data
    // productsData.push(newProduct) // this is not a REST API princile but for the sake of simplicity
    // This code adds a new product to the products data and sends a response.
    // It checks if the product data is valid and returns a 400 status with an error message if not.
    // If the product is successfully created, it returns a 201 status with the newly created product data in JSON format.
    // add the new product to the products data

    this.productsData.push(newProduct)// this is not a REST API princile but for the sake of simplicity
    // This code adds a new product to the products data and sends a response.
    // It checks if the product data is valid and returns a 400 status with an error message if not.
    // If the product is successfully created, it returns a 201 status with the newly created product data in JSON format.

    this._saveProducts() // Uncomment this line to save the new product to the JSON file

    return { success: true, data: newProduct }
  }

  async updateProduct ({ id, productData }) {
    const productIndex = this.productsData.findIndex(product => product.id === id)

    if (productIndex === -1) {
      return { success: false, error: 'Product not found' }
    }
    // This code retrieves the index of a specific product by its ID from the products data and sends a response.
    // If the product is not found, it returns a 404 status with an error message.

    // validate the product data
    const validatedProduct = validateProductPartial(productData)
    // This code validates the updated product data using a schema and returns a 400 status with an error message if the validation fails.
    if (!validatedProduct.success) {
      return { success: false, error: JSON.parse(validatedProduct.error.message) }
    }

    const updatedProduct = {
      ...this.productsData[productIndex],
      ...validatedProduct.data,
      id: this.productsData[productIndex].id,
      date_modified: new Date().toISOString()
    }

    this.productsData[productIndex] = updatedProduct
    // this._saveProducts() // Uncomment this line to save the updated product to the JSON file

    return { success: true, data: updatedProduct }
  }

  async deleteProduct ({ id }) {
    const productIndex = this.productsData.findIndex(product => product.id === id)

    if (productIndex === -1) {
      return false
    }
    // This code retrieves the index of a specific product by its ID from the products data and sends a response.
    // If the product is not found, it returns a 404 status with an error message.

    this.productsData.splice(productIndex, 1)
    // This code removes the specified product from the products data and sends a response.
    // It checks if the product exists and returns a 404 status with an error message if not.
    // If the product is successfully deleted, it returns a 204 status with no content.

    // this._saveProducts() // Uncomment this line to save the deleted product to the JSON file

    return true
  }

  _saveProducts () {
    writeJSON(this.filePath, this.productsData)
  }
}

export default ProductsModel
