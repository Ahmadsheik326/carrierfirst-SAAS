import FreightCalculator from '@/components/calculator/freight-calculator';
 
export default function CalculatorPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">DAT Calculator</h1>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <FreightCalculator showSubmit />
      </div>
    </div>
  );
}
 