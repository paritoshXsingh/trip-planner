"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api/axios";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      window.location.href = "/";
    } catch (error) {
      console.error(error);

      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px-120px)] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="hidden md:flex flex-col justify-center bg-blue-600 text-white p-10">
          <h1 className="text-5xl font-bold">Welcome Back</h1>

          <p className="mt-4 text-blue-100">
            Continue planning your next adventure with AI.
          </p>

          <div className="mt-10 space-y-4">
            <p>✈️ AI Powered Travel Plans</p>
            <p>🏨 Smart Hotel Suggestions</p>
            <p>💰 Budget Estimation</p>
            <p>🧳 Packing Recommendations</p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2">Login</h2>

          <p className="text-slate-500 mb-8">
            Access your personalized travel dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            />

            <input
              type="password"
              name="password"
              minLength={6}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              bg-blue-600
              text-white
              rounded-xl
              py-3
              hover:bg-blue-700
              transition
            "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
