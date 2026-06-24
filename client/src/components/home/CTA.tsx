"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function CTA() {
  const isLoggedIn = useAuth();

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
          <h2 className="text-5xl font-bold text-slate-900">
            Ready For Your Next Adventure?
          </h2>

          <p className="mt-4 text-slate-600">
            Generate itineraries, hotels, budgets and packing lists in seconds.
          </p>

          <Link
            href={isLoggedIn ? "/dashboard" : "/register"}
            className="inline-block mt-8 px-8 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {isLoggedIn ? "Open Dashboard" : "Start Planning Now"}
          </Link>
        </div>
      </div>
    </section>
  );
}
