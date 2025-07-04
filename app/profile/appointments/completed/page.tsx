import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CompletedAppointmentsPage from "./CompletedAppointments";

export default function Page() {
  return (
    <ProtectedRoute>
      <CompletedAppointmentsPage />
    </ProtectedRoute>
  );
}
