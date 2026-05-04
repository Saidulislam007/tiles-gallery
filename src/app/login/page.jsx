"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "../context/UserContext";

export default function LoginPage() {
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (email === "user@test.com" && password === "123456") {
      toast.success("Login Successful");

      setUser({
        name: "Demo User",
        email: email,
        photo: "https://via.placeholder.com/150",
      });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center w-full bg-white min-h-screen px-4">
      <Toaster position="top-right" />

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Login
        </button>

        <p className="text-center text-gray-500 text-sm">
          Do not have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}