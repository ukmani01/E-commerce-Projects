import { useContext } from "react";
import { CartContext } from "../CartProvider";

export default function Card() {
  const { cart, setCart } = useContext(CartContext);

  const remove = (id) => {
    setCart(cart.filter((p) => p._id !== id));
  };

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">

      <h2 className="text-3xl font-bold text-center mb-10">
         Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <div className="text-6xl mb-4">😔</div>
          <p className="text-gray-500 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="max-w-4xl mx-auto space-y-4">
            {cart.map((p) => (
              <div
                key={p._id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-4 hover:shadow-2xl transition"
              >
                {/* Image */}
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-green-600 font-bold text-xl">₹{p.price}</p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => remove(p._id)}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                >
                   Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="max-w-4xl mx-auto mt-10 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-semibold">
              Total Items: {cart.length}
            </h3>
            <h3 className="text-2xl font-bold text-green-600">
              Total: ₹{total}
            </h3>

            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 transition">
               Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
