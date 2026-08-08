// import { getLoads } from '@/actions/loads';
// import LoadCard from '@/components/load-board/load-card';

// export default async function LoadBoardPage() {
//   const loads = await getLoads();
//   // Carriers see all loads that are NOT already booked/delivered/rejected
//   const available = loads.filter((l) => 
//     ['pending', 'approved', 'bidding'].includes(l.status)
//   );

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Load Board</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {available.map((load) => (
//           <LoadCard key={load.id} load={load} />
//         ))}
//         {available.length === 0 && (
//           <div className="col-span-full text-center py-16 text-gray-500">
//             <p className="text-lg font-medium">No available loads right now</p>
//             <p className="text-sm mt-1">Check back later for new freight opportunities.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { getLoads } from '@/actions/loads';
import LoadBoardClient from '@/components/load-board/load-board-client';

export default async function LoadBoardPage() {
  const loads = await getLoads();
  const available = loads.filter((l) =>
    ['pending', 'approved', 'bidding'].includes(l.status)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Load Board</h1>
      <LoadBoardClient loads={available} />
    </div>
  );
}