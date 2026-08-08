// app/(dashboard)/pricing/page.tsx
import { createClient } from '@/lib/supabase/server';
import { getPricingMatrix } from '@/actions/pricing';
import { EQUIPMENT_TYPES, MARKETS } from '@/lib/constants/pricing';
import PricingTable from '@/components/pricing/pricing-table';

export default async function PricingPage() {
  const matrix = await getPricingMatrix();

  // Build matrix from DB entries or use defaults
  const matrixMap: Record<string, Record<string, { id: string; rpm: number }>> = {};

  EQUIPMENT_TYPES.forEach((eq) => {
    matrixMap[eq] = {};
    MARKETS.forEach((m) => {
      const entry = matrix.find((e) => e.equipment_type === eq && e.market === m);
      matrixMap[eq][m] = {
        id: entry?.id || '',
        rpm: entry?.rpm || 2.50,
      };
    });
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Freds Data — Pricing Table</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Base RPM by Equipment & Market</h2>
        <PricingTable matrix={matrixMap} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add-ons & Flat Fees</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Region X surcharge</span>
              <span className="font-medium">$350.00</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Stop fee (per stop)</span>
              <span className="font-medium">$75.00</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Tarp fee</span>
              <span className="font-medium">$100.00</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Service charge 1</span>
              <span className="font-medium">$3.25</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Service charge 2</span>
              <span className="font-medium">$2.65</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Service charge 3</span>
              <span className="font-medium">$1.75</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Short-Mile & Weight Rules</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Hot Shot &lt; 200 mi</span>
              <span className="font-medium">$350.00</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Flatbed/Stepdeck &lt; 200 mi</span>
              <span className="font-medium">$500.00</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Flatbed/Stepdeck 201–275 mi</span>
              <span className="font-medium">$100.00</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Weight Adjustment (Hot Shot only)</h3>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">&lt; 3,000 lbs</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">3,100 – 10,000 lbs</span>
                <span className="font-medium">+$0.1084/mi</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">10,000 – 14,999 lbs</span>
                <span className="font-medium">+$0.10/mi</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">15,000 – 20,000 lbs</span>
                <span className="font-medium">+$0.10/mi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
