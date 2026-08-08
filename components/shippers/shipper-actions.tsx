'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateShipperStatus, deleteShipper } from '@/actions/shippers';

interface ShipperActionsProps {
  shipperId: string;
  status: string;
}

export default function ShipperActions({ shipperId, status }: ShipperActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const runAction = (fn: () => Promise<any>) => {
    setError(null);
    startTransition(async () => {
      try {
        await fn();
        router.refresh();
      } catch (err: any) {
        setError(err.message || 'Action failed');
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <button
          onClick={() => router.push(`/shippers/${shipperId}/edit`)}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          Edit
        </button>

        {status !== 'active' && (
          <button
            onClick={() => runAction(() => updateShipperStatus(shipperId, 'active'))}
            disabled={isPending}
            className="px-3 py-1.5 rounded-md text-xs font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors disabled:opacity-50"
          >
            {isPending ? '...' : 'Activate'}
          </button>
        )}

        {status !== 'suspended' && (
          <button
            onClick={() => runAction(() => updateShipperStatus(shipperId, 'suspended'))}
            disabled={isPending}
            className="px-3 py-1.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors disabled:opacity-50"
          >
            {isPending ? '...' : 'Suspend'}
          </button>
        )}

        <button
          onClick={() => {
            if (confirm('Delete this shipper permanently?')) {
              runAction(() => deleteShipper(shipperId));
            }
          }}
          disabled={isPending}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50"
        >
          Delete
        </button>
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}