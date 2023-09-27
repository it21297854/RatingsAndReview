// routes/productRoutes.js
const express = require('express')
const router = express.Router()
const Product = require('../Model/Product')

// Create a new product (no authentication required)
router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body

    // Create a new product
    const product = new Product({ name, description, price })

    // Save the product to the database
    await product.save()

    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ error: 'Error creating the product' })
  }
})

//update the project
router.put('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId
    const { name, description, price } = req.body

    // Find the product by ID
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Update product properties
    product.name = name || product.name
    product.description = description || product.description
    product.price = price || product.price

    // Save the updated product
    await product.save()

    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Error updating the product' })
  }
})

//delete a product
router.delete('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId

    // Find the product by ID and delete it
    const product = await Product.findByIdAndDelete(productId)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the product' })
  }
})

// Get a product by code (no authentication required)
router.get('/:productCode', async (req, res) => {
  try {
    const productCode = req.params.productCode;

    // Find the product by its code (or ID)
    const product = await Product.findById(productCode);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the product' });
  }
});

// Get all products (no authentication required)
router.get('/', async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

module.exports = router
