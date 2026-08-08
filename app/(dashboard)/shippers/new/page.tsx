import ShipperForm from '@/components/shippers/shipper-form';

export default function NewShipperPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Shipper</h1>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl">
        <ShipperForm />
      </div>
    </div>
  );
}