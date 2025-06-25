// app/surgical-care/abroad/page.tsx

import { Suspense } from "react";
import SurgicalCareForm from "./SurgicalCareForm";
import LoadingSpinner from "@/components/loading/LoadingComponent";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SurgicalCareSearchPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<LoadingSpinner />}>
        <SurgicalCareForm />
      </Suspense>
    </ProtectedRoute>
  );
}

export const metadata = {
  title: "International Surgical Care | CordeliaKare",
  description:
    "Find the best international surgical care options tailored to your needs.",
  openGraph: {
    title: "International Surgical Care | CordeliaKare",
    description:
      "Find the best international surgical care options tailored to your needs.",
  },
};
