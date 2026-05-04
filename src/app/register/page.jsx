"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "../context/UserContext";

export default function RegisterPage() {
  const { setUser } = useUser(); // global user state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all required fields");
      return;
    }

    // Save user globally
    setUser({
      name,
      email,
      photo: photo || "https://via.placeholder.com/150",
      password,
    });

    toast.success("Welcome! Your account has been created successfully.", { duration: 2000 });

    // Redirect to home page after toast
    setTimeout(() => {
      router.push("/"); // Navigate to home page
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          User Registration
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-black px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-black px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Photo URL (optional)"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="w-full text-black px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-black px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
}