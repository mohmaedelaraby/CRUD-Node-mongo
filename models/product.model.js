const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    description: String,
    image: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;