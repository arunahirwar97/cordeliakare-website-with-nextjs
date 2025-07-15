import LoadingSpinner from "@/components/loading/LoadingComponent";
import { Suspense } from "react";
import TermsAndConditions from "./TermsComponent";

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TermsAndConditions />
    </Suspense>
  );
}