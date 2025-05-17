// import ProductsModelMongo from '../models/productsModelMongo.js'
import { Request, Response } from 'express'
import ProductsModel from '../models/productsModel.js'

class ProductsController {

  private readonly productsModel: ProductsModel
  constructor () {
    // this.productsModel = new ProductsModel('../db/products.json')
    this.productsModel = new ProductsModel()
  }

  getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req)
      const { category } = req.query as { category?: string }
      const products = await this.productsModel.getAllProducts({ category })
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products', error })
    }
  }

  getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const result = await this.productsModel.getProductById({ id })

      if (!result.success) {
        res.status(404).json({ message: result.error })
        return
      }

      res.status(200).json(result.data)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch data', error })
    }
  }

  postProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const productData = req.body
      const result = await this.productsModel.createProduct(productData)

      if (!result.success) {
        res.status(404).json({ message: result.error })
        return
      }

      res.status(200).json(result.data)

    } catch (error) {
      res.status(400).json({ message: 'Invalid product data', error })
    }
  }

  patchProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const productData = req.body
      const result = await this.productsModel.updateProduct({ id, productData })

      if (!result.success) {
        res.status(404).json({ message: result.error })
        return
      }

      res.status(200).json(result.data)
    } catch (error) {
      res.status(400).json({ message: 'Invalid product data', error })
    }
  }

  deleteProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const success = await this.productsModel.deleteProduct({ id })

      if (!success) {
        res.status(404).json({ message: 'Product not found' })
        return
      }

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete product', error })
    }
  }
}

export default ProductsController
