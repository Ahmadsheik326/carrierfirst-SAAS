// components/bids/bid-actions.tsx
'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { acceptBid, rejectBid } from '@/actions/bids';

interface BidActionsProps {
  bidId: string;
  loadId: string;
}

export default function BidActions({ bidId, loadId }: BidActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAccept = () => {
    startTransition(async () => {
      await acceptBid(bidId);
      router.refresh();
    });
  };

  const handleReject = () => {
    startTransition(async () => {
      await rejectBid(bidId);
      router.refresh();
    });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleAccept}
        disabled={isPending}
        
        className="px-3 py-1.5 rounded-md text-xs font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors disabled:opacity-50"
      >
        {isPending ? '...' : 'Accept'}
      </button>
      <button
        onClick={handleReject}
        disabled={isPending}
        className="px-3 py-1.5 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50"
      >
        {isPending ? '...' : 'Reject'}
      </button>
    </div>
  );
}