"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token);
  }, []);

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <Image
        src="/hero-travel.avif"
        alt="Travel"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Plan Smarter.
            <br />
            Travel Better.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/90">
            Generate AI itineraries, hotel suggestions, budget plans and packing
            lists in seconds.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href={isLoggedIn ? "/dashboard" : "/register"}
              className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {isLoggedIn ? "Open Dashboard" : "Get Started"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
