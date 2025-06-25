import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BookingComponent from "./BookingComponent";

export default function BookingPage() {
  return (
    <ProtectedRoute>
      <BookingComponent />
    </ProtectedRoute>
  );
}
