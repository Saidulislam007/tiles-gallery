import Link from "next/link";
import { getTiles } from "@/lib/getTiles";
import TileCard from "@/components/TileCard";
import Banner from "@/components/Banner";
import AboutTiles from "@/components/AboutTiles";
import CustomerReviews from "@/components/CustomerReviews";

export default async function Home() {
  const tiles = await getTiles();

  // Top 4 featured tiles
  const featuredTiles = tiles.slice(0, 11);

  return (
    <div className="space-y-10  bg-white">

      <Banner />

      {/* 🔥 Marquee Section */}
      <div className="space-y-10  bg-black text-white mt-[-40px] ">
        <marquee behavior="scroll" direction="left" scrollamount="5">
  New Arrivals: Marble White Tile | 
  Weekly Feature: Modern Geometric Patterns | 
  Join the Community...
</marquee>
      </div>

      <main className="min-h-screen bg-white">
        {/* About Tiles Corner Section */}
        <AboutTiles />
      </main>

      {/* ⭐ Featured Tiles Section */}
      <section className="max-w-7xl pb-10 mt-[-90px] mx-auto">
        <h2 className="text-5xl text-center text-black font-bold mb-4">The <span className="text-blue-400">Gallery</span></h2>
        <p className="text-gray-600 text-center text-lg mb-18">
          Explore our curated collection of exquisite tiles and ceramics, showcasing <br></br> the best of design and craftsmanship in Bangladesh.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-20 lg:grid-cols-4 gap-5">
          {featuredTiles.map((tile) => (
            <TileCard key={tile.id} tile={tile} />
          ))}
        </div>
      </section>

      <main className="bg-gray-50">
        <CustomerReviews />
      </main>



    </div>
  );
}