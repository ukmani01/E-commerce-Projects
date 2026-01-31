import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import routes
import adminRoutes from "./routes/adminRotes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/seedDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
