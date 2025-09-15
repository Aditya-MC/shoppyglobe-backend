const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  let cart = await Cart.findOne({ userId: req.user });
  if (!cart) cart = new Cart({ userId: req.user, items: [] });

  const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
  if (itemIndex >= 0) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

router.put("/:productId", auth, async (req, res) => {
  const { quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(item => item.productId.equals(req.params.productId));
  if (!item) return res.status(404).json({ message: "Product not in cart" });

  item.quantity = quantity;
  await cart.save();
  res.json(cart);
});

router.delete("/:productId", auth, async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(item => !item.productId.equals(req.params.productId));
  await cart.save();
  res.json(cart);
});

module.exports = router;
