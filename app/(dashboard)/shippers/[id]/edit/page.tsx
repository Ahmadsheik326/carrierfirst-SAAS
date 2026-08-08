import { getShipperById } from '@/actions/shippers';
import ShipperForm from '@/components/shippers/shipper-form';

export default async function EditShipperPage({ params }: { params: { id: string } }) {
  const shipper = await getShipperById(params.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Shipper</h1>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl">
        <ShipperForm
          shipperId={shipper.id}
          initialValues={{
            company_name: shipper.company_name,
            credit_limit: shipper.credit_limit,
            credit_balance: shipper.credit_balance,
            payment_terms: shipper.payment_terms,
          }}
        />
      </div>
    </div>
  );
}