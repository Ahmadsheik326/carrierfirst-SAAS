// import { createClient } from '@/lib/supabase/server';
// import { getQuoteRequests } from '@/actions/quotes';
// import { formatCurrency } from '@/lib/utils/calculator';
// import { getStatusColor, capitalize } from '@/lib/utils/helpers';
// import QuoteActions from '@/components/quotes/quote-actions';
// import Link from 'next/link';

// const STATUS_ACCENT: Record<string, string> = {
//   approved: 'border-l-emerald-500',
//   rejected: 'border-l-red-500',
//   pending: 'border-l-amber-500',
// };

// export default async function QuotesPage() {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   const { data: userData } = await supabase
//     .from('users')
//     .select('role')
//     .eq('id', user?.id)
//     .single();

//   const role = userData?.role || 'shipper';
//   const quotes = await getQuoteRequests();
//   const columnCount = role !== 'shipper' ? 9 : 8;

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
//         {role === 'shipper' && (
//           <Link
//             href="/quotes/new"
//             className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
//           >
//             + Request Quote
//           </Link>
//         )}
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//         <div className="table-scroll-wrap">
//           <table className="data-table w-full">
//             <thead>
//               <tr className="bg-slate-900">
//                 <th className="sticky-col px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Shipper</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Route</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Equipment</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Miles</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Weight</th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Est. Total</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
//                 {role !== 'shipper' && (
//                   <th className="sticky-actions px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
//                 )}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {quotes.map((quote, i) => (
//                 <tr
//                   key={quote.id}
//                   className={`hover:bg-slate-50 border-l-4 ${STATUS_ACCENT[quote.status] || STATUS_ACCENT.pending} transition-colors`}
//                 >
//                   <td className="sticky-col px-6 py-4 font-semibold text-gray-900 font-mono">
//                     QR-{String(i + 1).padStart(3, '0')}
//                   </td>
//                   <td className="px-6 py-4 text-gray-700">{quote.shipper_name}</td>
//                   <td className="px-6 py-4 text-gray-700">{quote.origin} <span className="text-gray-300">→</span> {quote.destination}</td>
//                   <td className="px-6 py-4">
//                     <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
//                       {quote.equipment_type}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right text-gray-700 font-mono">{quote.mileage}</td>
//                   <td className="px-6 py-4 text-right text-gray-700 font-mono">{quote.weight.toLocaleString()} lbs</td>
//                   <td className="px-6 py-4 text-right font-bold text-gray-900">{formatCurrency(quote.est_total || 0)}</td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(quote.status)}`}>
//                       {capitalize(quote.status)}
//                     </span>
//                   </td>
//                   {role !== 'shipper' && (
//                     <td className="sticky-actions px-6 py-4">
//                       <QuoteActions quoteId={quote.id} status={quote.status} />
//                     </td>
//                   )}
//                 </tr>
//               ))}
//               {quotes.length === 0 && (
//                 <tr>
//                   <td colSpan={columnCount} className="px-6 py-16 text-center text-gray-400">
//                     No quote requests yet. {role === 'shipper' ? 'Submit your first quote request.' : 'Shippers will submit quotes here.'}
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
// app/(dashboard)/quotes/page.tsx
import { createClient } from '@/lib/supabase/server';
import { getQuoteRequests } from '@/actions/quotes';
import { formatCurrency } from '@/lib/utils/calculator';
import { getStatusColor, capitalize } from '@/lib/utils/helpers';
import QuoteActions from '@/components/quotes/quote-actions';
import Link from 'next/link';

const STATUS_ACCENT: Record<string, string> = {
  approved: 'border-l-emerald-500',
  rejected: 'border-l-red-500',
  pending: 'border-l-amber-500',
};

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
  const columnCount = role !== 'shipper' ? 9 : 8;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
        {role === 'shipper' && (
          <Link
            href="/quotes/new"
            className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            + Request Quote
          </Link>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="table-scroll-wrap">
          <table className="data-table w-full">
            <thead>
              <tr className="bg-slate-900">
                <th className="sticky-col px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Shipper</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Equipment</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Miles</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Est. Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                {role !== 'shipper' && (
                  <th className="sticky-actions px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quotes.map((quote, i) => (
                <tr
                  key={quote.id}
                  className={`hover:bg-slate-50 border-l-4 ${STATUS_ACCENT[quote.status] || STATUS_ACCENT.pending} transition-colors`}
                >
                  <td className="sticky-col px-6 py-4 font-semibold text-gray-900 font-mono">
                    QR-{String(i + 1).padStart(3, '0')}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{quote.shipper_name}</td>
                  <td className="px-6 py-4 text-gray-700">{quote.origin} <span className="text-gray-300">→</span> {quote.destination}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {quote.equipment_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-700 font-mono">{quote.mileage}</td>
                  <td className="px-6 py-4 text-right text-gray-700 font-mono">{quote.weight.toLocaleString()} lbs</td>
                  <td className="px-6 py-4 text-right font-bold text-emerald-700">{formatCurrency(quote.est_total || 0)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(quote.status)}`}>
                      {capitalize(quote.status)}
                    </span>
                  </td>
                  {role !== 'shipper' && (
                    <td className="sticky-actions px-6 py-4">
                      <QuoteActions quoteId={quote.id} status={quote.status} />
                    </td>
                  )}
                </tr>
              ))}
              {quotes.length === 0 && (
                <tr>
                  <td colSpan={columnCount} className="px-6 py-16 text-center text-gray-400">
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