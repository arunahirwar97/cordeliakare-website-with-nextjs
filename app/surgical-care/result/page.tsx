import LoadingSpinner from "@/components/loading/LoadingComponent";
import DoctorResults from "./ResultComponent";
import { Suspense } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SurgicalCareResultPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<LoadingSpinner />}>
        <DoctorResults />
      </Suspense>
    </ProtectedRoute>
  );
}
