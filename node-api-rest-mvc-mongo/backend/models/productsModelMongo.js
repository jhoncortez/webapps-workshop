// import { randomUUID } from 'crypto'
// import { validateProduct, validateProductPartial } from '../db/prodcts-schema.js'
// import { readJSON, writeJSON } from '../src/utils.js'
import { ObjectId } from 'mongodb'

// import database connection to mongoDB
import { connectToDatabase } from '../config/db-connect.js'

class ProductsModelMongo {
  // constructor to use the ../db/products.json file as a database
  // constructor (filePath) {
  //   this.filePath = filePath
  //   this.productsData = readJSON(filePath)
  // }

  // constructor to use the mongoDB database as a database
  constructor () {
    this.collection = null
    this._init() // Initialize the database connection
  }

  async _init () {
    // This code connects to the MongoDB database and retrieves the products collection.
    const db = await connectToDatabase()
    this.ObjectId = ObjectId
    this.collection = await db.collection('products')
    // This code retrieves all products from the products collection.
  }

  /**
   * Get all products from the database.
   * Optionally filter products by category.
   * @param {Object} options - Query options (e.g., category).
   * @returns {Array} - List of products.
   */
  async getAllProducts ({ category }) {
    const query = category ? { 'categories.slug': category } : {} // Filter by category if provided
    return this.collection.find(query).toArray() // Fetch and return all matching products
  }

  /**
   * Get a single product by its ID.
   * @param {Object} options - Query options (e.g., id).
   * @returns {Object|null} - The product object or null if not found.
   */
  async getProductById ({ id }) {
    return this.collection.findOne({ _id: new ObjectId(id) }) // Find the product by its ObjectId
  }

  /**
   * Create a new product in the database.
   * @param {Object} productData - The product data to insert.
   * @returns {Object} - The result of the insertion, including the new product's ID.
   */
  async createProduct (productData) {
    const result = await this.collection.insertOne(productData) // Insert the product into the collection
    return { success: true, data: { ...productData, _id: result.insertedId } } // Return the inserted product with its new ID
  }

  /**
   * Update an existing product by its ID.
   * @param {Object} options - Query options (e.g., id and productData).
   * @returns {Object} - The result of the update, including the updated product or an error message.
   */
  async updateProduct ({ id, productData }) {
    const product = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) }, // Find the product by its ObjectId
      { $set: productData }, // Update the product with the new data
      { returnDocument: 'after' } // Return the updated document
    )
    if (!product) {
      return { success: false, error: 'Product not found' } // Return an error if the product was not found
    }

    return { success: true, data: product } // Return the updated product
  }

  /**
   * Delete a product by its ID.
   * @param {Object} options - Query options (e.g., id).
   * @returns {boolean} - True if the product was deleted, false otherwise.
   */
  async deleteProduct ({ id }) {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) }) // Delete the product by its ObjectId
    return result.deletedCount > 0 // Return true if a product was deleted, false otherwise
  }
}

export default ProductsModelMongo
