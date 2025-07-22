// components/PublicRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import LoadingSpinner from "../loading/LoadingComponent";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();
  const router = useRouter();

  const [token, setToken] = useState(localStorage.getItem('token'))
  console.log(token)
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return !token ? <>{children}</> : null;
}
