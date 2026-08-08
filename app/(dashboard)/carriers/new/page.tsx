import CarrierForm from '@/components/carriers/carrier-form';

export default function NewCarrierPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Carrier</h1>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-3xl">
        <CarrierForm />
      </div>
    </div>
  );
}