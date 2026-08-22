// import Link from 'next/link';
// import { getCarriers } from '@/actions/carriers';
// import CarrierActions from '@/components/carriers/carrier-actions';

// const STATUS_STYLES: Record<string, string> = {
//   active: 'bg-green-50 text-green-700 border-green-200',
//   pending: 'bg-gray-50 text-gray-600 border-gray-200',
//   suspended: 'bg-red-50 text-red-700 border-red-200',
// };

// export default async function CarriersPage() {
//   const carriers = await getCarriers();

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Carriers</h1>
//         <Link
//           href="/carriers/new"
//           className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
//         >
//           + Add Carrier
//         </Link>
//       </div>

//       {carriers.length === 0 ? (
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center text-gray-500 text-sm">
//           No carriers yet. Add your first one.
//         </div>
//       ) : (
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                 <th className="px-4 py-3">Company</th>
//                 <th className="px-4 py-3">MC #</th>
//                 <th className="px-4 py-3">DOT #</th>
//                 <th className="px-4 py-3">Insurance</th>
//                 <th className="px-4 py-3">Safety</th>
//                 <th className="px-4 py-3">Equipment</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {carriers.map((c: any) => (
//                 <tr key={c.id} className="border-b border-gray-100 last:border-0 align-top">
//                   <td className="px-4 py-3 font-medium">
//   <Link 
//     href={`/carriers/${c.id}`} 
//     className="text-gray-900 hover:text-gray-700 hover:underline"
//   >
//     {c.company_name}
//   </Link>
// </td>
//                   <td className="px-4 py-3 text-gray-600">{c.mc_number || '—'}</td>
//                   <td className="px-4 py-3 text-gray-600">{c.dot_number || '—'}</td>
//                   <td className="px-4 py-3 text-gray-600 capitalize">{c.insurance_status || '—'}</td>
//                   <td className="px-4 py-3 text-gray-600">{c.safety_rating || '—'}</td>
//                   <td className="px-4 py-3 text-gray-600">
//                     {(c.equipment_types || []).join(', ') || '—'}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`text-xs font-semibold rounded-md px-2 py-1 border capitalize ${
//                         STATUS_STYLES[c.status] || STATUS_STYLES.pending
//                       }`}
//                     >
//                       {c.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <CarrierActions carrierId={c.id} status={c.status} />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
// import Link from 'next/link';
// import { getCarriers } from '@/actions/carriers';
// import CarrierActions from '@/components/carriers/carrier-actions';

// const STATUS_STYLES: Record<string, string> = {
//   active: 'bg-green-50 text-green-700 border-green-200',
//   pending: 'bg-gray-50 text-gray-600 border-gray-200',
//   suspended: 'bg-red-50 text-red-700 border-red-200',
// };

// const STATUS_ACCENT: Record<string, string> = {
//   active: 'border-l-emerald-500',
//   pending: 'border-l-gray-300',
//   suspended: 'border-l-red-500',
// };

// export default async function CarriersPage() {
//   const carriers = await getCarriers();

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Carriers</h1>
//         <Link
//           href="/carriers/new"
//           className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
//         >
//           + Add Carrier
//         </Link>
//       </div>

//       {carriers.length === 0 ? (
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center text-gray-500 text-sm">
//           No carriers yet. Add your first one.
//         </div>
//       ) : (
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//           <div className="table-scroll-wrap">
//             <table className="data-table w-full">
//               <thead>
//                 <tr className="bg-slate-900">
//                   <th className="sticky-col px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Company</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">MC #</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">DOT #</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Insurance</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Safety</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Equipment</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
//                   <th className="sticky-actions px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {carriers.map((c: any) => (
//                   <tr key={c.id} className={`group hover:bg-slate-50 border-l-4 ${STATUS_ACCENT[c.status] || STATUS_ACCENT.pending} transition-colors align-top`}>
//                     <td className="sticky-col px-4 py-3 font-medium">
//                       <Link
//                         href={`/carriers/${c.id}`}
//                         className="text-gray-900 hover:text-gray-700 hover:underline"
//                       >
//                         {c.company_name}
//                       </Link>
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">{c.mc_number || '—'}</td>
//                     <td className="px-4 py-3 text-gray-600">{c.dot_number || '—'}</td>
//                     <td className="px-4 py-3 text-gray-600 capitalize">{c.insurance_status || '—'}</td>
//                     <td className="px-4 py-3 text-gray-600">{c.safety_rating || '—'}</td>
//                     <td className="px-4 py-3 text-gray-600">
//                       {(c.equipment_types || []).join(', ') || '—'}
//                     </td>
//                     <td className="px-4 py-3">
//                       <span
//                         className={`text-xs font-semibold rounded-md px-2 py-1 border capitalize ${
//                           STATUS_STYLES[c.status] || STATUS_STYLES.pending
//                         }`}
//                       >
//                         {c.status}
//                       </span>
//                     </td>
//                     <td className="sticky-actions px-4 py-3">
//                       <div className="flex items-center gap-1">
//                         <Link
//                           href={`/carriers/${c.id}`}
//                           className="row-action-btn"
//                           aria-label={`View ${c.company_name}`}
//                           title="View details"
//                         >
//                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
//                             <circle cx="12" cy="12" r="3" />
//                           </svg>
//                         </Link>
//                         <CarrierActions carrierId={c.id} status={c.status} />
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import Link from 'next/link';
import { getCarriers } from '@/actions/carriers';
import CarrierActions from '@/components/carriers/carrier-actions';

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-gray-50 text-gray-600 border-gray-200',
  suspended: 'bg-red-50 text-red-700 border-red-200',
};

const STATUS_ACCENT: Record<string, string> = {
  active: 'border-l-emerald-500',
  pending: 'border-l-gray-300',
  suspended: 'border-l-red-500',
};

export default async function CarriersPage() {
  const carriers = await getCarriers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Carriers</h1>
        <Link
          href="/carriers/new"
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
        >
          + Add Carrier
        </Link>
      </div>

      {carriers.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center text-gray-500 text-sm">
          No carriers yet. Add your first one.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="table-scroll-wrap">
            <table className="data-table w-full">
              <thead>
                <tr className="bg-slate-900">
                  <th className="sticky-col px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">MC #</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">DOT #</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Insurance</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Safety</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Equipment</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                  <th className="sticky-actions px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {carriers.map((c: any) => (
                  <tr key={c.id} className={`group hover:bg-slate-50 border-l-4 ${STATUS_ACCENT[c.status] || STATUS_ACCENT.pending} transition-colors align-top`}>
                    <td className="sticky-col px-4 py-3 font-medium">
                      <Link
                        href={`/carriers/${c.id}`}
                        className="text-gray-900 hover:text-gray-700 hover:underline"
                      >
                        {c.display_name}
                      </Link>
                      {c.signup_email && c.display_name !== c.company_name && (
                        <p className="text-xs text-gray-400 mt-0.5">{c.signup_email}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.mc_number || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{c.dot_number || '—'}</td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{c.insurance_status || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{c.safety_rating || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {(c.equipment_types || []).join(', ') || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold rounded-md px-2 py-1 border capitalize ${
                          STATUS_STYLES[c.status] || STATUS_STYLES.pending
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="sticky-actions px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/carriers/${c.id}`}
                          className="row-action-btn"
                          aria-label={`View ${c.display_name}`}
                          title="View details"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </Link>
                        <CarrierActions carrierId={c.id} status={c.status} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}