import LoadingSpinner from "@/components/loading/LoadingComponent";
import { Suspense } from "react";
import PlatformComponent from "./PlatformComponent";

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PlatformComponent />
    </Suspense>
  );
}
