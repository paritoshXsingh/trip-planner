"use client";

import Link from "next/link";
import { Plane, Menu, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

import LogoutDialog from "./LogoutDialog";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Plane className="h-5 w-5 text-blue-600" />

            <span>TripPilot</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium hover:text-blue-600 transition"
            >
              Home
            </Link>

            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-blue-600 transition"
              >
                Dashboard
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={() => setShowLogout(true)}
                className="
                  flex items-center gap-2
                  px-4 py-2
                  rounded-lg border
                  hover:bg-red-50
                  hover:border-red-200
                  transition
                "
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="
                    px-4 py-2
                    rounded-lg border
                    hover:bg-slate-50
                    transition
                  "
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="
                    px-4 py-2
                    rounded-lg
                    bg-blue-600
                    text-white
                    hover:bg-blue-700
                    transition
                  "
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="
      md:hidden
      border-b
      bg-white
      shadow-sm
    "
        >
          <div className="flex flex-col p-4 gap-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2"
            >
              Home
            </Link>

            {isLoggedIn && (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2"
              >
                Dashboard
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowLogout(true);
                }}
                className="
            text-left
            py-2
            text-red-600
          "
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
              py-2
              text-blue-600
              font-medium
            "
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <LogoutDialog open={showLogout} onClose={() => setShowLogout(false)} />
    </>
  );
}
