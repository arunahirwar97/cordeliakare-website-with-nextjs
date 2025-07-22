// app/(auth)/login/page.tsx
import { Suspense } from "react";
import LoginForm from "./LoginForm";
import LoadingSpinner from "@/components/loading/LoadingComponent";
import PublicRoute from "@/components/auth/PublicRoute";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PublicRoute>
        <LoginForm />
      </PublicRoute>
    </Suspense>
  );
}
