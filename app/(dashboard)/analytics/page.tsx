// // app/(dashboard)/analytics/page.tsx
// import { getLoads } from '@/actions/loads';
// import { EQUIPMENT_TYPES } from '@/lib/constants/pricing';

// export default async function AnalyticsPage() {
//   const loads = await getLoads();
//   const byStatus = ['pending', 'approved', 'bidding', 'booked', 'delivered'].map((s) => ({
//     status: s,
//     count: loads.filter((l) => l.status === s).length,
//   }));
//   const total = byStatus.reduce((a, b) => a + b.count, 0) || 1;

//   const byEquip = EQUIPMENT_TYPES.map((eq) => ({
//     eq,
//     revenue: loads.filter((l) => l.equipment_type === eq).reduce((s, l) => s + (l.bid_total || 0), 0),
//   }));
//   const maxRev = Math.max(...byEquip.map((e) => e.revenue), 1);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Loads by Status</h2>
//           <div className="space-y-4">
//             {byStatus.map((s) => {
//               const pct = (s.count / total) * 100;
//               return (
//                 <div key={s.status}>
//                   <div className="flex justify-between text-sm font-medium mb-1">
//                     <span className="capitalize text-gray-700">{s.status.replace('_', ' ')}</span>
//                     <span className="text-gray-900">{s.count}</span>
//                   </div>
//                   <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
//                     <div className="h-full bg-gray-900 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Equipment</h2>
//           <div className="space-y-4">
//             {byEquip.map((e) => {
//               const pct = (e.revenue / maxRev) * 100;
//               return (
//                 <div key={e.eq}>
//                   <div className="flex justify-between text-sm font-medium mb-1">
//                     <span className="text-gray-700">{e.eq}</span>
//                     <span className="text-gray-900">${e.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
//                   </div>
//                   <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
//                     <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/(dashboard)/analytics/page.tsx
import { getLoads } from '@/actions/loads';
import { EQUIPMENT_TYPES } from '@/lib/constants/pricing';

const STATUS_BAR_COLOR: Record<string, string> = {
  pending: 'bg-amber-500',
  approved: 'bg-emerald-500',
  bidding: 'bg-sky-500',
  booked: 'bg-indigo-500',
  delivered: 'bg-slate-900',
};

export default async function AnalyticsPage() {
  const loads = await getLoads();
  const byStatus = ['pending', 'approved', 'bidding', 'booked', 'delivered'].map((s) => ({
    status: s,
    count: loads.filter((l) => l.status === s).length,
  }));
  const total = byStatus.reduce((a, b) => a + b.count, 0) || 1;

  const byEquip = EQUIPMENT_TYPES.map((eq) => ({
    eq,
    revenue: loads.filter((l) => l.equipment_type === eq).reduce((s, l) => s + (l.bid_total || 0), 0),
  }));
  const maxRev = Math.max(...byEquip.map((e) => e.revenue), 1);

  const totalRevenue = loads.reduce((s, l) => s + (l.bid_total || 0), 0);
  const stats = [
    { label: 'Total Loads', value: loads.length, accent: 'bg-slate-900' },
    { label: 'Total Revenue', value: totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }), accent: 'bg-emerald-500' },
    { label: 'Delivered', value: loads.filter((l) => l.status === 'delivered').length, accent: 'bg-amber-500' },
    { label: 'In Progress', value: loads.filter((l) => ['bidding', 'booked', 'in_transit'].includes(l.status)).length, accent: 'bg-sky-500' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Load volume and revenue across your book of business.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${s.accent}`} />
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1 pl-2 truncate">{s.label}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 pl-2">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-slate-900">
            <h2 className="text-sm font-semibold text-white">Loads by Status</h2>
          </div>
          <div className="p-6 space-y-4">
            {byStatus.map((s) => {
              const pct = (s.count / total) * 100;
              return (
                <div key={s.status}>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="capitalize text-gray-700">{s.status.replace('_', ' ')}</span>
                    <span className="text-gray-900 font-mono">{s.count}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${STATUS_BAR_COLOR[s.status] || 'bg-gray-400'} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-slate-900">
            <h2 className="text-sm font-semibold text-white">Revenue by Equipment</h2>
          </div>
          <div className="p-6 space-y-4">
            {byEquip.map((e) => {
              const pct = (e.revenue / maxRev) * 100;
              return (
                <div key={e.eq}>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-gray-700">{e.eq}</span>
                    <span className="text-gray-900 font-mono">${e.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}