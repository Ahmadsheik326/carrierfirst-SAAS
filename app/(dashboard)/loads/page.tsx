
// import { createClient } from '@/lib/supabase/server';
// import { createClient as createServiceClient } from '@supabase/supabase-js';
// import { getLoads } from '@/actions/loads';
// import { getBids } from '@/actions/bids';
// import { formatCurrency } from '@/lib/utils/calculator';
// import { getStatusColor, capitalize } from '@/lib/utils/helpers';
// import DeleteLoadButton from '@/components/shared/delete-load-button';
// import StatusActions from '@/components/loads/status-actions';
// import Link from 'next/link';

// interface Load {
//   id: string;
//   load_id: string;
//   shipper_id?: string;
//   shipper_name?: string;
//   origin: string;
//   destination: string;
//   equipment_type?: string;
//   mileage: number;
//   status: string;
//   bid_total?: number;
//   carrier_id?: string;
// }

// const supabaseAdmin = createServiceClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// export default async function LoadsPage() {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   const { data: userData } = await supabase
//     .from('users')
//     .select('role, full_name, email')
//     .eq('id', user?.id)
//     .single();

//   const role = userData?.role || 'shipper';
//   const isBroker = role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin';
//   const isCarrier = role === 'carrier';

//   const allLoads = await getLoads();
//   const allBids = await getBids();

//   const userName = (userData?.full_name || user?.email?.split('@')[0] || '').toLowerCase();
//   const userEmailPrefix = (user?.email || '').split('@')[0].toLowerCase();

//   let loads: Load[];
//   if (role === 'shipper') {
//     loads = allLoads.filter((l: Load) => {
//       if (l.shipper_id === user?.id) return true;
//       const shipperName = (l.shipper_name || '').toLowerCase();
//       if (userName && shipperName.includes(userName)) return true;
//       if (userEmailPrefix && shipperName.includes(userEmailPrefix)) return true;
//       return false;
//     });
//   } else if (isCarrier) {
//     // Carriers only see loads assigned to them — not the full system list.
//     loads = allLoads.filter((l: Load) => l.carrier_id === user?.id);
//   } else {
//     loads = allLoads;
//   }

//   // Carrier name lookup — done via admin client since the standard RLS
//   // policy on `users` only allows viewing people in your own company_id,
//   // which blocks a broker from seeing a carrier's name directly.
//   const carrierIds = [...new Set(loads.map((l) => l.carrier_id).filter(Boolean))] as string[];
//   const carrierMap = new Map<string, string>();
//   if (carrierIds.length > 0) {
//     const { data: carrierUsers } = await supabaseAdmin
//       .from('users')
//       .select('id, full_name, email')
//       .in('id', carrierIds);

//     const { data: carrierProfiles } = await supabaseAdmin
//       .from('carriers')
//       .select('user_id, company_name')
//       .in('user_id', carrierIds);

//     const companyNameMap = new Map<string, string>();
//     carrierProfiles?.forEach((cp: any) => {
//       if (cp.company_name) companyNameMap.set(cp.user_id, cp.company_name);
//     });

//     carrierUsers?.forEach((c: any) => {
//       carrierMap.set(c.id, companyNameMap.get(c.id) || c.full_name || c.email || 'Unknown');
//     });
//   }

//   const bidCounts = new Map<string, number>();
//   allBids.forEach((b) => {
//     if (b.status === 'pending') {
//       bidCounts.set(b.load_id, (bidCounts.get(b.load_id) || 0) + 1);
//     }
//   });

//   const pageTitle = role === 'shipper' ? 'My Loads' : isCarrier ? 'My Assigned Loads' : 'All Loads';

// const stats = [
//     { label: 'Total Loads', value: loads.length, accent: 'bg-slate-900' },
//     { label: 'Bidding', value: loads.filter((l) => l.status === 'bidding').length, accent: 'bg-sky-500' },
//     { label: 'Active', value: loads.filter((l) => ['booked', 'picked_up', 'in_transit'].includes(l.status)).length, accent: 'bg-amber-500' },
//     { label: 'Delivered', value: loads.filter((l) => l.status === 'delivered').length, accent: 'bg-emerald-500' },
//   ];

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
//           <p className="text-sm text-gray-500 mt-1 font-mono">
//             {loads.length} load{loads.length !== 1 ? 's' : ''} on record
//           </p>
//         </div>
//         {isBroker && (
//           <Link href="/loads/new"
//             className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm">
//             + Create Load
//           </Link>
//         )}
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         {stats.map((s) => (
//           <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 relative overflow-hidden">
//             <div className={`absolute top-0 left-0 w-1 h-full ${s.accent}`} />
//             <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1 pl-2">{s.label}</p>
//             <p className="text-2xl font-bold text-gray-900 pl-2">{s.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-slate-900">
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Load ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Route</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Equipment</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Miles</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Bid Total</th>
//                 {role === 'shipper' && <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Bids</th>}
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Carrier</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {loads.map((load: Load) => {
//                 const pendingBids = bidCounts.get(load.id) || 0;
//                 const statusAccent =
//                   load.status === 'delivered' ? 'border-l-emerald-500' :
//                   load.status === 'in_transit' ? 'border-l-purple-500' :
//                   load.status === 'picked_up' ? 'border-l-amber-500' :
//                   load.status === 'booked' ? 'border-l-indigo-500' :
//                   load.status === 'bidding' ? 'border-l-sky-500' :
//                   load.status === 'rejected' ? 'border-l-red-500' :
//                   'border-l-gray-200';
//                 const carrierLabel = load.carrier_id ? (carrierMap.get(load.carrier_id) || 'Assigned') : null;

//                 return (
//                   <tr key={load.id} className={`hover:bg-slate-50 border-l-4 ${statusAccent} transition-colors`}>
//                     <td className="px-6 py-4 font-semibold text-gray-900 font-mono">
//                       <Link href={`/loads/${load.id}`} className="hover:text-slate-600 hover:underline">{load.load_id}</Link>
//                     </td>
//                     <td className="px-6 py-4 text-gray-700">{load.origin} <span className="text-gray-300">→</span> {load.destination}</td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
//                         {load.equipment_type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-right text-gray-700 font-mono">{load.mileage.toLocaleString()}</td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(load.status)}`}>
//                         {capitalize(load.status)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-right font-bold text-gray-900">{formatCurrency(load.bid_total || 0)}</td>
//                     {role === 'shipper' && (
//                       <td className="px-6 py-4">
//                         {pendingBids > 0 ? (
//                           <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
//                             {pendingBids} bid{pendingBids !== 1 ? 's' : ''}
//                           </span>
//                         ) : load.status === 'booked' ? (
//                           <span className="text-emerald-600 text-xs font-semibold">Booked</span>
//                         ) : (
//                           <span className="text-gray-300 text-xs">—</span>
//                         )}
//                       </td>
//                     )}
//                     <td className="px-6 py-4 text-gray-700">
//                       {carrierLabel ? (
//                         <span className="inline-flex items-center gap-2">
//                           <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
//                             {carrierLabel.charAt(0).toUpperCase()}
//                           </span>
//                           {carrierLabel}
//                         </span>
//                       ) : (
//                         <span className="text-gray-300">—</span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end gap-2">
//                         {(isBroker || isCarrier) && (
//                           <StatusActions loadId={load.id} status={load.status} isBroker={isBroker} />
//                         )}
//                         {isBroker && <DeleteLoadButton loadId={load.id} />}
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//               {loads.length === 0 && (
//                 <tr>
//                   <td colSpan={role === 'shipper' ? 8 : 8} className="px-6 py-16 text-center text-gray-400">
//                     {role === 'shipper'
//                       ? 'No loads found. Submit a quote request first.'
//                       : isCarrier
//                       ? 'No loads assigned to you yet.'
//                       : 'No loads found. Create your first load to get started.'}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { getLoads } from '@/actions/loads';
import { getBids } from '@/actions/bids';
import { formatCurrency } from '@/lib/utils/calculator';
import { getStatusColor, capitalize } from '@/lib/utils/helpers';
import DeleteLoadButton from '@/components/shared/delete-load-button';
import StatusActions from '@/components/loads/status-actions';
import Link from 'next/link';

interface Load {
  id: string;
  load_id: string;
  shipper_id?: string;
  shipper_name?: string;
  origin: string;
  destination: string;
  equipment_type?: string;
  mileage: number;
  status: string;
  bid_total?: number;
  carrier_id?: string;
}

const supabaseAdmin = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function LoadsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from('users')
    .select('role, full_name, email')
    .eq('id', user?.id)
    .single();

  const role = userData?.role || 'shipper';
  const isBroker = role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin';
  const isCarrier = role === 'carrier';

  const allLoads = await getLoads();
  const allBids = await getBids();

  const userName = (userData?.full_name || user?.email?.split('@')[0] || '').toLowerCase();
  const userEmailPrefix = (user?.email || '').split('@')[0].toLowerCase();

  let loads: Load[];
  if (role === 'shipper') {
    loads = allLoads.filter((l: Load) => {
      if (l.shipper_id === user?.id) return true;
      const shipperName = (l.shipper_name || '').toLowerCase();
      if (userName && shipperName.includes(userName)) return true;
      if (userEmailPrefix && shipperName.includes(userEmailPrefix)) return true;
      return false;
    });
  } else if (isCarrier) {
    // Carriers only see loads assigned to them — not the full system list.
    loads = allLoads.filter((l: Load) => l.carrier_id === user?.id);
  } else {
    loads = allLoads;
  }

  // Carrier name lookup — done via admin client since the standard RLS
  // policy on `users` only allows viewing people in your own company_id,
  // which blocks a broker from seeing a carrier's name directly.
  const carrierIds = [...new Set(loads.map((l) => l.carrier_id).filter(Boolean))] as string[];
  const carrierMap = new Map<string, string>();
  if (carrierIds.length > 0) {
    const { data: carrierUsers } = await supabaseAdmin
      .from('users')
      .select('id, full_name, email')
      .in('id', carrierIds);

    const { data: carrierProfiles } = await supabaseAdmin
      .from('carriers')
      .select('user_id, company_name')
      .in('user_id', carrierIds);

    const companyNameMap = new Map<string, string>();
    carrierProfiles?.forEach((cp: any) => {
      if (cp.company_name) companyNameMap.set(cp.user_id, cp.company_name);
    });

    carrierUsers?.forEach((c: any) => {
      carrierMap.set(c.id, companyNameMap.get(c.id) || c.full_name || c.email || 'Unknown');
    });
  }

  const bidCounts = new Map<string, number>();
  allBids.forEach((b) => {
    if (b.status === 'pending') {
      bidCounts.set(b.load_id, (bidCounts.get(b.load_id) || 0) + 1);
    }
  });

  const pageTitle = role === 'shipper' ? 'My Loads' : isCarrier ? 'My Assigned Loads' : 'All Loads';
  const columnCount = role === 'shipper' ? 9 : 8;

  const stats = [
    { label: 'Total Loads', value: loads.length, accent: 'bg-slate-900' },
    { label: 'Bidding', value: loads.filter((l) => l.status === 'bidding').length, accent: 'bg-sky-500' },
    { label: 'Active', value: loads.filter((l) => ['booked', 'picked_up', 'in_transit'].includes(l.status)).length, accent: 'bg-amber-500' },
    { label: 'Delivered', value: loads.filter((l) => l.status === 'delivered').length, accent: 'bg-emerald-500' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">
            {loads.length} load{loads.length !== 1 ? 's' : ''} on record
          </p>
        </div>
        {isBroker && (
          <Link href="/loads/new"
            className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm">
            + Create Load
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${s.accent}`} />
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1 pl-2">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 pl-2">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="table-scroll-wrap">
          <table className="data-table w-full">
            <thead>
              <tr className="bg-slate-900">
                <th className="sticky-col px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Load ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Equipment</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Miles</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Bid Total</th>
                {role === 'shipper' && <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Bids</th>}
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Carrier</th>
                <th className="sticky-actions px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loads.map((load: Load) => {
                const pendingBids = bidCounts.get(load.id) || 0;
                const statusAccent =
                  load.status === 'delivered' ? 'border-l-emerald-500' :
                  load.status === 'in_transit' ? 'border-l-purple-500' :
                  load.status === 'picked_up' ? 'border-l-amber-500' :
                  load.status === 'booked' ? 'border-l-indigo-500' :
                  load.status === 'bidding' ? 'border-l-sky-500' :
                  load.status === 'rejected' ? 'border-l-red-500' :
                  'border-l-gray-200';
                const carrierLabel = load.carrier_id ? (carrierMap.get(load.carrier_id) || 'Assigned') : null;

                return (
                  <tr key={load.id} className={`group hover:bg-slate-50 border-l-4 ${statusAccent} transition-colors`}>
                    <td className="sticky-col px-6 py-4 font-semibold text-gray-900 font-mono">
                      <Link href={`/loads/${load.id}`} className="hover:text-slate-600 hover:underline">{load.load_id}</Link>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{load.origin} <span className="text-gray-300">→</span> {load.destination}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {load.equipment_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-700 font-mono">{load.mileage.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(load.status)}`}>
                        {capitalize(load.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">{formatCurrency(load.bid_total || 0)}</td>
                    {role === 'shipper' && (
                      <td className="px-6 py-4">
                        {pendingBids > 0 ? (
                          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                            {pendingBids} bid{pendingBids !== 1 ? 's' : ''}
                          </span>
                        ) : load.status === 'booked' ? (
                          <span className="text-emerald-600 text-xs font-semibold">Booked</span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                    )}
                    <td className="px-6 py-4 text-gray-700">
                      {carrierLabel ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                            {carrierLabel.charAt(0).toUpperCase()}
                          </span>
                          {carrierLabel}
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="sticky-actions px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/loads/${load.id}`}
                          className="row-action-btn"
                          aria-label={`View load ${load.load_id}`}
                          title="View details"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </Link>
                        {(isBroker || isCarrier) && (
                          <StatusActions loadId={load.id} status={load.status} isBroker={isBroker} />
                        )}
                        {isBroker && <DeleteLoadButton loadId={load.id} />}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {loads.length === 0 && (
                <tr>
                  <td colSpan={columnCount} className="px-6 py-16 text-center text-gray-400">
                    {role === 'shipper'
                      ? 'No loads found. Submit a quote request first.'
                      : isCarrier
                      ? 'No loads assigned to you yet.'
                      : 'No loads found. Create your first load to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}