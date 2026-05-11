"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-100 px-4">
      <div className="text-center max-w-xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-5 rounded-full shadow-lg">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-7xl md:text-8xl font-extrabold text-gray-800 mb-4">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-lg leading-7 mb-8">
          The page you are looking for does not exist or may
          have been moved. Please check the URL or return
          to the homepage.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}