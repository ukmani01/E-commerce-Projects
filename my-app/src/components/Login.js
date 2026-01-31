import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) return alert("Enter username and password");
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", { username, password });
      if (res.data?.token) {
        localStorage.setItem("adminToken", res.data.token);
        alert("Login successful!");
        navigate("/admin/dashboard");
      } else alert("Token missing in response");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}
          className="w-full p-3 mb-3 border rounded focus:ring-2 focus:ring-blue-400"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
          className="w-full p-3 mb-3 border rounded focus:ring-2 focus:ring-blue-400"/>
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
          Login
        </button>
      </div>
    </div>
  );
}
