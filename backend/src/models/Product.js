const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, enum: ['Laptops', 'Smartphones', 'Headphones', 'Cameras'] },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['In Stock', 'Low Stock', 'Out of Stock'], default: 'In Stock' },
    rating: { type: Number, min: 0, max: 5 }
});

module.exports = mongoose.model('Product', productSchema);