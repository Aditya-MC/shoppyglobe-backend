const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// @desc Get all products
// @route GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Get single product
// @route GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Product Not Found" });
  }
});

// @desc Create new product
// @route POST /api/products
router.post("/", async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    if (!name || !price || !description || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      stock
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
