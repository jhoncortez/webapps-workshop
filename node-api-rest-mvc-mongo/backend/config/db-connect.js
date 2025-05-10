// File: db-connect.js
import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = 'mongodb+srv://mvcproducts:hXPNkFuMa9d5lz8J@node-api-rest-mvc-produ.p4df8t7.mongodb.net/?retryWrites=true&w=majority&appName=node-api-rest-mvc-products-cluster'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

let db = null

async function run () {
  if (db) return db
  try {
    // Connect the client to the server(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    db = await client.db('mvcproducts')
    await db.command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')
    return db
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}

process.on('SIGINT', async () => {
  await client.close()
  console.log('MongoDB connection closed')
  process.exit(0)
})

export { run as connectToDatabase }
