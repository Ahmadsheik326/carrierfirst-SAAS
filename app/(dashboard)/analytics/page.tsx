// app/(dashboard)/analytics/page.tsx
import { getLoads } from '@/actions/loads';
import { EQUIPMENT_TYPES } from '@/lib/constants/pricing';

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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Loads by Status</h2>
          <div className="space-y-4">
            {byStatus.map((s) => {
              const pct = (s.count / total) * 100;
              return (
                <div key={s.status}>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="capitalize text-gray-700">{s.status.replace('_', ' ')}</span>
                    <span className="text-gray-900">{s.count}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-900 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Equipment</h2>
          <div className="space-y-4">
            {byEquip.map((e) => {
              const pct = (e.revenue / maxRev) * 100;
              return (
                <div key={e.eq}>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-gray-700">{e.eq}</span>
                    <span className="text-gray-900">${e.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
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