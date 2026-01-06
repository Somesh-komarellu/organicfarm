// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Adjust path if needed

dotenv.config();

const sampleProducts = [
  {
    name: "Fresh Organic Apple (1kg)",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1000&auto=format&fit=crop",
    category: "Fruits",
    discount: 10
  },
  {
    name: "Farm Fresh Carrots (500g)",
    price: 2.00,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1000&auto=format&fit=crop",
    category: "Vegetables",
    discount: 5
  },
  {
    name: "Organic Spinach Bunch",
    price: 1.50,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1000&auto=format&fit=crop",
    category: "Vegetables",
    discount: 0
  },
  {
    name: "Red Strawberries (Box)",
    price: 6.00,
    image: "http://localhost:5000/uploads/straw.jpg",
    category: "Fruits",
    discount: 15
  },
  {
    name: "Organic Avocados (2pcs)",
    price: 5.50,
    image: "http://localhost:5000/uploads/avacado.jpg",
    category: "Fruits",
    discount: 5
  },
  {
    name: "Fresh Tomatoes (1kg)",
    price: 3.20,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop",
    category: "Vegetables",
    discount: 8
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');
    await Product.deleteMany({}); // Clears old products
    await Product.insertMany(sampleProducts);
    console.log('Data Imported!');
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });