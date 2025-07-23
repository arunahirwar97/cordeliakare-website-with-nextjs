import LoadingSpinner from "@/components/loading/LoadingComponent";
import MedicalTourismPage from "./MedicalTourismPage";
import { Suspense } from "react";
import MedicalTourismPage1 from "./MedicalTourismPage1";

export default function MedicalTourism() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MedicalTourismPage />
      {/* <MedicalTourismPage1 /> */}
    </Suspense>
  );
}
