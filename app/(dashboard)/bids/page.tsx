// import { createClient } from '@/lib/supabase/server';
// import { createClient as createServiceClient } from '@supabase/supabase-js';
// import { getBids } from '@/actions/bids';
// import { getLoads } from '@/actions/loads';
// import { formatCurrency } from '@/lib/utils/calculator';
// import { getStatusColor, capitalize } from '@/lib/utils/helpers';
// import BidActions from '@/components/bids/bid-actions';

// const supabaseAdmin = createServiceClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// export default async function BidsPage() {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   const { data: userData } = await supabase
//     .from('users')
//     .select('role')
//     .eq('id', user?.id)
//     .single();

//   const role = userData?.role || 'carrier';
//   const allBids = await getBids();
//   const loads = await getLoads();

//   const isBroker = role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin';

//   const bids = isBroker
//     ? allBids.filter(b => b.status === 'pending')
//     : allBids.filter((b) => b.carrier_id === user?.id);

//   const loadMap = new Map(loads.map((l) => [l.id, l]));

//   const carrierIds = [...new Set(bids.map((b) => b.carrier_id).filter(Boolean))];
//   const carrierMap = new Map<string, string>();
//   if (carrierIds.length > 0) {
//     const { data: carrierUsers } = await supabaseAdmin
//       .from('users')
//       .select('id, full_name, email, company_name')
//       .in('id', carrierIds);
//     carrierUsers?.forEach((c: any) => {
//       carrierMap.set(c.id, c.company_name || c.full_name || c.email || 'Unknown');
//     });
//   }

//   const stats = isBroker
//     ? [
//         { label: 'Pending Review', value: bids.length, accent: 'bg-amber-500' },
//         { label: 'All Bids', value: allBids.length, accent: 'bg-slate-900' },
//         { label: 'Accepted', value: allBids.filter((b) => b.status === 'accepted').length, accent: 'bg-emerald-500' },
//         { label: 'Rejected', value: allBids.filter((b) => b.status === 'rejected').length, accent: 'bg-red-500' },
//       ]
//     : [
//         { label: 'My Bids', value: bids.length, accent: 'bg-slate-900' },
//         { label: 'Pending', value: bids.filter((b) => b.status === 'pending').length, accent: 'bg-amber-500' },
//         { label: 'Won', value: bids.filter((b) => b.status === 'accepted').length, accent: 'bg-emerald-500' },
//         { label: 'Lost', value: bids.filter((b) => b.status === 'rejected').length, accent: 'bg-red-500' },
//       ];

//   return (
//     <div>
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">
//           {isBroker ? 'Carrier Bids' : 'My Bids'}
//         </h1>
//         <p className="text-sm text-gray-500 mt-1 font-mono">
//           {isBroker
//             ? `${bids.length} pending bid${bids.length !== 1 ? 's' : ''} waiting for approval`
//             : `${bids.length} bid${bids.length !== 1 ? 's' : ''} placed`}
//         </p>
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
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Load</th>
//                 {isBroker && <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Carrier</th>}
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Route</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Equipment</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Bid Amount</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Broker Rate</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Date</th>
//                 {isBroker && <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {bids.map((bid) => {
//                 const load = loadMap.get(bid.load_id);
//                 const statusAccent =
//                   bid.status === 'accepted' ? 'border-l-emerald-500' :
//                   bid.status === 'rejected' ? 'border-l-red-500' :
//                   'border-l-amber-500';
//                 return (
//                   <tr key={bid.id} className={`hover:bg-slate-50 border-l-4 ${statusAccent} transition-colors`}>
//                     <td className="px-6 py-4">
//                       <p className="font-semibold text-gray-900 font-mono">{load?.load_id || bid.load_id}</p>
//                       <p className="text-xs text-gray-500">{load?.shipper_name || '—'}</p>
//                     </td>
//                     {isBroker && (
//                       <td className="px-6 py-4">
//                         <span className="inline-flex items-center gap-2 text-gray-700 font-medium">
//                           <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
//                             {(carrierMap.get(bid.carrier_id) || '?').charAt(0).toUpperCase()}
//                           </span>
//                           {carrierMap.get(bid.carrier_id) || 'Unknown'}
//                         </span>
//                       </td>
//                     )}
//                     <td className="px-6 py-4 text-gray-700">{load ? `${load.origin} → ${load.destination}` : '—'}</td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
//                         {load?.equipment_type || '—'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-right font-bold text-gray-900">{formatCurrency(bid.amount)}</td>
//                     <td className="px-6 py-4 text-right text-gray-700 font-mono">{formatCurrency(load?.bid_total || 0)}</td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(bid.status)}`}>
//                         {capitalize(bid.status)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-gray-500 text-xs font-mono">{new Date(bid.created_at).toLocaleDateString()}</td>
//                     {isBroker && (
//                       <td className="px-6 py-4">
//                         <BidActions bidId={bid.id} loadId={bid.load_id} />
//                       </td>
//                     )}
//                   </tr>
//                 );
//               })}
//               {bids.length === 0 && (
//                 <tr>
//                   <td colSpan={isBroker ? 9 : 7} className="px-6 py-16 text-center text-gray-400">
//                     {isBroker ? 'No pending bids. Carriers will bid on available loads.' : 'No bids placed yet. Browse the Load Board to find freight.'}
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
// import { createClient } from '@/lib/supabase/server';
// import { createClient as createServiceClient } from '@supabase/supabase-js';
// import { getBids } from '@/actions/bids';
// import { getLoads } from '@/actions/loads';
// import { formatCurrency } from '@/lib/utils/calculator';
// import { getStatusColor, capitalize } from '@/lib/utils/helpers';
// import BidActions from '@/components/bids/bid-actions';

// const supabaseAdmin = createServiceClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// export default async function BidsPage() {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   const { data: userData } = await supabase
//     .from('users')
//     .select('role')
//     .eq('id', user?.id)
//     .single();

//   const role = userData?.role || 'carrier';
//   const allBids = await getBids();
//   const loads = await getLoads();

//   const isBroker = role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin';

//   const bids = isBroker
//     ? allBids.filter(b => b.status === 'pending')
//     : allBids.filter((b) => b.carrier_id === user?.id);

//   const loadMap = new Map(loads.map((l) => [l.id, l]));

//   // Carrier name lookup — bypasses RLS via admin client since brokers and
//   // carriers generally aren't in the same company_id, which the normal
//   // "Users visible within company" policy would otherwise block.
//   //
//   // IMPORTANT: company_name lives on the `carriers` table, not `users` —
//   // querying users.company_name errors silently and left every row showing
//   // "Unknown". Fixed to join both tables the same way loads/page.tsx does.
//   const carrierIds = [...new Set(bids.map((b) => b.carrier_id).filter(Boolean))];
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

//   const stats = isBroker
//     ? [
//         { label: 'Pending Review', value: bids.length, accent: 'bg-amber-500' },
//         { label: 'All Bids', value: allBids.length, accent: 'bg-slate-900' },
//         { label: 'Accepted', value: allBids.filter((b) => b.status === 'accepted').length, accent: 'bg-emerald-500' },
//         { label: 'Rejected', value: allBids.filter((b) => b.status === 'rejected').length, accent: 'bg-red-500' },
//       ]
//     : [
//         { label: 'My Bids', value: bids.length, accent: 'bg-slate-900' },
//         { label: 'Pending', value: bids.filter((b) => b.status === 'pending').length, accent: 'bg-amber-500' },
//         { label: 'Won', value: bids.filter((b) => b.status === 'accepted').length, accent: 'bg-emerald-500' },
//         { label: 'Lost', value: bids.filter((b) => b.status === 'rejected').length, accent: 'bg-red-500' },
//       ];

//   return (
//     <div>
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">
//           {isBroker ? 'Carrier Bids' : 'My Bids'}
//         </h1>
//         <p className="text-sm text-gray-500 mt-1 font-mono">
//           {isBroker
//             ? `${bids.length} pending bid${bids.length !== 1 ? 's' : ''} waiting for approval`
//             : `${bids.length} bid${bids.length !== 1 ? 's' : ''} placed`}
//         </p>
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
//         <div className="table-scroll-wrap">
//           <table className="data-table w-full">
//             <thead>
//               <tr className="bg-slate-900">
//                 <th className="sticky-col px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Load</th>
//                 {isBroker && <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Carrier</th>}
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Route</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Equipment</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Bid Amount</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Broker Rate</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Date</th>
//                 {isBroker && <th className="sticky-actions px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {bids.map((bid) => {
//                 const load = loadMap.get(bid.load_id);
//                 const statusAccent =
//                   bid.status === 'accepted' ? 'border-l-emerald-500' :
//                   bid.status === 'rejected' ? 'border-l-red-500' :
//                   'border-l-amber-500';
//                 return (
//                   <tr key={bid.id} className={`hover:bg-slate-50 border-l-4 ${statusAccent} transition-colors`}>
//                     <td className="sticky-col px-6 py-4">
//                       <p className="font-semibold text-gray-900 font-mono">{load?.load_id || bid.load_id}</p>
//                       <p className="text-xs text-gray-500">{load?.shipper_name || '—'}</p>
//                     </td>
//                     {isBroker && (
//                       <td className="px-6 py-4">
//                         <span className="inline-flex items-center gap-2 text-gray-700 font-medium">
//                           <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
//                             {(carrierMap.get(bid.carrier_id) || '?').charAt(0).toUpperCase()}
//                           </span>
//                           {carrierMap.get(bid.carrier_id) || 'Unknown'}
//                         </span>
//                       </td>
//                     )}
//                     <td className="px-6 py-4 text-gray-700">{load ? `${load.origin} → ${load.destination}` : '—'}</td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
//                         {load?.equipment_type || '—'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-right font-bold text-emerald-700">{formatCurrency(bid.amount)}</td>
//                     <td className="px-6 py-4 text-right text-gray-700 font-mono">{formatCurrency(load?.bid_total || 0)}</td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(bid.status)}`}>
//                         {capitalize(bid.status)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-gray-500 text-xs font-mono">{new Date(bid.created_at).toLocaleDateString()}</td>
//                     {isBroker && (
//                       <td className="sticky-actions px-6 py-4">
//                         <BidActions bidId={bid.id} loadId={bid.load_id} />
//                       </td>
//                     )}
//                   </tr>
//                 );
//               })}
//               {bids.length === 0 && (
//                 <tr>
//                   <td colSpan={isBroker ? 9 : 7} className="px-6 py-16 text-center text-gray-400">
//                     {isBroker ? 'No pending bids. Carriers will bid on available loads.' : 'No bids placed yet. Browse the Load Board to find freight.'}
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
import { getBids } from '@/actions/bids';
import { getLoads } from '@/actions/loads';
import { formatCurrency } from '@/lib/utils/calculator';
import { getStatusColor, capitalize } from '@/lib/utils/helpers';
import BidActions from '@/components/bids/bid-actions';

const supabaseAdmin = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function BidsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user?.id)
    .single();

  const role = userData?.role || 'carrier';
  const allBids = await getBids();
  const loads = await getLoads();

  const isBroker = role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin';

  const bids = isBroker
    ? allBids.filter(b => b.status === 'pending')
    : allBids.filter((b) => b.carrier_id === user?.id);

  const loadMap = new Map(loads.map((l) => [l.id, l]));

  const carrierIds = [...new Set(bids.map((b) => b.carrier_id).filter(Boolean))];
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

  const stats = isBroker
    ? [
        { label: 'Pending Review', value: bids.length, accent: 'bg-amber-500' },
        { label: 'All Bids', value: allBids.length, accent: 'bg-slate-900' },
        { label: 'Accepted', value: allBids.filter((b) => b.status === 'accepted').length, accent: 'bg-emerald-500' },
        { label: 'Rejected', value: allBids.filter((b) => b.status === 'rejected').length, accent: 'bg-red-500' },
      ]
    : [
        { label: 'My Bids', value: bids.length, accent: 'bg-slate-900' },
        { label: 'Pending', value: bids.filter((b) => b.status === 'pending').length, accent: 'bg-amber-500' },
        { label: 'Won', value: bids.filter((b) => b.status === 'accepted').length, accent: 'bg-emerald-500' },
        { label: 'Lost', value: bids.filter((b) => b.status === 'rejected').length, accent: 'bg-red-500' },
      ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isBroker ? 'Carrier Bids' : 'My Bids'}
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-mono">
          {isBroker
            ? `${bids.length} pending bid${bids.length !== 1 ? 's' : ''} waiting for approval`
            : `${bids.length} bid${bids.length !== 1 ? 's' : ''} placed`}
        </p>
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
                <th className="sticky-col px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Load</th>
                {isBroker && <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Carrier</th>}
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Equipment</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Bid Amount</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Broker Rate</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Date</th>
                {isBroker && <th className="sticky-actions px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bids.map((bid) => {
                const load = loadMap.get(bid.load_id);
                const statusAccent =
                  bid.status === 'accepted' ? 'border-l-emerald-500' :
                  bid.status === 'rejected' ? 'border-l-red-500' :
                  'border-l-amber-500';
                return (
                  <tr key={bid.id} className={`hover:bg-slate-50 border-l-4 ${statusAccent} transition-colors`}>
                    <td className="sticky-col px-6 py-4">
                      <p className="font-semibold text-gray-900 font-mono">{load?.load_id || bid.load_id}</p>
                      <p className="text-xs text-gray-500">{load?.shipper_name || '—'}</p>
                    </td>
                    {isBroker && (
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 text-gray-700 font-medium">
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                            {(carrierMap.get(bid.carrier_id) || '?').charAt(0).toUpperCase()}
                          </span>
                          {carrierMap.get(bid.carrier_id) || 'Unknown'}
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4 text-gray-700">{load ? `${load.origin} → ${load.destination}` : '—'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {load?.equipment_type || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-700">{formatCurrency(bid.amount)}</td>
                    <td className="px-6 py-4 text-right text-gray-700 font-mono">{formatCurrency(load?.carrier_rate || 0)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(bid.status)}`}>
                        {capitalize(bid.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs font-mono">{new Date(bid.created_at).toLocaleDateString()}</td>
                    {isBroker && (
                      <td className="sticky-actions px-6 py-4">
                        <BidActions bidId={bid.id} loadId={bid.load_id} />
                      </td>
                    )}
                  </tr>
                );
              })}
              {bids.length === 0 && (
                <tr>
                  <td colSpan={isBroker ? 9 : 7} className="px-6 py-16 text-center text-gray-400">
                    {isBroker ? 'No pending bids. Carriers will bid on available loads.' : 'No bids placed yet. Browse the Load Board to find freight.'}
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