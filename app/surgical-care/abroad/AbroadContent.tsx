// // app/surgical-care/abroad/AbroadContent.tsx
// "use client";

// import { useState } from 'react';
// import SurgicalCareForm from '../SurgicalCareForm';
// import PretextInfo from './PretextInfo';

// export default function AbroadContent() {
//   const [showPretext, setShowPretext] = useState(true);

//   return (
//     <>
//       {showPretext ? (
//         <PretextInfo onContinue={() => setShowPretext(false)} />
//       ) : (
//         <SurgicalCareForm defaultLocation="Abroad" showLocationToggle={false} />
//       )}
//     </>
//   );
// }