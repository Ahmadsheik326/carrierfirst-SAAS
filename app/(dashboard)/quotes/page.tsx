// app/(dashboard)/quotes/page.tsx
import { createClient } from '@/lib/supabase/server';
import { getQuoteRequests } from '@/actions/quotes';
import { formatCurrency } from '@/lib/utils/calculator';
import { getStatusColor, capitalize } from '@/lib/utils/helpers';
import QuoteActions from '@/components/quotes/quote-actions';
import Link from 'next/link';

export default async function QuotesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user?.id)
    .single();

  const role = userData?.role || 'shipper';
  const quotes = await getQuoteRequests();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
        {role === 'shipper' && (
          <Link
            href="/quotes/new"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            + Request Quote
          </Link>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Shipper</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Equipment</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Miles</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Est. Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                {role !== 'shipper' && <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotes.map((quote, i) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">QR-{String(i + 1).padStart(3, '0')}</td>
                  <td className="px-6 py-4 text-gray-700">{quote.shipper_name}</td>
                  <td className="px-6 py-4 text-gray-700">{quote.origin} → {quote.destination}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                      {quote.equipment_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-700">{quote.mileage}</td>
                  <td className="px-6 py-4 text-right text-gray-700">{quote.weight.toLocaleString()} lbs</td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">{formatCurrency(quote.est_total || 0)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStatusColor(quote.status)}`}>
                      {capitalize(quote.status)}
                    </span>
                  </td>
                  {role !== 'shipper' && (
                    <td className="px-6 py-4">
                      <QuoteActions quoteId={quote.id} status={quote.status} />
                    </td>
                  )}
                </tr>
              ))}
              {quotes.length === 0 && (
                <tr>
                  <td colSpan={role !== 'shipper' ? 9 : 8} className="px-6 py-12 text-center text-gray-500">
                    No quote requests yet. {role === 'shipper' ? 'Submit your first quote request.' : 'Shippers will submit quotes here.'}
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
