// components/load-board/bid-modal.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBid } from '@/actions/bids';
import type { Load } from '@/types';

interface BidModalProps {
  load: Load;
  onClose: () => void;
}

export default function BidModal({ load, onClose }: BidModalProps) {
  const [amount, setAmount] = useState(Math.round((load.bid_total || 0) * 0.92).toString());
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const bidAmount = parseFloat(amount);
    if (isNaN(bidAmount) || bidAmount <= 0) {
      alert('Enter a valid bid amount');
      return;
    }

    setLoading(true);
    try {
      await createBid(load.id, bidAmount);
      alert('Bid submitted successfully!');
      onClose();
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Failed to submit bid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Place Bid</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Load: <span className="font-semibold">{load.load_id}</span></p>
          <p className="text-sm text-gray-600 mb-1">Route: {load.origin} → {load.destination}</p>
          <p className="text-sm text-gray-600">Broker rate: <span className="font-semibold">${(load.bid_total || 0).toFixed(2)}</span></p>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your bid amount</label>
          <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
        </div>
        <div className="flex gap-3">
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50">
            {loading ? 'Submitting...' : 'Submit Bid'}
          </button>
          <button onClick={onClose}
            className="flex-1 border border-gray-300 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
