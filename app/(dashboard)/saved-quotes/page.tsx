import { getSavedQuotes } from '@/actions/saved-quotes';
import { formatCurrency } from '@/lib/utils/calculator';

export default async function SavedQuotesPage() {
  const savedQuotes = await getSavedQuotes();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Quotes</h1>

      {savedQuotes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center text-gray-500 text-sm">
          No saved quotes yet. Save one from the DAT Calculator.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3">Equipment</th>
                <th className="px-4 py-3">Market</th>
                <th className="px-4 py-3">Miles</th>
                <th className="px-4 py-3">Weight</th>
                <th className="px-4 py-3">Bid Total</th>
                <th className="px-4 py-3">Saved</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {savedQuotes.map((q: any) => (
                <tr key={q.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">{q.equipment_type}</td>
                  <td className="px-4 py-3">{q.market}</td>
                  <td className="px-4 py-3">{q.mileage}</td>
                  <td className="px-4 py-3">{q.weight} lbs</td>
                  <td className="px-4 py-3 font-semibold">{formatCurrency(q.bid_total)}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(q.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {q.converted_to_quote_id ? (
                      <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-md px-2 py-1">
                        Converted
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-md px-2 py-1">
                        Not converted
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}