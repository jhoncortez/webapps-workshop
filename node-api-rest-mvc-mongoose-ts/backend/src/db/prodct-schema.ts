import mongoose from 'mongoose'

const { Schema, model } = mongoose

// Define the product schema
const productSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  regular_price: { type: Number, required: true },
  sale_price: { type: Number, default: null },
  on_sale: { type: Boolean, default: false },
  price: { type: Number, required: true },
  categories: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      slug: { type: String, required: true }
    }
  ],
  images: [
    {
      id: { type: Number, required: true },
      src: { type: String, required: true },
      name: { type: String, required: true }
    }
  ],
  description: { type: String, default: '' },
  short_description: { type: String, default: '' },
  attributes: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      options: [{ type: String }]
    }
  ],
  tags: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      slug: { type: String, required: true }
    }
  ],
  stock_status: {
    type: String,
    enum: ['instock', 'outofstock', 'onbackorder'],
    required: true
  },
  stock_quantity: { type: Number, default: 0 },
  sku: { type: String, default: '' },
  type: { type: String, enum: ['simple', 'variable'], required: true },
  status: { type: String, enum: ['publish', 'draft', 'pending'], required: true },
  catalog_visibility: {
    type: String,
    enum: ['visible', 'catalog', 'search', 'hidden'],
    required: true
  },
  featured: { type: Boolean, default: false },
  downloadable: { type: Boolean, default: false },
  virtual: { type: Boolean, default: false },
  date_created: { type: Date, default: Date.now },
  date_modified: { type: Date, default: Date.now }
})

// Create the product model
const Product = model('Product', productSchema)

export default Product
