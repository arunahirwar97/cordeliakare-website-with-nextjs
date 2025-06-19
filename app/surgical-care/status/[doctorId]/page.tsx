import { Suspense } from 'react';
import StatusComponent from './StatusComponent';



export default function StatusPage() {
   

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      }>
        <StatusComponent />
      </Suspense>
    </div>
  );
}


export async function generateMetadata({ params }: StatusPageProps) {
  return {
    title: `Surgery Booking Status - ${params.bookingId}`,
    description: 'Check your surgery booking status and details',
  };
}