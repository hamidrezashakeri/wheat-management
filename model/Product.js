const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    nameProduct:{
        type: String,
        required: true
    },
    priceProduct:{
        type: Number,
        required: true
    }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;