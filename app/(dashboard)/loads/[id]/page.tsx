import { createClient } from '@/lib/supabase/server';
import { getLoadDocuments } from '@/actions/documents';
import { formatCurrency } from '@/lib/utils/calculator';
import { getStatusColor, capitalize } from '@/lib/utils/helpers';
import StatusActions from '@/components/loads/status-actions';
import LoadDocuments from '@/components/loads/load-documents';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function LoadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user?.id)
    .single();

  const role = userData?.role || 'shipper';
  const isBroker = role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin';

  const { data: load } = await supabase
    .from('loads')
    .select('*')
    .eq('id', id)
    .single();

  if (!load) notFound();

  const isAssignedCarrier = load.carrier_id === user?.id;
  const docs = await getLoadDocuments(id);

  return (
    <div>
      <Link href="/loads" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">
        ← Back to loads
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{load.load_id}</h1>
          <p className="text-sm text-gray-500 mt-1">{load.origin} → {load.destination}</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border ${getStatusColor(load.status)}`}>
          {capitalize(load.status)}
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Equipment</p>
            <p className="text-gray-900 font-medium">{load.equipment_type}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Miles</p>
            <p className="text-gray-900 font-medium">{load.mileage?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Weight</p>
            <p className="text-gray-900 font-medium">{load.weight?.toLocaleString()} lbs</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Bid Total</p>
            <p className="text-gray-900 font-medium">{formatCurrency(load.bid_total || 0)}</p>
          </div>
        </div>
        {(isBroker || isAssignedCarrier) && (
          <StatusActions loadId={load.id} status={load.status} isBroker={isBroker} />
        )}
      </div>

      <LoadDocuments
        loadId={load.id}
        docs={docs}
        canUploadRateCon={isBroker && !!load.carrier_id}
        canUploadCarrierDocs={isAssignedCarrier}
      />
    </div>
  );
}