const z = require('zod')

// validation witn zod
const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  regular_price: z.union([z.string(), z.number()]).refine(val => !isNaN(Number(val)), { message: 'Must be a valid number' }),
  sale_price: z.union([z.string(), z.number()]).optional().refine(val => val === undefined || !isNaN(Number(val)), { message: 'Must be a valid number' }),
  on_sale: z.boolean(),
  price: z.union([z.string(), z.number()]).refine(val => !isNaN(Number(val)), { message: 'Must be a valid number' }),
  categories: z.array(z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string()
  })),
  images: z.array(z.object({
    id: z.number(),
    src: z.string(),
    name: z.string()
  })),
  description: z.string().optional(),
  short_description: z.string().optional(),
  attributes: z.array(z.object({
    id: z.number(),
    name: z.string(),
    options: z.array(z.string())
  })),
  tags: z.array(z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string()
  })),
  stock_status: z.enum(['instock', 'outofstock', 'onbackorder']),
  stock_quantity: z.union([z.string(), z.number()]).optional().refine(val => val === undefined || !isNaN(Number(val)), { message: 'Must be a valid number' }),
  sku: z.string().optional(),
  type: z.enum(['simple', 'variable']),
  status: z.enum(['publish', 'draft', 'pending']),
  catalog_visibility: z.enum(['visible', 'catalog', 'search', 'hidden']),
  featured: z.boolean(),
  downloadable: z.boolean(),
  virtual: z.boolean(),
  date_created: z.string(),
  date_modified: z.string()
})
// This code validates the new product data using a schema and returns a 400 status with an error message if the validation fails.
// If the product data is valid, it adds the new product to the products data and sends a response with a 201 status and the newly created product data in JSON format.
// This code generates a unique ID for the new product using the crypto module and adds it to the product data.

function validateProduct (product) {
  return productSchema.safeParse(product)
}

function validateProductPartial (product) {
  return productSchema.partial().safeParse(product)
}

module.exports = {
  validateProduct, validateProductPartial
}
// This code exports the validateProduct function, which can be used to validate product data before adding it to the products data.
// The function uses the zod library to define a schema for the product data and checks if the data matches the schema.
// If the data is valid, it returns a success message; otherwise, it returns an error message with details about the validation errors.
// This code defines a schema for product data using the zod library and exports a function to validate product data against the schema.
// The function checks if the product data matches the schema and returns a success message or an error message with details about the validation errors.
