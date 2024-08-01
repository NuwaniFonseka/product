const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  // Import CORS
const Product = require("./models/product.model.js");
const productRoute = require('./routes/product.route.js');
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/products", productRoute);

// Root Route
app.get("/", (req, res) => {
  res.send("HELLO FROM NODE API");
});

// CRUD Routes (you can remove these if they're already defined in `productRoute`)
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({}); // Find all products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body); // Create one product
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct); // Return the updated Product
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB and start server
mongoose
  .connect(
    "mongodb+srv://nuwaniprasansa:ILlSbQZFMxFjWPMd@backenddb.9k6gpjf.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("App is listening on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
