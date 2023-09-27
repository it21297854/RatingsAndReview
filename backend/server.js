// Import required libraries

require('dotenv').config() // Load environment variables from .env file
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') // For parsing JSON request bodies
const cors = require('cors') // Enable Cross-Origin Resource Sharing

// Create an instance of Express.js
const app = express()

// Middleware
app.use(cors()) // Enable CORS for all routes (you can adjust this as needed)
app.use(bodyParser.json()) // Parse JSON request bodies

// Connect to the MongoDB database
const { MONGODB_URI } = process.env
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error('MongoDB Connection Error:', error)
})

db.once('open', () => {
  console.log('Connected to the MongoDB database')
})

// Define your routes here
// Example:
app.use('/api/products', require('./Routes/productRoutes'))
app.use('/api/reviews', require('./Routes/reviewRoutes'))

// Define a default route
app.get('/', (req, res) => {
  res.send('Welcome to the MERN API')
})

// Start the Express.js server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
