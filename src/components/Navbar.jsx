"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "../app/context/UserContext";

export default function Navbar() {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = "block py-3 text-lg hover:text-blue-400";

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md text-black" : "bg-transparent text-white"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-14 py-4 md:py-6">
        {/* Logo */}
        <Link
          href="/"
          className={`text-2xl md:text-3xl font-bold ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          Tiles <span className="text-blue-400">Gallery</span>
        </Link>

        {/* DesktopLinks */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-blue-400 text-xl">Home</Link>
          <Link href="/allTiles" className="hover:text-blue-400 text-xl">All Tiles</Link>
          <Link href="/profile" className="hover:text-blue-400 text-xl">My Profile</Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <Link
              href="/login"
              className={`px-6 py-3 rounded-full border transition ${
                scrolled
                  ? "border-black hover:bg-black hover:text-white"
                  : "border-white hover:bg-white hover:text-black"
              }`}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => setUser(null)}
              className={`px-6 py-3 rounded-full border transition ${
                scrolled
                  ? "border-black hover:bg-black hover:text-white"
                  : "border-white hover:bg-white hover:text-black"
              }`}
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
<div
  className={`md:hidden absolute top-full left-0 w-full z-50 transition-all duration-300 ${
    isOpen
      ? "opacity-100 visible translate-y-0"
      : "opacity-0 invisible -translate-y-3"
  } ${scrolled ? "bg-white text-black" : "bg-[#0b1738] text-white"}`}
>
  <div className="px-6 py-5 shadow-lg">
    <Link onClick={() => setIsOpen(false)} href="/" className={linkClass}>
      Home
    </Link>

    <Link onClick={() => setIsOpen(false)} href="/allTiles" className={linkClass}>
      All Tiles
    </Link>

    <Link onClick={() => setIsOpen(false)} href="/profile" className={linkClass}>
      My Profile
    </Link>

    {!user ? (
      <Link
        onClick={() => setIsOpen(false)}
        href="/login"
        className="mt-3 block text-center px-5 py-3 rounded-full bg-blue-500 text-white font-semibold"
      >
        Login
      </Link>
    ) : (
      <button
        onClick={() => {
          setUser(null);
          setIsOpen(false);
        }}
        className="mt-3 w-full px-5 py-3 rounded-full bg-blue-500 text-white font-semibold"
      >
        Logout
      </button>
    )}
  </div>
</div>
    </nav>
  );
}