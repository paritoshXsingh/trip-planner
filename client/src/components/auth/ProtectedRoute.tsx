"use client";

import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  if (typeof window !== "undefined" && !isAuthenticated()) {
    router.replace("/login");

    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Redirecting...
      </div>
    );
  }

  return <>{children}</>;
}
