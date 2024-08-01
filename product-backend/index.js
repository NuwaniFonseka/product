const express = require("express");
const cors = require("cors");  // Import CORS
const { PrismaClient } = require("@prisma/client"); // Import Prisma Client
const productRoute = require('./routes/product.route.js');
const app = express();

// Initialize Prisma Client
const prisma = new PrismaClient();

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
    const products = await prisma.product.findMany(); // Find all products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: req.body,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.status(200).json(updatedProduct); // Return the updated Product
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to PostgreSQL and start server
app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
