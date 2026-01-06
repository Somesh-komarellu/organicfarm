const express = require('express');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// 1. Configure Image Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Files will be saved here
  },
  filename(req, file, cb) {
    // Rename file to avoid duplicates (e.g., image-123456789.jpg)
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// ADD PRODUCT (Protected + Image Upload)
// Note: 'image' matches the name attribute in the frontend form
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, discount } = req.body;

    // Create full URL for the image
    // IMPORTANT: Change localhost port if yours is different
    const imagePath = req.file 
      ? `http://localhost:5000/uploads/${req.file.filename}` 
      : 'https://via.placeholder.com/150';

    const product = new Product({ 
        name, 
        price, 
        image: imagePath, 
        category, 
        discount 
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid data' });
  }
});

module.exports = router;