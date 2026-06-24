"use client";

import { useSyncExternalStore } from "react";
import { isAuthenticated } from "@/lib/auth";

export function useAuth() {
  return useSyncExternalStore(
    () => () => {},
    () => isAuthenticated(),
    () => false,
  );
}
