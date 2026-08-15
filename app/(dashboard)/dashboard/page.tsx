// import { createClient } from '@/lib/supabase/server';
// import { getLoads } from '@/actions/loads';
// import { getBids } from '@/actions/bids';
// import StatsCards from '@/components/dashboard/stats-cards';
// import { formatCurrency } from '@/lib/utils/calculator';
// import { capitalize } from '@/lib/utils/helpers';

// // FIXED: Static status styles so Tailwind compiles them correctly
// const STATUS_STYLES: Record<string, string> = {
//   pending: 'bg-amber-50 text-amber-700 border-amber-200',
//   bidding: 'bg-sky-50 text-sky-700 border-sky-200',
//   approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
//   active: 'bg-blue-50 text-blue-700 border-blue-200',
//   in_transit: 'bg-indigo-50 text-indigo-700 border-indigo-200',
//   delivered: 'bg-slate-100 text-slate-700 border-slate-200',
//   completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
//   rejected: 'bg-red-50 text-red-700 border-red-200',
//   cancelled: 'bg-red-50 text-red-700 border-red-200',
//   default: 'bg-gray-100 text-gray-700 border-gray-200',
// };

// export default async function DashboardPage() {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   const { data: userData } = await supabase
//     .from('users')
//     .select('role, full_name, email')
//     .eq('id', user?.id)
//     .single();

//   const role = userData?.role || 'shipper';
//   const allLoads = await getLoads();
//   const allBids = await getBids();

//   // Shipper loads with fallback matching
//   const userName = (userData?.full_name || user?.email?.split('@')[0] || '').toLowerCase();
//   const userEmail = (user?.email || '').toLowerCase();

//   const myLoads = role === 'shipper'
//     ? allLoads.filter((l) => {
//         if (l.shipper_id === user?.id) return true;
//         const shipperName = (l.shipper_name || '').toLowerCase();
//         if (userName && shipperName.includes(userName)) return true;
//         if (userEmail && shipperName.includes(userEmail.split('@')[0])) return true;
//         return false;
//       })
//     : allLoads;

//   const activeLoads = myLoads.filter((l) => !['delivered', 'rejected'].includes(l.status)).length;
//   const totalRevenue = myLoads.reduce((s, l) => s + (l.bid_total || 0), 0);

//   // Carrier stats
//   const myBids = user?.id ? allBids.filter((b) => b.carrier_id === user.id) : [];
//   const wonBids = myBids.filter((b) => b.status === 'accepted');
//   const wonRevenue = wonBids.reduce((s, b) => s + b.amount, 0);

//   let stats = [];
//   if (role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin') {
//     const pendingQuotes = allLoads.filter((l) => l.status === 'pending').length;
//     stats = [
//       { label: 'Total loads', value: allLoads.length },
//       { label: 'Active loads', value: activeLoads },
//       { label: 'Total revenue', value: totalRevenue, isCurrency: true },
//       { label: 'Pending quotes', value: pendingQuotes },
//     ];
//   } else if (role === 'shipper') {
//     stats = [
//       { label: 'My loads', value: myLoads.length },
//       { label: 'Pending', value: myLoads.filter((l) => l.status === 'pending').length },
//       { label: 'Delivered', value: myLoads.filter((l) => l.status === 'delivered').length },
//       { label: 'Total spent', value: totalRevenue, isCurrency: true },
//     ];
//   } else {
//     const available = allLoads.filter((l) => ['bidding', 'approved', 'pending'].includes(l.status)).length;
//     const myDeliveredLoads = allLoads.filter(
//       (l) => l.carrier_id === user?.id && l.status === 'delivered'
//     );
//     const deliveredRevenue = myDeliveredLoads.reduce((s, l) => s + (l.bid_total || 0), 0);
//     stats = [
//       { label: 'Available loads', value: available },
//       { label: 'Won bids', value: wonBids.length },
//       { label: 'Delivered loads', value: myDeliveredLoads.length },
//       { label: 'Delivered revenue', value: deliveredRevenue, isCurrency: true },
//     ];
//   }

//   const recentLoads = role === 'shipper' ? myLoads.slice(0, 6) : allLoads.slice(0, 6);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
//       <StatsCards stats={stats} />

//       <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Load</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Route</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Equipment</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Bid Total</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {recentLoads.map((load) => (
//                 <tr key={load.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <p className="font-semibold text-gray-900">{load.load_id}</p>
//                     <p className="text-xs text-gray-500">{load.shipper_name}</p>
//                   </td>
//                   <td className="px-6 py-4 text-gray-700">{load.origin} → {load.destination}</td>
//                   <td className="px-6 py-4">
//                     <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
//                       {load.equipment_type}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     {/* FIXED: Replaced getStatusColor with static mapped styles */}
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${STATUS_STYLES[load.status] || STATUS_STYLES.default}`}>
//                       {capitalize(load.status)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right font-semibold text-gray-900">{formatCurrency(load.bid_total || 0)}</td>
//                 </tr>
//               ))}
//               {recentLoads.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
//                     {role === 'shipper' ? 'No loads yet. Submit a quote request to get started.' : 'No loads yet. Create your first load to get started.'}
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
import { getLoads } from '@/actions/loads';
import { getBids } from '@/actions/bids';
import { formatCurrency } from '@/lib/utils/calculator';
import { capitalize } from '@/lib/utils/helpers';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  bidding: 'bg-sky-50 text-sky-700 border-sky-200',
  approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  active: 'bg-blue-50 text-blue-700 border-blue-200',
  booked: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  picked_up: 'bg-amber-50 text-amber-700 border-amber-200',
  in_transit: 'bg-purple-50 text-purple-700 border-purple-200',
  delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
  default: 'bg-gray-100 text-gray-700 border-gray-200',
};

const STATUS_ACCENT: Record<string, string> = {
  pending: 'border-l-amber-500',
  bidding: 'border-l-sky-500',
  approved: 'border-l-emerald-500',
  booked: 'border-l-indigo-500',
  picked_up: 'border-l-amber-500',
  in_transit: 'border-l-purple-500',
  delivered: 'border-l-emerald-500',
  rejected: 'border-l-red-500',
  cancelled: 'border-l-red-500',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from('users')
    .select('role, full_name, email')
    .eq('id', user?.id)
    .single();

  const role = userData?.role || 'shipper';
  const allLoads = await getLoads();
  const allBids = await getBids();

  const userName = (userData?.full_name || user?.email?.split('@')[0] || '').toLowerCase();
  const userEmail = (user?.email || '').toLowerCase();

  const myLoads = role === 'shipper'
    ? allLoads.filter((l) => {
        if (l.shipper_id === user?.id) return true;
        const shipperName = (l.shipper_name || '').toLowerCase();
        if (userName && shipperName.includes(userName)) return true;
        if (userEmail && shipperName.includes(userEmail.split('@')[0])) return true;
        return false;
      })
    : allLoads;

  const activeLoads = myLoads.filter((l) => !['delivered', 'rejected'].includes(l.status)).length;
  const totalRevenue = myLoads.reduce((s, l) => s + (l.bid_total || 0), 0);

  const myBids = user?.id ? allBids.filter((b) => b.carrier_id === user.id) : [];
  const wonBids = myBids.filter((b) => b.status === 'accepted');

  let stats: { label: string; value: number; isCurrency?: boolean; accent: string }[] = [];

  if (role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin') {
    const pendingQuotes = allLoads.filter((l) => l.status === 'pending').length;
    stats = [
      { label: 'Total loads', value: allLoads.length, accent: 'bg-slate-900' },
      { label: 'Active loads', value: activeLoads, accent: 'bg-sky-500' },
      { label: 'Total revenue', value: totalRevenue, isCurrency: true, accent: 'bg-emerald-500' },
      { label: 'Pending quotes', value: pendingQuotes, accent: 'bg-amber-500' },
    ];
  } else if (role === 'shipper') {
    stats = [
      { label: 'My loads', value: myLoads.length, accent: 'bg-slate-900' },
      { label: 'Pending', value: myLoads.filter((l) => l.status === 'pending').length, accent: 'bg-amber-500' },
      { label: 'Delivered', value: myLoads.filter((l) => l.status === 'delivered').length, accent: 'bg-emerald-500' },
      { label: 'Total spent', value: totalRevenue, isCurrency: true, accent: 'bg-sky-500' },
    ];
  } else {
    const available = allLoads.filter((l) => ['bidding', 'approved', 'pending'].includes(l.status)).length;
    const myDeliveredLoads = allLoads.filter((l) => l.carrier_id === user?.id && l.status === 'delivered');
    const deliveredRevenue = myDeliveredLoads.reduce((s, l) => s + (l.bid_total || 0), 0);
    stats = [
      { label: 'Available loads', value: available, accent: 'bg-sky-500' },
      { label: 'Won bids', value: wonBids.length, accent: 'bg-amber-500' },
      { label: 'Delivered loads', value: myDeliveredLoads.length, accent: 'bg-emerald-500' },
      { label: 'Delivered revenue', value: deliveredRevenue, isCurrency: true, accent: 'bg-slate-900' },
    ];
  }

  const recentLoads = role === 'shipper' ? myLoads.slice(0, 6) : allLoads.slice(0, 6);

  const roleLabel =
    role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin' ? 'here\'s the full board' :
    role === 'shipper' ? 'here\'s where your loads stand' :
    'here\'s what\'s moving';

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back{userData?.full_name ? `, ${userData.full_name.split(' ')[0]}` : ''} — {roleLabel}.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${s.accent}`} />
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1 pl-2 truncate">{s.label}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 pl-2">
              {s.isCurrency ? formatCurrency(s.value) : s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <span className="text-xs text-gray-400 font-mono">{recentLoads.length} shown</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Load</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Equipment</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Bid Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentLoads.map((load) => (
                <tr key={load.id} className={`hover:bg-slate-50 border-l-4 ${STATUS_ACCENT[load.status] || 'border-l-gray-200'} transition-colors`}>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900 font-mono">{load.load_id}</p>
                    <p className="text-xs text-gray-500">{load.shipper_name}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{load.origin} <span className="text-gray-300">→</span> {load.destination}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {load.equipment_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_STYLES[load.status] || STATUS_STYLES.default}`}>
                      {capitalize(load.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">{formatCurrency(load.bid_total || 0)}</td>
                </tr>
              ))}
              {recentLoads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                    {role === 'shipper' ? 'No loads yet. Submit a quote request to get started.' : 'No loads yet. Create your first load to get started.'}
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