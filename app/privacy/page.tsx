import LoadingSpinner from "@/components/loading/LoadingComponent";
import { Suspense } from "react";
import PrivacyPolicy from "./PrivacyComponent";


export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PrivacyPolicy />
    </Suspense>
  );
}
