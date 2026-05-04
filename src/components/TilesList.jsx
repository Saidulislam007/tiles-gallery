"use client";

import { useEffect, useState } from "react";
import TileCard from "./TileCard";
import { getTiles } from "../lib/getTiles";

export default function TilesList() {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    const fetchTiles = async () => {
      const data = await getTiles();
      setTiles(data);
    };

    fetchTiles();
  }, []);

  return (
    <div className="mt-[-300]">
      <section className="px-6 py-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Tiles Gallery</h2>

      {/* 🔥 Masonry Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {tiles.map((tile) => (
          <div key={tile.id} className="break-inside-avoid">
            <TileCard tile={tile} />
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}