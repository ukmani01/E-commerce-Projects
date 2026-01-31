import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./CartProvider.js";
import Home from "./components/Home.js";
import Product from "./components/Products.js";
import Card from "./components/Card.js";
import About from "./components/About.js";
import Login from "./components/Login.js";
import AdminDashboard from "./components/AdminDashboard .js";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* Navbar */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              mobile shopping
            </Link>
            <div className="flex gap-4 items-center">
              <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
              <Link to="/cart" className="text-gray-700 hover:text-blue-600">Cart</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link to="/login" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Login</Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<Card />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
