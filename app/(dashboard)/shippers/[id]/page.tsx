// // app/(dashboard)/shippers/[id]/page.tsx
// import { createClient } from '@/lib/supabase/server';
// import { notFound } from 'next/navigation';
// import { getEntityDocuments } from '@/actions/documents';
// import { DocumentList } from '@/components/documents/document-list';

// export default async function ShipperDetailPage({ params }: { params: { id: string } }) {
//   const supabase = await createClient();
  
//   const { data: shipper } = await supabase
//     .from('shippers')
//     .select('*')
//     .eq('id', params.id)
//     .single();

//   if (!shipper) notFound();

//   const documents = await getEntityDocuments('shipper', params.id);

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl border border-slate-200 p-6">
//         <h1 className="text-2xl font-bold text-slate-900">{shipper.company_name || 'Shipper'}</h1>
//         <p className="text-sm text-slate-500 mt-1">ID: {shipper.id}</p>
//       </div>

//       <DocumentList 
//         documents={documents} 
//         entityType="shipper" 
//         entityId={params.id} 
//         isBroker={true} 
//         allowUpload={false} 
//       />
//     </div>
//   );
// }
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { getEntityDocuments } from '@/actions/documents';
import { DocumentList } from '@/components/documents/document-list';

export default async function ShipperDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: shipper } = await supabase
    .from('shippers')
    .select('*')
    .eq('id', id)
    .single();

  if (!shipper) notFound();

  const documents = await getEntityDocuments('shipper', id);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900">{shipper.company_name || 'Shipper'}</h1>
        <p className="text-sm text-slate-500 mt-1">ID: {shipper.id}</p>
      </div>

      <DocumentList 
        documents={documents} 
        entityType="shipper" 
        entityId={id} 
        isBroker={true} 
        allowUpload={false} 
      />
    </div>
  );
}