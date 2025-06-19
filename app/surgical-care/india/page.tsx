import { Suspense } from "react";
import SurgicalCareForm from "../search/SurgicalCareForm";
import LoadingSpinner from "@/components/loading/LoadingComponent";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SurgicalCareIndiaPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<LoadingSpinner />}>
        <SurgicalCareForm />
      </Suspense>
    </ProtectedRoute>
  );
}

export const metadata = {
  title: "India Surgical Care | CordeliaKare",
  description:
    "Find the best India surgical care options tailored to your needs.",
  openGraph: {
    title: "India Surgical Care | CordeliaKare",
    description:
      "Find the best India surgical care options tailored to your needs.",
  },
};
