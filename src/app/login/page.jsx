
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const response =
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
          rememberMe: true,
          callbackURL: "/",
        });

      if (response.error) {
        alert(
          "Error: " + response.error.message
        );

        setLoading(false);

        return;
      }

      router.push("/");
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  };

  // Loading Spinner
  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Login to continue your journey
          </p>
        </div>

        {/* Form */}
        <Form
          className="flex flex-col gap-5"
          onSubmit={onSubmit}
        >

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  value
                )
              ) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label className="text-gray-700 text-sm">
              Email
            </Label>

            <Input
              placeholder="john@example.com"
              className="border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 rounded-lg"
            />

            <FieldError className="text-red-500 text-xs" />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label className="text-gray-700 text-sm">
              Password
            </Label>

            <Input
              placeholder="Enter your password"
              className="border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 rounded-lg"
            />

            <Description className="text-gray-500 text-xs">
              Must be at least 8 characters with
              1 uppercase and 1 number
            </Description>

            <FieldError className="text-red-500 text-xs" />
          </TextField>

          {/* Buttons */}
          <div className="flex gap-3 mt-2 w-full">
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 rounded-lg transition"
            >
              Login
            </Button>

            <Button
              type="reset"
              variant="secondary"
              className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              Reset
            </Button>
          </div>
        </Form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Don’t have an account?{" "}

          <span
            onClick={() =>
              router.push("/register")
            }
            className="text-gray-700 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
        <Button
          type="button"
          onClick={async () => {
            try {
              await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              });
            } catch (error) {
              console.error(error);
            }
          }}
          className="w-full bg-white text-black hover:bg-gray-200 rounded-lg transition mt-3 flex items-center justify-center gap-2"
        >
          {/* Google Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20"
            height="20"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-4z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 16.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.6 8.1 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.3 35.2 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8.1l-6.6 5.1C9.4 39.9 16.2 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.4 5.4-6.3 6.8l6.3 5.2C40.4 37.1 44 31.1 44 24c0-1.3-.1-2.7-.4-3.5z"
            />
          </svg>

          Continue with Google
        </Button>
      </div>
    </div>
  );
}

