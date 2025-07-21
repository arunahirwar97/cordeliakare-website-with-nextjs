// app/(auth)/login/page.tsx
import { Suspense } from "react";
import LoginForm from "./LoginForm";
import LoadingSpinner from "@/components/loading/LoadingComponent";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginForm />
    </Suspense>
  );
}
