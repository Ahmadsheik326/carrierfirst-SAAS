'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateLoadStatus } from '@/actions/load-status';
import DocumentUploadModal from '@/components/loads/document-upload-modal';

interface StatusActionsProps {
  loadId: string;
  status: string;
  isBroker: boolean;
}

export default function StatusActions({ loadId, status, isBroker }: StatusActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [promptDoc, setPromptDoc] = useState<'bol' | 'pod' | null>(null);

  const advance = (newStatus: string) => {
    startTransition(async () => {
      try {
        await updateLoadStatus(loadId, newStatus);
        router.refresh();

        if (!isBroker) {
          if (newStatus === 'picked_up') setPromptDoc('bol');
          if (newStatus === 'delivered') setPromptDoc('pod');
        }
      } catch (err: any) {
        alert(err.message || 'Failed to update status');
      }
    });
  };

  return (
    <>
      {status === 'booked' && (
        <button
          onClick={() => advance('picked_up')}
          disabled={isPending}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors disabled:opacity-50"
        >
          {isPending ? '...' : 'Mark Picked Up'}
        </button>
      )}

      {status === 'picked_up' && (
        <button
          onClick={() => advance('in_transit')}
          disabled={isPending}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors disabled:opacity-50"
        >
          {isPending ? '...' : 'Mark In Transit'}
        </button>
      )}

      {status === 'in_transit' && (
        <button
          onClick={() => advance('delivered')}
          disabled={isPending}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors disabled:opacity-50"
        >
          {isPending ? '...' : 'Mark Delivered'}
        </button>
      )}

      {status === 'delivered' && (
        <span className="text-xs text-emerald-700 font-medium">Delivered</span>
      )}

      {!['booked', 'picked_up', 'in_transit', 'delivered'].includes(status) && (
        <span className="text-xs text-gray-400">—</span>
      )}

      {promptDoc && (
        <DocumentUploadModal loadId={loadId} docType={promptDoc} onClose={() => setPromptDoc(null)} />
      )}
    </>
  );
}