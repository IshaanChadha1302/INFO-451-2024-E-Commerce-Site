const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3003;

// Database Connection
mongoose.connect('mongodb+srv://chadhaik:chadhaik@cluster0.s56jnxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection - error:'));
db.once('open', () => console.log('Connected to MongoDB Atlas'));

// Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    stocked: { type: Boolean, required: true },
    popularity: { type: Number, default: 0 },
    onSale: { type: Boolean, default: false },
    salePrice: { type: Number, required: function() { return this.onSale; } }
});

const Product = mongoose.model('Product', productSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a new product
app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        console.error(error); 
        res.status(400).send(error);
    }
});

// Get a product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send(error);
    }
});

// Search for products by name
app.get('/search/:query', async (req, res) => {
    try {
        const regex = new RegExp(req.params.query, 'i'); // 'i' for case insensitive
        const products = await Product.find({ name: regex });
        res.json(products);
    } catch (error) {
        console.error("Error fetching search results:", error);
        res.status(500).send("Error processing search query");
    }
});

app.get('/search/:term', async (req, res) => {
    const searchQuery = req.params.term; // Ensure this variable is defined here
    console.log("Search query received:", searchQuery); // Log the search query

    try {
        const results = await Product.find({
            Name: { $regex: new RegExp(searchQuery, "i") }
        });
        console.log("Database search results:", results); // Log the results from the database

        if (results.length === 0) {
            return res.status(404).json({ message: "No results found." });
        }
        res.json(results);
    } catch (error) {
        console.error("Error searching the database:", error); // Log any errors
        res.status(500).send(error.message);
    }
});



// Update a product by id
app.patch('/products/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['category','name', 'price','stocked']; 
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));