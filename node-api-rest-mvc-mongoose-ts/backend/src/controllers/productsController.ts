// import ProductsModelMongo from '../models/productsModelMongo.js'
import ProductsModel from '../models/productsModel.js'

class ProductsController {
  constructor () {
    // this.productsModel = new ProductsModel('../db/products.json')
    this.productsModel = new ProductsModel()
  }

  getProducts = async (req, res) => {
    const { category } = req.query
    const products = await this.productsModel.getAllProducts({ category })
    res.status(200).json(products)
  }

  getProduct = async (req, res) => {
    const { id } = req.params
    const product = await this.productsModel.getProductById({ id })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
  }

  postProduct = async (req, res) => {
    const { success, data, error } = await this.productsModel.createProduct(req.body)

    if (!success) {
      return res.status(400).json({ message: 'Invalid product data', error })
    }

    res.status(201).json(data)
  }

  patchProduct = async (req, res) => {
    const { id } = req.params
    const { success, data, error } = await this.productsModel.updateProduct({ id, productData: req.body })

    if (!success) {
      if (error === 'Product not found') {
        return res.status(404).json({ message: error })
      }
      return res.status(400).json({ message: 'Invalid product data', error })
    }

    res.status(200).json(data)
  }

  deleteProductById = async (req, res) => {
    const { id } = req.params
    const success = await this.productsModel.deleteProduct({ id })

    if (!success) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(204).send()
  }
}

export default ProductsController
