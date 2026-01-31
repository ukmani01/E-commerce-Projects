// backend/models/ProductSchema.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  productHihglights: String,
  price: Number,
  imageUrl: String,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
