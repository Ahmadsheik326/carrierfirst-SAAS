import Link from 'next/link';
import { getShippers } from '@/actions/shippers';
import ShipperActions from '@/components/shippers/shipper-actions';

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-gray-50 text-gray-600 border-gray-200',
  suspended: 'bg-red-50 text-red-700 border-red-200',
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0);
}

export default async function ShippersPage() {
  const shippers = await getShippers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Shippers</h1>
        <Link
          href="/shippers/new"
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          + Add Shipper
        </Link>
      </div>

      {shippers.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center text-gray-500 text-sm">
          No shippers yet. Add your first one.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Credit limit</th>
                <th className="px-4 py-3">Balance</th>
                <th className="px-4 py-3">Available credit</th>
                <th className="px-4 py-3">Terms</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shippers.map((s: any) => {
                const available = (s.credit_limit || 0) - (s.credit_balance || 0);
                return (
                  <tr key={s.id} className="border-b border-gray-100 last:border-0 align-top">
                    <td className="px-4 py-3 font-medium">
  <Link 
    href={`/shippers/${s.id}`} 
    className="text-slate-900 hover:text-slate-700 hover:underline"
  >
    {s.company_name}
  </Link>
</td>
                    <td className="px-4 py-3 text-gray-600">{formatCurrency(s.credit_limit)}</td>
                    <td className="px-4 py-3 text-gray-600">{formatCurrency(s.credit_balance)}</td>
                    <td className={`px-4 py-3 font-medium ${available < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                      {formatCurrency(available)}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{s.payment_terms || '—'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold rounded-md px-2 py-1 border capitalize ${
                          STATUS_STYLES[s.status] || STATUS_STYLES.pending
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <ShipperActions shipperId={s.id} status={s.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}