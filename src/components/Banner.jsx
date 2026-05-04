

export default function Banner() {
  return (
    <div className="relative w-full h-[780px] mt-[-90px] bg-gray-200 overflow-hidden"
      style={{
        backgroundImage: "url('/banner.png')",
        backgroundSize: "cover",
      }}>
      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Tiles Corner</h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Quality Tiles & Ceramics
        </h2>
        <p className="max-w-xl mb-8 text-lg md:text-xl">
          Explore our extensive collection of exquisite tiles and ceramics for every design need in Bangladesh.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="bg-transparent border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
            Discover
          </button>
          <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition">
            Shop
          </button>
        </div>
      </div>
    </div>
  );
}