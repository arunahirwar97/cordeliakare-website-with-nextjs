import { Suspense } from 'react';
import StatusComponent from './StatusComponent';
import LoadingSpinner from '@/components/loading/LoadingComponent';



export default function StatusPage() {
   

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
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