import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppointmentsComponent from "./AppointmentComponent";

export default function Page() {
  return (
   <ProtectedRoute>
      <AppointmentsComponent />
   </ProtectedRoute>
  );
}