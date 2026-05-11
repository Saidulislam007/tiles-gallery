
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
      </div>
    </div>
  );
}

