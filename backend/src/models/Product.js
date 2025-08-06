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

// Example in your backend route/controller
const newProduct = new Product({
    name: req.body.name,
    image: req.body.image, // <-- This should be set
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    status: req.body.status,
    // ...other fields
});
await newProduct.save();

// Example Express route
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products); // Should include image field
});

// Frontend code example
const productData = {
    name: form.name,
    image: form.images.split(',')[0].trim(), // <-- Use 'image' not 'imageUrl'
    // ...other fields
};