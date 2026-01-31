// routes/adminRoutes.js
import express from "express";
const router = express.Router();

// Dummy login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Hardcoded admin user
  if (username === "ukmani" && password === "1234") {
    return res.json({ token: "dummy-jwt-token" });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

export default router;
