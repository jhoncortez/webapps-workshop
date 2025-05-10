// MONGOOSE BASED CONNECTION
import mongoose from 'mongoose'
import dotenv from 'dotenv' // MongoDB connection URI

dotenv.config() // Load environment variables from .env file
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mvcproducts'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
// Connect to MongoDB using Mongoose
const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, options)
    console.log('Connected to MongoDB Atlas')
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error)
    process.exit(1) // Exit the process if the connection fails
  }
  // Optional: Set up a connection event listener
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB')
  })
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err)
  })
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB')
  })
  // Optional: Handle process termination
  process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log('Mongoose connection closed')
    process.exit(0)
  })
}
export default connectToDatabase
// export default mongoose.connection
