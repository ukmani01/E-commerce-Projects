// backend/routes/productRoutes.js
import express from "express";
import Product from "../models/ProductSchema.js";

const router = express.Router();

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// ✅ Add new product
router.post("/", async (req, res) => {
  try {
    const { name, productHihglights, price, imageUrl } = req.body;
    const product = new Product({ name, productHihglights, price, imageUrl });
    await product.save();
    res.json({ message: "Product added", product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update product
router.put("/:id", async (req, res) => {
  try {
    const { name, productHihglights, price, imageUrl } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, productHihglights, price, imageUrl },
      { new: true }
    );
    res.json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
