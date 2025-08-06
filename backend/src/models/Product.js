const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    stock: { type: Number, default: 1 }
});

module.exports = mongoose.model('Product', productSchema);
