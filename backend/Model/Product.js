// models/Product.js
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      // user: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'User',
      // },
      rating: {
        type: Number,
        required: true,
      },
      comment: String,
    },
  ],
})

module.exports = mongoose.model('Product', productSchema)
