'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createCarrier, updateCarrier, type CarrierFormInput } from '@/actions/carriers';
import { EQUIPMENT_TYPES } from '@/lib/constants/pricing';

interface CarrierFormProps {
  carrierId?: string; // present when editing
  initialValues?: Partial<CarrierFormInput>;
}

export default function CarrierForm({ carrierId, initialValues }: CarrierFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<CarrierFormInput>({
    company_name: initialValues?.company_name || '',
    mc_number: initialValues?.mc_number || '',
    dot_number: initialValues?.dot_number || '',
    insurance_status: initialValues?.insurance_status || 'pending',
    insurance_expiry: initialValues?.insurance_expiry || '',
    safety_rating: initialValues?.safety_rating || '',
    equipment_types: initialValues?.equipment_types || [],
    preferred_lanes: initialValues?.preferred_lanes || [],
  });

  const [lanesInput, setLanesInput] = useState((initialValues?.preferred_lanes || []).join(', '));

  const toggleEquipment = (eq: string) => {
    setForm((prev) => ({
      ...prev,
      equipment_types: prev.equipment_types?.includes(eq)
        ? prev.equipment_types.filter((e) => e !== eq)
        : [...(prev.equipment_types || []), eq],
    }));
  };

  const handleSubmit = () => {
    setError(null);
    const payload: CarrierFormInput = {
      ...form,
      preferred_lanes: lanesInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    startTransition(async () => {
      try {
        if (carrierId) {
          await updateCarrier(carrierId, payload);
        } else {
          await createCarrier(payload);
        }
        router.push('/carriers');
        router.refresh();
      } catch (err: any) {
        setError(err.message || 'Failed to save carrier');
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
            placeholder="e.g. Redline Freight LLC"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">MC Number</label>
          <input
            type="text"
            value={form.mc_number}
            onChange={(e) => setForm((p) => ({ ...p, mc_number: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="e.g. MC-123456"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">DOT Number</label>
          <input
            type="text"
            value={form.dot_number}
            onChange={(e) => setForm((p) => ({ ...p, dot_number: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="e.g. 1234567"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Insurance status</label>
          <select
            value={form.insurance_status}
            onChange={(e) => setForm((p) => ({ ...p, insurance_status: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="pending">Pending verification</option>
            <option value="verified">Verified</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Insurance expiry</label>
          <input
            type="date"
            value={form.insurance_expiry}
            onChange={(e) => setForm((p) => ({ ...p, insurance_expiry: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Safety rating</label>
          <select
            value={form.safety_rating}
            onChange={(e) => setForm((p) => ({ ...p, safety_rating: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="">Not rated</option>
            <option value="Satisfactory">Satisfactory</option>
            <option value="Conditional">Conditional</option>
            <option value="Unsatisfactory">Unsatisfactory</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred lanes</label>
          <input
            type="text"
            value={lanesInput}
            onChange={(e) => setLanesInput(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="Comma-separated, e.g. Chicago IL, Atlanta GA"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Equipment types</label>
          <div className="flex flex-wrap gap-3">
            {EQUIPMENT_TYPES.map((eq) => (
              <label key={eq} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={form.equipment_types?.includes(eq) || false}
                  onChange={() => toggleEquipment(eq)}
                  className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                {eq}
              </label>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isPending ? 'Saving...' : carrierId ? 'Save changes' : 'Add carrier'}
        </button>
        <button
          onClick={() => router.push('/carriers')}
          className="bg-white border border-gray-300 text-gray-900 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}