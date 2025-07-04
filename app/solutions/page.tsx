import LoadingSpinner from "@/components/loading/LoadingComponent";
import AudiencePage from "./SolutionsComponent";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AudiencePage />
    </Suspense>
  );
}
