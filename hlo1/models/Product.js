const mongoose = require('mongoose')
const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    }
})
const Product = mongoose.model('Todo', ProductSchema)
module.exports = Product