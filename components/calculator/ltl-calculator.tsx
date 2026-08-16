// // components/calculator/ltl-calculator.tsx
// 'use client';

// import { useState, useMemo } from 'react';

// // Standard NMFC density-based classification table — this is the publicly
// // published industry-standard density-to-class chart used across LTL
// // freight (the same one uShip/FedEx-style calculators reference). Exact
// // figures can vary slightly by specific NMFC item/edition, so this gives
// // a reliable estimate, not a guaranteed final classification — a broker
// // or the carrier's own rating should confirm the final class for billing.
// const DENSITY_CLASS_TABLE: { maxDensity: number; nmfcClass: string }[] = [
//   { maxDensity: 1, nmfcClass: '400' },
//   { maxDensity: 2, nmfcClass: '300' },
//   { maxDensity: 4, nmfcClass: '250' },
//   { maxDensity: 6, nmfcClass: '175' },
//   { maxDensity: 8, nmfcClass: '125' },
//   { maxDensity: 10, nmfcClass: '100' },
//   { maxDensity: 12, nmfcClass: '92.5' },
//   { maxDensity: 15, nmfcClass: '85' },
//   { maxDensity: 22.5, nmfcClass: '70' },
//   { maxDensity: 30, nmfcClass: '65' },
//   { maxDensity: Infinity, nmfcClass: '60' },
// ];

// function classifyDensity(densityPcf: number): string {
//   const bracket = DENSITY_CLASS_TABLE.find((b) => densityPcf < b.maxDensity);
//   return bracket ? bracket.nmfcClass : '60';
// }

// export default function LtlCalculator() {
//   const [quantity, setQuantity] = useState('1');
//   const [stackable, setStackable] = useState(true);
//   const [length, setLength] = useState('');
//   const [width, setWidth] = useState('');
//   const [height, setHeight] = useState('');
//   const [totalWeight, setTotalWeight] = useState('');
//   const [nmfcCode, setNmfcCode] = useState('');
//   const [manualClassOverride, setManualClassOverride] = useState('');
//   const [pickupZip, setPickupZip] = useState('');
//   const [deliveryZip, setDeliveryZip] = useState('');
//   const [manualRate, setManualRate] = useState('');

//   const calc = useMemo(() => {
//     const qty = parseFloat(quantity) || 0;
//     const l = parseFloat(length) || 0;
//     const w = parseFloat(width) || 0;
//     const h = parseFloat(height) || 0;
//     const weight = parseFloat(totalWeight) || 0;

//     const cubicFeetPerPiece = (l * w * h) / 1728;
//     const totalCubicFeet = cubicFeetPerPiece * qty;
//     const density = totalCubicFeet > 0 ? weight / totalCubicFeet : 0;
//     const suggestedClass = density > 0 ? classifyDensity(density) : null;

//     return { cubicFeetPerPiece, totalCubicFeet, density, suggestedClass };
//   }, [quantity, length, width, height, totalWeight]);

//   const finalClass = manualClassOverride || calc.suggestedClass;

//   return (
//     <div className="max-w-4xl">
//       <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-1">LTL Freight Details</h2>
//         <p className="text-sm text-gray-500 mb-6">
//           Calculates density and suggested NMFC class from your shipment dimensions.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Number of pieces</label>
//             <input
//               type="number"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               placeholder="12"
//               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Total weight (lbs)</label>
//             <input
//               type="number"
//               value={totalWeight}
//               onChange={(e) => setTotalWeight(e.target.value)}
//               placeholder="16972"
//               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-4 mb-2">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Length (in)</label>
//             <input
//               type="number"
//               value={length}
//               onChange={(e) => setLength(e.target.value)}
//               placeholder="48"
//               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Width (in)</label>
//             <input
//               type="number"
//               value={width}
//               onChange={(e) => setWidth(e.target.value)}
//               placeholder="40"
//               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Height (in)</label>
//             <input
//               type="number"
//               value={height}
//               onChange={(e) => setHeight(e.target.value)}
//               placeholder="42"
//               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
//             />
//           </div>
//         </div>
//         <p className="text-xs text-gray-400 mb-5">Per-piece dimensions — total volume is calculated as pieces × L × W × H.</p>

//         <label className="flex items-center gap-2 mb-6">
//           <input
//             type="checkbox"
//             checked={!stackable}
//             onChange={(e) => setStackable(!e.target.checked)}
//             className="rounded border-gray-300"
//           />
//           <span className="text-sm text-gray-700">Non-stackable</span>
//           <span className="text-xs text-gray-400">(usually adds an accessorial charge — not reflected in class/density below)</span>
//         </label>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">NMFC code (optional)</label>
//             <input
//               type="text"
//               value={nmfcCode}
//               onChange={(e) => setNmfcCode(e.target.value)}
//               placeholder="171800"
//               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Override class (optional)</label>
//             <input
//               type="text"
//               value={manualClassOverride}
//               onChange={(e) => setManualClassOverride(e.target.value)}
//               placeholder="Leave blank to use calculated class"
//               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pickup ZIP</label>
//             <input
//               type="text"
//               value={pickupZip}
//               onChange={(e) => setPickupZip(e.target.value)}
//               placeholder="30165"
//               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Delivery ZIP</label>
//             <input
//               type="text"
//               value={deliveryZip}
//               onChange={(e) => setDeliveryZip(e.target.value)}
//               placeholder="44081"
//               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Calculated Density & Class</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-gray-50 rounded-lg p-4">
//             <p className="text-xs text-gray-500 mb-1">Cubic feet / piece</p>
//             <p className="text-lg font-bold text-gray-900">{calc.cubicFeetPerPiece.toFixed(2)}</p>
//           </div>
//           <div className="bg-gray-50 rounded-lg p-4">
//             <p className="text-xs text-gray-500 mb-1">Total cubic feet</p>
//             <p className="text-lg font-bold text-gray-900">{calc.totalCubicFeet.toFixed(1)}</p>
//           </div>
//           <div className="bg-gray-50 rounded-lg p-4">
//             <p className="text-xs text-gray-500 mb-1">Density (lbs/ft³)</p>
//             <p className="text-lg font-bold text-gray-900">{calc.density.toFixed(1)}</p>
//           </div>
//           <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
//             <p className="text-xs text-amber-700 mb-1">
//               {manualClassOverride ? 'Override class' : 'Suggested class'}
//             </p>
//             <p className="text-lg font-bold text-amber-900">{finalClass || '—'}</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//         <h2 className="text-lg font-semibold text-gray-900 mb-1">Rate</h2>
//         <p className="text-sm text-gray-500 mb-4">
//           No live rate table is connected yet — enter a rate manually from your
//           carrier or factoring partner's quote until one is integrated.
//         </p>
//         <div className="max-w-xs">
//           <label className="block text-sm font-semibold text-gray-700 mb-1.5">Quoted rate ($)</label>
//           <input
//             type="number"
//             value={manualRate}
//             onChange={(e) => setManualRate(e.target.value)}
//             placeholder="0.00"
//             className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
// components/calculator/ltl-calculator.tsx
'use client';

import { useState, useMemo } from 'react';

// Standard NMFC density-based classification table — this is the publicly
// published industry-standard density-to-class chart used across LTL
// freight (the same one uShip/FedEx-style calculators reference). Exact
// figures can vary slightly by specific NMFC item/edition, so this gives
// a reliable estimate, not a guaranteed final classification — a broker
// or the carrier's own rating should confirm the final class for billing.
const DENSITY_CLASS_TABLE: { maxDensity: number; nmfcClass: string }[] = [
  { maxDensity: 1, nmfcClass: '400' },
  { maxDensity: 2, nmfcClass: '300' },
  { maxDensity: 4, nmfcClass: '250' },
  { maxDensity: 6, nmfcClass: '175' },
  { maxDensity: 8, nmfcClass: '125' },
  { maxDensity: 10, nmfcClass: '100' },
  { maxDensity: 12, nmfcClass: '92.5' },
  { maxDensity: 15, nmfcClass: '85' },
  { maxDensity: 22.5, nmfcClass: '70' },
  { maxDensity: 30, nmfcClass: '65' },
  { maxDensity: Infinity, nmfcClass: '60' },
];

function classifyDensity(densityPcf: number): string {
  const bracket = DENSITY_CLASS_TABLE.find((b) => densityPcf < b.maxDensity);
  return bracket ? bracket.nmfcClass : '60';
}

export default function LtlCalculator() {
  const [quantity, setQuantity] = useState('1');
  const [stackable, setStackable] = useState(true);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [totalWeight, setTotalWeight] = useState('');
  const [nmfcCode, setNmfcCode] = useState('');
  const [manualClassOverride, setManualClassOverride] = useState('');
  const [pickupZip, setPickupZip] = useState('');
  const [deliveryZip, setDeliveryZip] = useState('');
  const [manualRate, setManualRate] = useState('');

  const calc = useMemo(() => {
    const qty = parseFloat(quantity) || 0;
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const weight = parseFloat(totalWeight) || 0;

    const cubicFeetPerPiece = (l * w * h) / 1728;
    const totalCubicFeet = cubicFeetPerPiece * qty;
    const density = totalCubicFeet > 0 ? weight / totalCubicFeet : 0;
    const suggestedClass = density > 0 ? classifyDensity(density) : null;

    return { cubicFeetPerPiece, totalCubicFeet, density, suggestedClass };
  }, [quantity, length, width, height, totalWeight]);

  const finalClass = manualClassOverride || calc.suggestedClass;
  const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="max-w-4xl">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
        <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">LTL Freight Details</h2>
            <p className="text-sm text-slate-300 mt-0.5">
              Calculates density and suggested NMFC class from your shipment dimensions.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelClass}>Number of pieces</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="12"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Total weight (lbs)</label>
              <input
                type="number"
                value={totalWeight}
                onChange={(e) => setTotalWeight(e.target.value)}
                placeholder="16972"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-2">
            <div>
              <label className={labelClass}>Length (in)</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="48"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Width (in)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="40"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Height (in)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="42"
                className={inputClass}
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-5">Per-piece dimensions — total volume is calculated as pieces × L × W × H.</p>

          <label className="flex items-center gap-2 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={!stackable}
              onChange={(e) => setStackable(!e.target.checked)}
              className="rounded border-gray-300 text-slate-900 focus:ring-slate-900"
            />
            <span className="text-sm text-gray-700 font-medium">Non-stackable</span>
            <span className="text-xs text-gray-400">(usually adds an accessorial charge — not reflected in class/density below)</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelClass}>NMFC code (optional)</label>
              <input
                type="text"
                value={nmfcCode}
                onChange={(e) => setNmfcCode(e.target.value)}
                placeholder="171800"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Override class (optional)</label>
              <input
                type="text"
                value={manualClassOverride}
                onChange={(e) => setManualClassOverride(e.target.value)}
                placeholder="Leave blank to use calculated class"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Pickup ZIP</label>
              <input
                type="text"
                value={pickupZip}
                onChange={(e) => setPickupZip(e.target.value)}
                placeholder="30165"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Delivery ZIP</label>
              <input
                type="text"
                value={deliveryZip}
                onChange={(e) => setDeliveryZip(e.target.value)}
                placeholder="44081"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
        <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-white">Calculated Density & Class</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-sky-50 border border-sky-100 rounded-lg p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-sky-500" />
              <p className="text-xs text-sky-700 uppercase tracking-wide font-semibold mb-1 pl-1">Cubic feet / piece</p>
              <p className="text-xl font-bold text-sky-900 font-mono pl-1">{calc.cubicFeetPerPiece.toFixed(2)}</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
              <p className="text-xs text-indigo-700 uppercase tracking-wide font-semibold mb-1 pl-1">Total cubic feet</p>
              <p className="text-xl font-bold text-indigo-900 font-mono pl-1">{calc.totalCubicFeet.toFixed(1)}</p>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
              <p className="text-xs text-purple-700 uppercase tracking-wide font-semibold mb-1 pl-1">Density (lbs/ft³)</p>
              <p className="text-xl font-bold text-purple-900 font-mono pl-1">{calc.density.toFixed(1)}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
              <p className="text-xs text-amber-700 uppercase tracking-wide font-semibold mb-1 pl-1">
                {manualClassOverride ? 'Override class' : 'Suggested class'}
              </p>
              <p className="text-xl font-bold text-amber-900 pl-1">{finalClass || '—'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v10M8.5 9.5a2.5 2.5 0 0 1 2.5-1.5h1.5a2.25 2.25 0 0 1 0 4.5H11a2.25 2.25 0 0 0 0 4.5h2a2.5 2.5 0 0 0 2.5-1.5" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Rate</h2>
            <p className="text-sm text-slate-300 mt-0.5">
              No live rate table is connected yet — enter a rate manually from your
              carrier or factoring partner's quote until one is integrated.
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="max-w-xs">
            <label className={labelClass}>Quoted rate ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700 font-semibold text-sm">$</span>
              <input
                type="number"
                value={manualRate}
                onChange={(e) => setManualRate(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2 text-sm font-bold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}