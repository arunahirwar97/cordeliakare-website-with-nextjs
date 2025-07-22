// components/PublicRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import LoadingSpinner from "../loading/LoadingComponent";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && token) {
      router.push("/");
    }
  }, [loading, router, token]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return !token ? <>{children}</> : null;
}
