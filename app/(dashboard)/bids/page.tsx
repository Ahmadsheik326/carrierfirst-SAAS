// // // // // app/(dashboard)/bids/page.tsx
// // // // import { getBids } from '@/actions/bids';
// // // // import { getLoads } from '@/actions/loads';
// // // // import { formatCurrency } from '@/lib/utils/calculator';
// // // // import { getStatusColor, capitalize } from '@/lib/utils/helpers';

// // // // export default async function BidsPage() {
// // // //   const bids = await getBids();
// // // //   const loads = await getLoads();
// // // //   const loadMap = new Map(loads.map((l) => [l.id, l]));

// // // //   return (
// // // //     <div>
// // // //       <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bids</h1>
// // // //       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
// // // //         <div className="overflow-x-auto">
// // // //           <table className="w-full text-sm">
// // // //             <thead>
// // // //               <tr className="bg-gray-50">
// // // //                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Load</th>
// // // //                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Route</th>
// // // //                 <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">My Bid</th>
// // // //                 <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Broker Rate</th>
// // // //                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
// // // //                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody className="divide-y divide-gray-200">
// // // //               {bids.map((bid) => {
// // // //                 const load = loadMap.get(bid.load_id);
// // // //                 return (
// // // //                   <tr key={bid.id} className="hover:bg-gray-50">
// // // //                     <td className="px-6 py-4 font-semibold text-gray-900">{load?.load_id || bid.load_id}</td>
// // // //                     <td className="px-6 py-4 text-gray-700">{load ? `${load.origin} → ${load.destination}` : '—'}</td>
// // // //                     <td className="px-6 py-4 text-right font-semibold text-gray-900">{formatCurrency(bid.amount)}</td>
// // // //                     <td className="px-6 py-4 text-right text-gray-700">{formatCurrency(load?.bid_total || 0)}</td>
// // // //                     <td className="px-6 py-4">
// // // //                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStatusColor(bid.status)}`}>
// // // //                         {capitalize(bid.status)}
// // // //                       </span>
// // // //                     </td>
// // // //                     <td className="px-6 py-4 text-gray-500 text-xs">{new Date(bid.created_at).toLocaleDateString()}</td>
// // // //                   </tr>
// // // //                 );
// // // //               })}
// // // //               {bids.length === 0 && (
// // // //                 <tr>
// // // //                   <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No bids placed yet. Browse the Load Board to find freight.</td>
// // // //                 </tr>
// // // //               )}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import { createClient } from '@/lib/supabase/server';
// // // import { getBids } from '@/actions/bids';
// // // import { getLoads } from '@/actions/loads';
// // // import { formatCurrency } from '@/lib/utils/calculator';
// // // import { getStatusColor, capitalize } from '@/lib/utils/helpers';

// // // export default async function BidsPage() {
// // //   const supabase = await createClient();
// // //   const { data: { user } } = await supabase.auth.getUser();

// // //   const allBids = await getBids();
// // //   const loads = await getLoads();

// // //   // Only show bids for the logged-in carrier
// // //   const bids = user?.id ? allBids.filter((b) => b.carrier_id === user.id) : [];
// // //   const loadMap = new Map(loads.map((l) => [l.id, l]));

// // //   return (
// // //     <div>
// // //       <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bids</h1>
// // //       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-sm">
// // //             <thead>
// // //               <tr className="bg-gray-50">
// // //                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Load</th>
// // //                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Route</th>
// // //                 <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">My Bid</th>
// // //                 <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Broker Rate</th>
// // //                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
// // //                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="divide-y divide-gray-200">
// // //               {bids.map((bid) => {
// // //                 const load = loadMap.get(bid.load_id);
// // //                 return (
// // //                   <tr key={bid.id} className="hover:bg-gray-50">
// // //                     <td className="px-6 py-4 font-semibold text-gray-900">{load?.load_id || bid.load_id}</td>
// // //                     <td className="px-6 py-4 text-gray-700">{load ? `${load.origin} → ${load.destination}` : '—'}</td>
// // //                     <td className="px-6 py-4 text-right font-semibold text-gray-900">{formatCurrency(bid.amount)}</td>
// // //                     <td className="px-6 py-4 text-right text-gray-700">{formatCurrency(load?.bid_total || 0)}</td>
// // //                     <td className="px-6 py-4">
// // //                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStatusColor(bid.status)}`}>
// // //                         {capitalize(bid.status)}
// // //                       </span>
// // //                     </td>
// // //                     <td className="px-6 py-4 text-gray-500 text-xs">{new Date(bid.created_at).toLocaleDateString()}</td>
// // //                   </tr>
// // //                 );
// // //               })}
// // //               {bids.length === 0 && (
// // //                 <tr>
// // //                   <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No bids placed yet. Browse the Load Board to find freight.</td>
// // //                 </tr>
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import { createClient } from '@/lib/supabase/server';
// // import { getBids } from '@/actions/bids';
// // import { getLoads } from '@/actions/loads';
// // import { formatCurrency } from '@/lib/utils/calculator';
// // import { getStatusColor, capitalize } from '@/lib/utils/helpers';

// // export default async function BidsPage() {
// //   const supabase = await createClient();
// //   const { data: { user } } = await supabase.auth.getUser();

// //   const { data: userData } = await supabase
// //     .from('users')
// //     .select('role')
// //     .eq('id', user?.id)
// //     .single();

// //   const role = userData?.role || 'carrier';
// //   const allBids = await getBids();
// //   const loads = await getLoads();

// //   // Broker sees ALL bids. Carrier sees only their own.
// //   const bids = (role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin')
// //     ? allBids
// //     : user?.id ? allBids.filter((b) => b.carrier_id === user.id) : [];

// //   const loadMap = new Map(loads.map((l) => [l.id, l]));

// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold text-gray-900 mb-6">
// //         {role === 'broker_admin' || role === 'super_admin' ? 'Carrier Bids' : 'My Bids'}
// //       </h1>
// //       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm">
// //             <thead>
// //               <tr className="bg-gray-50">
// //                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Load</th>
// //                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Route</th>
// //                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Equipment</th>
// //                 <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Bid Amount</th>
// //                 <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Broker Rate</th>
// //                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
// //                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {bids.map((bid) => {
// //                 const load = loadMap.get(bid.load_id);
// //                 return (
// //                   <tr key={bid.id} className="hover:bg-gray-50">
// //                     <td className="px-6 py-4">
// //                       <p className="font-semibold text-gray-900">{load?.load_id || bid.load_id}</p>
// //                       <p className="text-xs text-gray-500">{load?.shipper_name || '—'}</p>
// //                     </td>
// //                     <td className="px-6 py-4 text-gray-700">{load ? `${load.origin} → ${load.destination}` : '—'}</td>
// //                     <td className="px-6 py-4">
// //                       <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
// //                         {load?.equipment_type || '—'}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-4 text-right font-semibold text-gray-900">{formatCurrency(bid.amount)}</td>
// //                     <td className="px-6 py-4 text-right text-gray-700">{formatCurrency(load?.bid_total || 0)}</td>
// //                     <td className="px-6 py-4">
// //                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStatusColor(bid.status)}`}>
// //                         {capitalize(bid.status)}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-4 text-gray-500 text-xs">{new Date(bid.created_at).toLocaleDateString()}</td>
// //                   </tr>
// //                 );
// //               })}
// //               {bids.length === 0 && (
// //                 <tr>
// //                   <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
// //                     {role === 'broker_admin' || role === 'super_admin'
// //                       ? 'No bids yet. Carriers will bid on available loads.'
// //                       : 'No bids placed yet. Browse the Load Board to find freight.'}
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { createClient } from '@/lib/supabase/server';
// import { getBids } from '@/actions/bids';
// import { getLoads } from '@/actions/loads';
// import { formatCurrency } from '@/lib/utils/calculator';
// import { getStatusColor, capitalize } from '@/lib/utils/helpers';
// import BidActions from '@/components/bids/bid-actions';

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
  
//   // Broker sees ALL pending bids. Carrier sees only their own.
//   const bids = isBroker 
//     ? allBids.filter(b => b.status === 'pending')
//     : allBids.filter((b) => b.carrier_id === user?.id);

//   const loadMap = new Map(loads.map((l) => [l.id, l]));

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">
//         {isBroker ? 'Carrier Bids' : 'My Bids'}
//       </h1>
      
//       {isBroker && bids.length > 0 && (
//         <p className="text-sm text-gray-500 mb-4">
//           {bids.length} pending bid{bids.length !== 1 ? 's' : ''} waiting for approval
//         </p>
//       )}

//       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Load</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Route</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Equipment</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Bid Amount</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Broker Rate</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
//                 {isBroker && <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {bids.map((bid) => {
//                 const load = loadMap.get(bid.load_id);
//                 return (
//                   <tr key={bid.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <p className="font-semibold text-gray-900">{load?.load_id || bid.load_id}</p>
//                       <p className="text-xs text-gray-500">{load?.shipper_name || '—'}</p>
//                     </td>
//                     <td className="px-6 py-4 text-gray-700">{load ? `${load.origin} → ${load.destination}` : '—'}</td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
//                         {load?.equipment_type || '—'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-right font-semibold text-gray-900">{formatCurrency(bid.amount)}</td>
//                     <td className="px-6 py-4 text-right text-gray-700">{formatCurrency(load?.bid_total || 0)}</td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStatusColor(bid.status)}`}>
//                         {capitalize(bid.status)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-gray-500 text-xs">{new Date(bid.created_at).toLocaleDateString()}</td>
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
//                   <td colSpan={isBroker ? 8 : 7} className="px-6 py-12 text-center text-gray-500">
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

  // Carrier name lookup — bypasses RLS via admin client since brokers and
  // carriers generally aren't in the same company_id, which the normal
  // "Users visible within company" policy would otherwise block.
  const carrierIds = [...new Set(bids.map((b) => b.carrier_id).filter(Boolean))];
  const carrierMap = new Map<string, string>();
  if (carrierIds.length > 0) {
    const { data: carrierUsers } = await supabaseAdmin
      .from('users')
      .select('id, full_name, email, company_name')
      .in('id', carrierIds);
    carrierUsers?.forEach((c: any) => {
      carrierMap.set(c.id, c.company_name || c.full_name || c.email || 'Unknown');
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isBroker ? 'Carrier Bids' : 'My Bids'}
      </h1>

      {isBroker && bids.length > 0 && (
        <p className="text-sm text-gray-500 mb-4">
          {bids.length} pending bid{bids.length !== 1 ? 's' : ''} waiting for approval
        </p>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Load</th>
                {isBroker && <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Carrier</th>}
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Equipment</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Bid Amount</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Broker Rate</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                {isBroker && <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bids.map((bid) => {
                const load = loadMap.get(bid.load_id);
                return (
                  <tr key={bid.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{load?.load_id || bid.load_id}</p>
                      <p className="text-xs text-gray-500">{load?.shipper_name || '—'}</p>
                    </td>
                    {isBroker && (
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {carrierMap.get(bid.carrier_id) || 'Unknown'}
                      </td>
                    )}
                    <td className="px-6 py-4 text-gray-700">{load ? `${load.origin} → ${load.destination}` : '—'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                        {load?.equipment_type || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">{formatCurrency(bid.amount)}</td>
                    <td className="px-6 py-4 text-right text-gray-700">{formatCurrency(load?.bid_total || 0)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStatusColor(bid.status)}`}>
                        {capitalize(bid.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{new Date(bid.created_at).toLocaleDateString()}</td>
                    {isBroker && (
                      <td className="px-6 py-4">
                        <BidActions bidId={bid.id} loadId={bid.load_id} />
                      </td>
                    )}
                  </tr>
                );
              })}
              {bids.length === 0 && (
                <tr>
                  <td colSpan={isBroker ? 9 : 7} className="px-6 py-12 text-center text-gray-500">
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