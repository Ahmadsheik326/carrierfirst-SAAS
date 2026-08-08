'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createShipper, updateShipper, type ShipperFormInput } from '@/actions/shippers';

interface ShipperFormProps {
  shipperId?: string;
  initialValues?: Partial<ShipperFormInput>;
}

export default function ShipperForm({ shipperId, initialValues }: ShipperFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ShipperFormInput>({
    company_name: initialValues?.company_name || '',
    credit_limit: initialValues?.credit_limit ?? 0,
    credit_balance: initialValues?.credit_balance ?? 0,
    payment_terms: initialValues?.payment_terms || 'Net 30',
  });

  const handleSubmit = () => {
    setError(null);
    startTransition(async () => {
      try {
        if (shipperId) {
          await updateShipper(shipperId, form);
        } else {
          await createShipper(form);
        }
        router.push('/shippers');
        router.refresh();
      } catch (err: any) {
        setError(err.message || 'Failed to save shipper');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company name *</label>
          <input
            type="text"
            value={form.company_name}
            onChange={(e) => setForm((p) => ({ ...p, company_name: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="e.g. Acme Manufacturing Inc"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Credit limit ($)</label>
          <input
            type="number"
            value={form.credit_limit}
            onChange={(e) => setForm((p) => ({ ...p, credit_limit: parseFloat(e.target.value) || 0 }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current balance ($)</label>
          <input
            type="number"
            value={form.credit_balance}
            onChange={(e) => setForm((p) => ({ ...p, credit_balance: parseFloat(e.target.value) || 0 }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">Amount currently owed against the credit limit</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Payment terms</label>
          <select
            value={form.payment_terms}
            onChange={(e) => setForm((p) => ({ ...p, payment_terms: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="Due on receipt">Due on receipt</option>
            <option value="Net 15">Net 15</option>
            <option value="Net 30">Net 30</option>
            <option value="Net 45">Net 45</option>
            <option value="Net 60">Net 60</option>
            <option value="COD">COD</option>
          </select>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isPending ? 'Saving...' : shipperId ? 'Save changes' : 'Add shipper'}
        </button>
        <button
          onClick={() => router.push('/shippers')}
          className="bg-white border border-gray-300 text-gray-900 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}