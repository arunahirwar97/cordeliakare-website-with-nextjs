import LoadingSpinner from "@/components/loading/LoadingComponent";
import DoctorResults from "./ResultComponent";
import { Suspense } from "react";

export default function SurgicalCareResultPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DoctorResults />
    </Suspense>
  );
}
