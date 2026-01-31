export default function About() {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-4">About 🛍️ MyShop</h1>
      <p className="text-gray-700 mb-6">
        We are passionate about delivering the best shopping experience 🚀.
        From electronics to fashion, we bring everything to your doorstep 💯.
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">👨‍💻 Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-4">Mani – Fullstack Dev</div>
          <div className="bg-white rounded-xl shadow-lg p-4">Sara – UI/UX Designer</div>
          <div className="bg-white rounded-xl shadow-lg p-4">John – Backend Engineer</div>
        </div>
      </div>
    </div>
  );
}
