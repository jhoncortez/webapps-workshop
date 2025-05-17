/* MONGOOSE BASED
 * this is a model for the products with mongoose
 * this is a model for the products collection in the mongoDB database
 * it uses the mongoose library to connect to the database and perform CRUD operations
 * it is a class that has methods to get all products, get a product by id, create a product, update a product and delete a product
 * it uses the mongoose model to create a new product
 * * it uses the mongoose model to find a product by id
 * it uses the mongoose model to update a product by id
 * it uses the mongoose model to delete a product by id
 * it uses the mongoose model to find all products
 * it uses the mongoose model to find a product by id
 * it uses the mongoose model to create a new product
*/
import type { ProductContract, ProductResponse } from '../types/index.js'
import Product from '../db/prodct-schema.js' // Import the Mongoose model

class ProductsModel {
  /**
   * Get all products from the database.
   * Optionally filter products by category.
   * @param {Object} options - Query options (e.g., category).
   * @returns {Array} - List of products.
   */
  async getAllProducts ({ category }: { category?: string }): Promise<ProductContract[]>{
    const query = category ? { 'categories.slug': category } : {}
    return await Product.find(query) // Use Mongoose to fetch products
  }

  /**
   * Get a single product by its ID.
   * @param {Object} options - Query options (e.g., id).
   * @returns {Object|null} - The product object or null if not found.
   */
  async getProductById ({ id }: { id: string}): Promise<ProductResponse> {
    const product =  await Product.findById(id) // Use Mongoose to fetch a product by ID
    if (!product) {
      return { success: false, error: 'Product not found' }
    }
    return { success: true, data: product }
  }

  /**
   * Create a new product in the database.
   * @param {Object} productData - The product data to insert.
   * @returns {Object} - The result of the insertion, including the new product's ID.
   */
  async createProduct ( productData: ProductContract): Promise<ProductResponse> {
    const product = new Product(productData) // Create a new product instance
    const result = await product.save() // Save the product to the database
    if (!result) {
      return { success: false, error: 'The product could not be created' }
    }
    return { success: true, data: product }
  }

  /**
   * Update an existing product by its ID.
   * @param {Object} options - Query options (e.g., id and productData).
   * @returns {Object} - The result of the update, including the updated product or an error message.
   */
  async updateProduct ({ id, productData }: { id: string; productData: Partial<ProductContract>}): Promise<ProductResponse> {
    const product = await Product.findByIdAndUpdate(id, productData, {
      new: true // Return the updated document
    })

    if (product == null) {
      return { success: false, error: 'Product not found' }
    }

    return { success: true, data: product }
  }

  /**
   * Delete a product by its ID.
   * @param {Object} options - Query options (e.g., id).
   * @returns {boolean} - True if the product was deleted, false otherwise.
   */
  async deleteProduct ({ id }: { id: string }): Promise<boolean> {
    const result = await Product.findByIdAndDelete(id) // Delete the product by ID
    return !!result // Return true if a product was deleted, false otherwise
  }
}

export default ProductsModel // Export the MongoDBModel class
