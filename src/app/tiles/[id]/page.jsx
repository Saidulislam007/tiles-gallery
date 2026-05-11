
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { getTiles } from "@/lib/getTiles";
import { StarIcon } from "@heroicons/react/24/solid";

export default function TileDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const tileId = params.id;

  const { data: session, isPending } =
    authClient.useSession();

  const user = session?.user;

  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth redirect
  useEffect(() => {
    if (!isPending && !user) {
      toast.error(
        "You must login or register to view tile details",
        { duration: 2000 }
      );

      router.push("/login");
    }
  }, [user, isPending, router]);

  // Fetch tile
  useEffect(() => {
    const fetchTile = async () => {
      setLoading(true);

      try {
        const data = await getTiles();

        const foundTile = data.find(
          (t) => t.id.toString() === tileId
        );

        setTimeout(() => {
          setTile(foundTile || null);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load tile data");
        setLoading(false);
      }
    };

    if (user) fetchTile();
  }, [tileId, user]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg md:text-xl text-black">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!user) return null;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-500"></div>

        <p className="mt-4 text-gray-600">
          Loading tile details...
        </p>
      </div>
    );
  }

  if (!tile) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl md:text-2xl font-semibold text-gray-700">
          Tile not found
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-10 md:py-16 flex flex-col lg:flex-row gap-8 bg-white">

      <Toaster position="top-right" />

      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-5 text-center lg:text-left">
          {tile.title}
        </h1>

        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden shadow-lg border">
          <Image
            src={tile.image}
            alt={tile.title}
            fill
            className="object-cover hover:scale-105 transition duration-500"
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 bg-white shadow-xl border rounded-2xl p-5 sm:p-6 md:p-8">

        {/* Price + Stock */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
          <p className="text-lg md:text-xl font-semibold text-green-600">
            {tile.price ? `$${tile.price}` : "Price Not Available"}
          </p>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
              tile.inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {tile.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm md:text-base">
          <div><b>Category:</b> {tile.category}</div>
          <div><b>Material:</b> {tile.material}</div>
          <div><b>Dimensions:</b> {tile.dimensions}</div>
        </div>

        {/* Rating */}
        {tile.rating && (
          <div className="flex items-center mt-5">
            <span className="font-semibold text-black mr-2">Rating:</span>

            <div className="flex">
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
            </div>

            <span className="ml-2 text-gray-600">
              {tile.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Features */}
        {tile.features && (
          <div className="mt-5">
            <h3 className="font-semibold text-black mb-2">
              Features:
            </h3>

            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {tile.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Description */}
        <div className="mt-5">
          <h3 className="font-semibold text-black mb-2">
            Description:
          </h3>

          <p className="text-gray-700 leading-7 text-sm md:text-base">
            {tile.description}
          </p>
        </div>

      </div>
    </div>
  );
}

