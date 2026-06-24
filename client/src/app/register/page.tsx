"use client";

import { useState } from "react";
import { api } from "@/lib/api/axios";
import { toast } from "sonner";
import { login } from "@/lib/auth";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
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

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", formData);

      login(response.data.token);

      window.location.href = "/";
    } catch (error) {
      console.error(error);

      toast.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px-120px)] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="hidden md:flex flex-col justify-center bg-blue-600 text-white p-10">
          <h1 className="text-5xl font-bold">Join TripPilot</h1>

          <p className="mt-4 text-blue-100">
            Start planning smarter trips with AI-powered travel assistance.
          </p>

          <div className="mt-10 space-y-4">
            <p>✈️ Personalized Travel Itineraries</p>

            <p>🏨 Smart Hotel Recommendations</p>

            <p>💰 Budget Planning & Estimates</p>

            <p>🧳 Packing Lists & Travel Tips</p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>

          <p className="text-slate-500 mb-8">
            Create your account and start planning your next adventure.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password (minimum 6 characters)"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              minLength={6}
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
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
