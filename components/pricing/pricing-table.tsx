// // components/pricing/pricing-table.tsx
// 'use client';

// import { useTransition } from 'react';
// import { useRouter } from 'next/navigation';
// import { updateRPM } from '@/actions/pricing';
// import { EQUIPMENT_TYPES, MARKETS } from '@/lib/constants/pricing';

// interface PricingTableProps {
//   matrix: Record<string, Record<string, { id: string; rpm: number }>>;
// }

// export default function PricingTable({ matrix }: PricingTableProps) {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const handleChange = (id: string, value: string) => {
//     const rpm = parseFloat(value);
//     if (isNaN(rpm)) return;

//     startTransition(async () => {
//       await updateRPM(id, rpm);
//       router.refresh();
//     });
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="bg-gray-50">
//             <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
//               Equipment / Market
//             </th>
//             {MARKETS.map((m) => (
//               <th key={m} className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[100px]">
//                 {m}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {EQUIPMENT_TYPES.map((eq) => (
//             <tr key={eq} className="hover:bg-gray-50">
//               <td className="px-4 py-3 font-semibold text-gray-900 sticky left-0 bg-white">
//                 {eq}
//               </td>
//               {MARKETS.map((m) => {
//                 const entry = matrix[eq]?.[m];
//                 return (
//                   <td key={m} className="px-4 py-3 text-right">
//                     {entry?.id ? (
//                       <input
//                         type="number"
//                         step="0.01"
//                         defaultValue={entry.rpm.toFixed(2)}
//                         onBlur={(e) => handleChange(entry.id, e.target.value)}
//                         disabled={isPending}
//                         className="w-20 text-right rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                       />
//                     ) : (
//                       <span className="text-gray-400">—</span>
//                     )}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// components/pricing/pricing-table.tsx
'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateRPM } from '@/actions/pricing';
import { EQUIPMENT_TYPES, MARKETS } from '@/lib/constants/pricing';

interface PricingTableProps {
  matrix: Record<string, Record<string, { id: string; rpm: number }>>;
}

export default function PricingTable({ matrix }: PricingTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (id: string, value: string) => {
    const rpm = parseFloat(value);
    if (isNaN(rpm)) return;

    startTransition(async () => {
      await updateRPM(id, rpm);
      router.refresh();
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="table-scroll-wrap">
        <table className="data-table w-full">
          <thead>
            <tr className="bg-slate-900">
              <th className="sticky-col px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Equipment / Market
              </th>
              {MARKETS.map((m) => (
                <th key={m} className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider min-w-[100px]">
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {EQUIPMENT_TYPES.map((eq) => (
              <tr key={eq} className="hover:bg-slate-50 transition-colors">
                <td className="sticky-col px-4 py-3 font-semibold text-gray-900">
                  {eq}
                </td>
                {MARKETS.map((m) => {
                  const entry = matrix[eq]?.[m];
                  return (
                    <td key={m} className="px-4 py-3 text-right">
                      {entry?.id ? (
                        <input
                          type="number"
                          step="0.01"
                          defaultValue={entry.rpm.toFixed(2)}
                          onBlur={(e) => handleChange(entry.id, e.target.value)}
                          disabled={isPending}
                          className="w-20 text-right rounded-md border border-gray-300 px-2 py-1 text-sm font-semibold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
                        />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPending && (
        <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-100 text-xs font-medium text-emerald-700">
          Saving…
        </div>
      )}
    </div>
  );
}