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

  // Better Auth Session
  const { data: session, isPending } =
    authClient.useSession();

  const user = session?.user;

  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !user) {
      toast.error(
        "You must login or register to view tile details",
        {
          duration: 3000,
        }
      );

      router.push("/login");
    }
  }, [user, isPending, router]);

  // Fetch tile data
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
        }, 1200);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load tile data");
        setLoading(false);
      }
    };

    if (user) {
      fetchTile();
    }
  }, [tileId, user]);

  // Session Loading
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-xl text-black font-medium">
          Checking authentication...
        </p>
      </div>
    );
  }

  // Prevent render before redirect
  if (!user) return null;

  // Tile Loading
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>

        <p className="mt-4 text-lg text-gray-700">
          Loading tile details...
        </p>
      </div>
    );
  }

  // Tile Not Found
  if (!tile) {
    return (
      <div className="flex items-center justify-center h-[70vh] bg-white">
        <p className="text-2xl text-gray-700 font-semibold">
          Tile not found
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 gap-7 flex flex-col md:flex-row bg-white py-16 items-start animate-fadeIn">
      <Toaster position="top-right" />

      {/* Left */}
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-4xl text-black font-bold mb-6 text-center md:text-left">
          {tile.title}
        </h1>

        <div className="w-full md:w-[650px] relative h-[400px] md:h-[650px] mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
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
        {/* Price + Stock */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold text-green-600">
            {tile.price
              ? `$${tile.price}`
              : "Price Not Available"}
          </p>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              tile.inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {tile.inStock
              ? "In Stock"
              : "Out of Stock"}
          </span>
        </div>

        {/* Tile Info */}
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-gray-700">
          <div>
            <span className="font-semibold">
              Category:
            </span>{" "}
            {tile.category}
          </div>

          <div>
            <span className="font-semibold">
              Material:
            </span>{" "}
            {tile.material}
          </div>

          <div>
            <span className="font-semibold">
              Dimensions:
            </span>{" "}
            {tile.dimensions}
          </div>
        </div>

        {/* Rating */}
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

        {/* Features */}
        {tile.features && (
          <div className="mb-4">
            <span className="font-semibold text-black">
              Features:
            </span>

            <ul className="list-disc list-inside mt-1 text-gray-700">
              {tile.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Description */}
        <div className="text-gray-700">
          <span className="font-semibold">
            Description:
          </span>

          <p className="mt-1 leading-7">
            {tile.description}
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}