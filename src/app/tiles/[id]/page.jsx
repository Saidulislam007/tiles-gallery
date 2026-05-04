"use client";
import { useUser } from "../../context/UserContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { getTiles } from "@/lib/getTiles";
import { StarIcon } from "@heroicons/react/24/solid";

export default function TileDetailsPage() {
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();
  const tileId = params.id;

  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toast if not logged in
  useEffect(() => {
    if (!user) {
      toast.error("You must login or register to view tile details", {
        duration: 3000,
      });
    }
  }, [user]);

  // Fetch tile data
  useEffect(() => {
    const fetchTile = async () => {
      setLoading(true);
      try {
        const data = await getTiles();
        const foundTile = data.find((t) => t.id.toString() === tileId);

        setTimeout(() => {
          setTile(foundTile || null);
          setLoading(false);
        }, 1800);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load tile data");
        setLoading(false);
      }
    };

    fetchTile();
  }, [tileId]);

  /* 🔥 FIXED PART START */
  if (!user) {
    return (
      <div className="flex flex-col items-center bg-white justify-center h-[70vh] text-center px-4">
        

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Access Denied 🔒
        </h2>

        <p className="text-gray-600 mb-6">
          You must login or register to view tile details.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/register")}
            className=" px-6 py-2 rounded-lg text-black hover:bg-gray-400 transition"
          >
            Register
          </button>
        </div>
      </div>
    );
  }
  /* 🔥 FIXED PART END */

  // Loader
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-lg text-gray-700">
          Loading tile details...
        </p>
      </div>
    );
  }

  if (!tile)
    return (
      <p className="text-center mt-20 text-gray-600">Tile not found</p>
    );

  return (
    <div className="px-6 md:px-16 gap-7 flex flex-col md:flex-row bg-white py-16 items-start animate-fadeIn">
      <Toaster position="top-right" />

      {/* Left */}
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-4xl text-black font-bold mb-6 text-center md:text-left">
          {tile.title}
        </h1>

        <div className="w-[650px] max-w-6xl relative h-[650px] mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <Image
            src={tile.image}
            alt={tile.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Right */}
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-6 border border-gray-100 md:mt-0 mt-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold text-green-600">
            {tile.price ? `$${tile.price}` : "Price Not Available"}
          </p>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              tile.inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {tile.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-gray-700">
          <div>
            <span className="font-semibold">Category:</span>{" "}
            {tile.category}
          </div>
          <div>
            <span className="font-semibold">Material:</span>{" "}
            {tile.material}
          </div>
          <div>
            <span className="font-semibold">Dimensions:</span>{" "}
            {tile.dimensions}
          </div>
        </div>

        {tile.rating && (
          <div className="flex items-center mb-4">
            <span className="font-semibold text-black mr-2">
              Rating:
            </span>

            <div className="flex space-x-1">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(tile.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">
                {tile.rating.toFixed(1)}
              </span>
            </div>
          </div>
        )}

        {tile.features && (
          <div className="mb-4">
            <span className="font-semibold text-black">
              Features:
            </span>
            <ul className="list-disc list-inside mt-1 text-gray-700">
              {tile.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-gray-700">
          <span className="font-semibold">Description:</span>
          <p className="mt-1">{tile.description}</p>
        </div>
      </div>
    </div>
  );
}