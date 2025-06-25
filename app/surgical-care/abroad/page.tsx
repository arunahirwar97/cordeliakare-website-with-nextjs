// app/surgical-care/abroad/page.tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PretextInfo from "./PretextInfo";

export default function SurgicalCareAbroadPage() {
  return (
    <ProtectedRoute>
      <PretextInfo />
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
