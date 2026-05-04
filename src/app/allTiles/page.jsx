"use client";
import React, { useEffect, useState } from "react";
import TileCard from "@/components/TileCard";
import { getTiles } from "@/lib/getTiles"; // path adjust

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTiles();
      setTiles(data);
    };
    fetchData();
  }, []);

  return (
    <div className="px-6 md:px-16 py-20 bg-white ">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        All Tiles
      </h2>
      <p className="text-gray-500 text-center">
        Explore our curated collection of exquisite tiles and ceramics, showcasing
the best of design and craftsmanship in Bangladesh.<br></br> Each piece is a testament to our commitment to quality and style, perfect for transforming your spaces with elegance and durability.<br></br> Browse through our diverse range of tiles, from classic to contemporary, and find the perfect match for your next project.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tiles.map((tile) => (
          <TileCard key={tile.id} tile={tile} />
        ))}
      </div>
    </div>
  );
}