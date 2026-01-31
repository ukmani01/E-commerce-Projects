import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/login");
    else fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) { console.error(err); }
  };

  const totalStock = products.reduce((sum, p)=>sum + (p.price||0),0);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-6">📊 Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-600 text-white rounded-xl shadow-lg p-4 text-center">
          <h5 className="font-semibold">Total Products</h5>
          <h3 className="text-2xl font-bold">{products.length}</h3>
        </div>
        <div className="bg-green-600 text-white rounded-xl shadow-lg p-4 text-center">
          <h5 className="font-semibold">Total Stock Value</h5>
          <h3 className="text-2xl font-bold">₹{totalStock.toLocaleString()}</h3>
        </div>
        <div className="bg-yellow-400 text-gray-900 rounded-xl shadow-lg p-4 text-center">
          <h5 className="font-semibold">Admin</h5>
          <h3 className="text-2xl font-bold">ukmani</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 overflow-x-auto">
        <h4 className="font-semibold mb-3">📦 All Products</h4>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Image</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Highlights</th>
              <th className="border px-2 py-1">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx)=>(
              <tr key={p._id} className="hover:bg-gray-100">
                <td className="border px-2 py-1 text-center">{idx+1}</td>
                <td className="border px-2 py-1 text-center">
                  <img src={p.imageUrl} alt={p.name} className="w-16 h-16 object-cover mx-auto rounded"/>
                </td>
                <td className="border px-2 py-1">{p.name}</td>
                <td className="border px-2 py-1">{Array.isArray(p.productHighlights)?p.productHighlights.join(", "):p.productHighlights}</td>
                <td className="border px-2 py-1 text-green-600 font-semibold">₹{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length===0 && <p className="text-gray-500 text-center mt-2">No products found 😔</p>}
      </div>
    </div>
  );
}
