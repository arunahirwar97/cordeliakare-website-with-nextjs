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
  const { isAuthenticated, loading, otpSent } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated && !otpSent) {
      router.push("/");
    }
  }, [isAuthenticated, loading, otpSent, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Only show children if not authenticated OR during OTP flow
  return !isAuthenticated || otpSent ? <>{children}</> : null;
}