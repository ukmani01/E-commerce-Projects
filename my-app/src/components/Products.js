import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../src/CartProvider";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  const { cart, setCart } = useContext(CartContext);

  // Fetch products
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        setProducts(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  // Search + sort
  useEffect(() => {
    let data = [...products];
    const q = search.toLowerCase();

    data = data.filter(p => p.name.toLowerCase().includes(q));

    if (sort === "low") data.sort((a, b) => a.price - b.price);
    if (sort === "high") data.sort((a, b) => b.price - a.price);
    if (sort === "name") data.sort((a, b) => a.name.localeCompare(b.name));

    setFiltered(data);
  }, [search, sort, products]);

  const addCart = (p) => {
    if (!cart.find(item => item._id === p._id)) {
      setCart([...cart, p]);
    }
  };

  const deleteCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="🔍 Search modern products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-white/70 backdrop-blur border focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="px-4 py-3 rounded-xl bg-white/70 backdrop-blur border"
        >
          <option value="">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="name">Name A → Z</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Skeleton Loading */}
        {loading && [...Array(8)].map((_, i) => (
          <div key={i} className="h-80 rounded-2xl bg-white/40 animate-pulse" />
        ))}

        {!loading && filtered.map(p => (
          <div
            key={p._id}
            className="group relative bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >

            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={p.imageUrl}
                alt={p.name}
                className="h-48 w-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-lg line-clamp-1">{p.name}</h3>

              {/* Rating UI */}
              <div className="text-yellow-500 text-sm">★★★★★</div>

              <span className="text-xl font-bold text-green-600">₹{p.price}</span>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1">
                {p.productHighlights?.slice(0, 3).map((h, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-gray-200"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="p-4 pt-0">
              {cart.find(item => item._id === p._id) ? (
                <button
                  onClick={() => deleteCart(p._id)}
                  className="w-full py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                >
                   Remove
                </button>
              ) : (
                <button
                  onClick={() => addCart(p)}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-[1.02] transition"
                >
                  🛒 Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
