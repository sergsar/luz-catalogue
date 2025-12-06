"use client";

import { useRouter } from "next/navigation";
import { useUserfront } from "@userfront/next/client";
import { ReactNode, useEffect } from "react";

export default function SecureLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useUserfront();

  useEffect(() => {
    if (isAuthenticated || isLoading || !router) return;
    router.push("/login");
  }, [isAuthenticated, isLoading, router]);

  if (!isAuthenticated || isLoading) {
    return null;
  }

  return children;
}
