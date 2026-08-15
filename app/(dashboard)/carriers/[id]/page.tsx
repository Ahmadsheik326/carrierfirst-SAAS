// // app/(dashboard)/carriers/[id]/page.tsx
// import { createClient } from '@/lib/supabase/server';
// import { notFound } from 'next/navigation';
// import { getEntityDocuments } from '@/actions/documents';
// import { DocumentList } from '@/components/documents/document-list';

// export default async function CarrierDetailPage({ params }: { params: { id: string } }) {
//   const supabase = await createClient();
  
//   const { data: carrier } = await supabase
//     .from('carriers')
//     .select('*')
//     .eq('id', params.id)
//     .single();

//   if (!carrier) notFound();

//   const documents = await getEntityDocuments('carrier', params.id);

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl border border-slate-200 p-6">
//         <h1 className="text-2xl font-bold text-slate-900">{carrier.company_name}</h1>
//         <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
//           <div>
//             <p className="text-slate-500">MC Number</p>
//             <p className="font-medium text-slate-900">{carrier.mc_number || '—'}</p>
//           </div>
//           <div>
//             <p className="text-slate-500">DOT Number</p>
//             <p className="font-medium text-slate-900">{carrier.dot_number || '—'}</p>
//           </div>
//           <div>
//             <p className="text-slate-500">Insurance Status</p>
//             <p className="font-medium text-slate-900">{carrier.insurance_status || '—'}</p>
//           </div>
//           <div>
//             <p className="text-slate-500">Safety Rating</p>
//             <p className="font-medium text-slate-900">{carrier.safety_rating || '—'}</p>
//           </div>
//         </div>
//       </div>

//       <DocumentList 
//         documents={documents} 
//         entityType="carrier" 
//         entityId={params.id} 
//         isBroker={true} 
//         allowUpload={false} 
//       />
//     </div>
//   );
// }
// app/(dashboard)/carriers/[id]/page.tsx
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { getEntityDocuments } from '@/actions/documents';
import { DocumentList } from '@/components/documents/document-list';

export default async function CarrierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: carrier } = await supabase
    .from('carriers')
    .select('*')
    .eq('id', id)
    .single();

  if (!carrier) notFound();

  const documents = await getEntityDocuments('carrier', id);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900">{carrier.company_name || 'Carrier'}</h1>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div><p className="text-slate-500">MC Number</p><p className="font-medium text-slate-900">{carrier.mc_number || '—'}</p></div>
          <div><p className="text-slate-500">DOT Number</p><p className="font-medium text-slate-900">{carrier.dot_number || '—'}</p></div>
          <div><p className="text-slate-500">Insurance</p><p className="font-medium text-slate-900">{carrier.insurance_status || '—'}</p></div>
          <div><p className="text-slate-500">Safety Rating</p><p className="font-medium text-slate-900">{carrier.safety_rating || '—'}</p></div>
        </div>
      </div>

      <DocumentList 
        documents={documents} 
        entityType="carrier" 
        entityId={id} 
        isBroker={true} 
        allowUpload={false} 
      />
    </div>
  );
}