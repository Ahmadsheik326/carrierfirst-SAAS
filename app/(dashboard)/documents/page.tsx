
// app/(dashboard)/documents/page.tsx
import { getMyDocuments } from '@/actions/documents';
import { DocumentList } from '@/components/documents/document-list';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DocumentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('users')
    .select('role, id')
    .eq('id', user.id)
    .single();

  const isBroker = profile?.role === 'broker_admin' || profile?.role === 'broker_staff' || profile?.role === 'super_admin';
  
  // FIX: Determine actual entity type from user role
  let entityType: 'carrier' | 'shipper' | 'broker' = 'carrier';
  if (isBroker) entityType = 'broker';
  else if (profile?.role === 'shipper') entityType = 'shipper';

  const documents = await getMyDocuments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Document Vault</h1>
        <p className="text-sm text-slate-500 mt-1">
          {isBroker 
            ? 'Review and manage carrier and shipper documents' 
            : 'Manage your uploaded documents and compliance files'}
        </p>
      </div>

      <DocumentList
        documents={documents}
        entityType={entityType}
        entityId={profile?.id || user.id}
        isBroker={isBroker}
        allowUpload={!isBroker}
      />
    </div>
  );
}