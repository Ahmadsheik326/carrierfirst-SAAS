// import FreightCalculator from '@/components/calculator/freight-calculator';
 
// export default function CalculatorPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">DAT Calculator</h1>
//       <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//         <FreightCalculator showSubmit />
//       </div>
//     </div>
//   );
// }
 
import FreightCalculator from '@/components/calculator/freight-calculator';

export default function CalculatorPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">DAT Calculator</h1>
        <p className="text-sm text-gray-500 mt-1">Freds Data pricing — enter shipment details for a live rate.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-amber-500 via-slate-900 to-amber-500" />
        <div className="p-6">
          <FreightCalculator showSubmit />
        </div>
      </div>
    </div>
  );
}