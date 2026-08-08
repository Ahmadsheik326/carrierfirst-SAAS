// import { getCarrierById } from '@/actions/carriers';
// import CarrierForm from '@/components/carriers/carrier-form';

// export default async function EditCarrierPage({ params }: { params: { id: string } }) {
//   const carrier = await getCarrierById(params.id);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Carrier</h1>
//       <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-3xl">
//         <CarrierForm
//           carrierId={carrier.id}
//           initialValues={{
//             company_name: carrier.company_name,
//             mc_number: carrier.mc_number,
//             dot_number: carrier.dot_number,
//             insurance_status: carrier.insurance_status,
//             insurance_expiry: carrier.insurance_expiry,
//             safety_rating: carrier.safety_rating,
//             equipment_types: carrier.equipment_types || [],
//             preferred_lanes: carrier.preferred_lanes || [],
//           }}
//         />
//       </div>
//     </div>
//   );
// }
import { getCarrierById } from '@/actions/carriers';
import CarrierForm from '@/components/carriers/carrier-form';

export default async function EditCarrierPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const carrier = await getCarrierById(id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Carrier</h1>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-3xl">
        <CarrierForm
          carrierId={carrier.id}
          initialValues={{
            company_name: carrier.company_name,
            mc_number: carrier.mc_number,
            dot_number: carrier.dot_number,
            insurance_status: carrier.insurance_status,
            insurance_expiry: carrier.insurance_expiry,
            safety_rating: carrier.safety_rating,
            // add any other fields your form needs
          }}
        />
      </div>
    </div>
  );
}