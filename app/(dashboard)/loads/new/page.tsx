'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createLoad } from '@/actions/loads';
import FreightCalculator from '@/components/calculator/freight-calculator';
import type { CalculationResult, LoadInput } from '@/types';

export default function NewLoadPage() {
  const router = useRouter();
  const [shipperName, setShipperName] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
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
      await createLoad({
        shipper_name: shipperName,
        origin,
        destination,
        equipment_type: calcInput.equipment,
        mileage: calcInput.mileage,
        weight: calcInput.weight,
        stops: calcInput.stops,
        tarp: calcInput.tarp,
        region_x: calcInput.regionX,
      });
      alert('Load created successfully!');
      router.push('/loads');
    } catch (err: any) {
      alert(err.message || 'Failed to create load');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Load</h1>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Load Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Shipper name</label>
            <input type="text" value={shipperName} onChange={(e) => setShipperName(e.target.value)} placeholder="Shipper company name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Origin</label>
            <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Chicago, IL"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Destination</label>
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Houston, TX"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Specifications & Pricing</h2>
        <FreightCalculator onCalculate={handleCalculate} showSubmit />
        {calcResult && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Estimated bid total</p>
                <p className="text-2xl font-bold text-gray-900">{calcResult.bidTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              </div>
              <button onClick={handleSubmit} disabled={loading}
                className="bg-gray-900 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50">
                {loading ? 'Creating...' : 'Create Load'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
