// components/quotes/quote-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createQuoteRequest } from '@/actions/quotes';
import { calculateFreight } from '@/lib/utils/calculator';
import { EQUIPMENT_TYPES, MARKETS } from '@/lib/constants/pricing';
import FreightCalculator from '@/components/calculator/freight-calculator';
import type { CalculationResult, LoadInput } from '@/types';

export default function QuoteForm() {
  const router = useRouter();
  const [shipperName, setShipperName] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [market, setMarket] = useState<string>(MARKETS[0]);
  const [calcResult, setCalcResult] = useState<CalculationResult | null>(null);
  const [calcInput, setCalcInput] = useState<LoadInput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = (result: CalculationResult, input: LoadInput) => {
    setCalcResult(result);
    setCalcInput(input);
  };

  const handleSubmit = async () => {
    if (!calcResult || !calcInput) return;
    if (!shipperName || !origin || !destination) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await createQuoteRequest({
        shipper_name: shipperName,
        origin,
        destination,
        equipment_type: calcInput.equipment,
        mileage: calcInput.mileage,
        weight: calcInput.weight,
        stops: calcInput.stops,
        tarp: calcInput.tarp,
        region_x: calcInput.regionX,
        market,
        est_total: calcResult.bidTotal,
      });
      alert('Quote request submitted successfully!');
      router.push('/');
    } catch (err: any) {
      alert(err.message || 'Failed to submit quote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipper Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company name</label>
            <input type="text" value={shipperName} onChange={(e) => setShipperName(e.target.value)} placeholder="Your company name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Market</label>
            <select value={market} onChange={(e) => setMarket(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
              {MARKETS.map((m) => (<option key={m} value={m}>{m}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pickup city / state</label>
            <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="e.g. Chicago, IL"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Delivery city / state</label>
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Houston, TX"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Load Specifications</h2>
        {/* <FreightCalculator onCalculate={handleCalculate} showSubmit /> */}
<FreightCalculator onCalculate={handleCalculate} showSubmit hideMargin />
        {calcResult && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Estimated total</p>
                <p className="text-2xl font-bold text-gray-900">{calcResult.bidTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              </div>
              <button onClick={handleSubmit} disabled={loading}
                className="bg-gray-900 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50">
                {loading ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
