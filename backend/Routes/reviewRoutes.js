// routes/reviewRoutes.js
const express = require('express')
const router = express.Router()
const Product = require('../Model/Product')

// Leave a review for a product
router.post('/:productId/reviews', async (req, res) => {
  try {
    const { rating, comment } = req.body
    const productId = req.params.productId

    // Find the product by ID
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Create a new review
    const review = {
      rating,
      comment,
    }

    // Add the review to the product's reviews array
    product.reviews.push(review)

    // Save the product with the new review to the database
    await product.save()

    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ error: 'Error creating the review' })
  }
})

// Update a review for a product
router.put('/:productId/reviews/:reviewId', async (req, res) => {
  try {
    const productId = req.params.productId
    const reviewId = req.params.reviewId
    const { rating, comment } = req.body

    // Find the product by ID
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Find the review by ID within the product's reviews array
    const reviewToUpdate = product.reviews.find((review) =>
      review._id.equals(reviewId)
    )

    if (!reviewToUpdate) {
      return res.status(404).json({ error: 'Review not found' })
    }

    // Update review properties
    reviewToUpdate.rating = rating || reviewToUpdate.rating
    reviewToUpdate.comment = comment || reviewToUpdate.comment

    // Save the updated product with the modified review
    await product.save()

    res.json(reviewToUpdate)
  } catch (error) {
    res.status(500).json({ error: 'Error updating the review' })
  }
})

// Delete a review for a product
router.delete('/:productId/reviews/:reviewId', async (req, res) => {
  try {
    const productId = req.params.productId
    const reviewId = req.params.reviewId

    // Find the product by ID
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Find the index of the review within the product's reviews array
    const reviewIndex = product.reviews.findIndex((review) =>
      review._id.equals(reviewId)
    )

    if (reviewIndex === -1) {
      return res.status(404).json({ error: 'Review not found' })
    }

    // Remove the review from the product's reviews array
    product.reviews.splice(reviewIndex, 1)

    // Save the updated product without the deleted review
    await product.save()

    res.json({ message: 'Review deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the review' })
  }
})

// Get all reviews for a product
router.get('/:productId/reviews', async (req, res) => {
  try {
    const productId = req.params.productId

    // Find the product by ID
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Retrieve all reviews for the product
    const reviews = product.reviews

    res.json(reviews)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' })
  }
})

// Get a review by ID for a product 
router.get('/:productId/reviews/:reviewId', async (req, res) => {
  try {
    const productId = req.params.productId
    const reviewId = req.params.reviewId

    // Find the product by ID
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Find the review by ID within the product's reviews array
    const review = product.reviews.find((review) => review._id.equals(reviewId))

    if (!review) {
      return res.status(404).json({ error: 'Review not found' })
    }

    res.json(review)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the review' })
  }
})

module.exports = router
