import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProfileComponent from "./ProfileComponent";


export default function Page() {
  return (
   <ProtectedRoute>
      <ProfileComponent />
   </ProtectedRoute>
  );
}