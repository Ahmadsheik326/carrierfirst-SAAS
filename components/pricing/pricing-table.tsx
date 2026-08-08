// components/pricing/pricing-table.tsx
'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateRPM } from '@/actions/pricing';
import { EQUIPMENT_TYPES, MARKETS } from '@/lib/constants/pricing';

interface PricingTableProps {
  matrix: Record<string, Record<string, { id: string; rpm: number }>>;
}

export default function PricingTable({ matrix }: PricingTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (id: string, value: string) => {
    const rpm = parseFloat(value);
    if (isNaN(rpm)) return;

    startTransition(async () => {
      await updateRPM(id, rpm);
      router.refresh();
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
              Equipment / Market
            </th>
            {MARKETS.map((m) => (
              <th key={m} className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[100px]">
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {EQUIPMENT_TYPES.map((eq) => (
            <tr key={eq} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-semibold text-gray-900 sticky left-0 bg-white">
                {eq}
              </td>
              {MARKETS.map((m) => {
                const entry = matrix[eq]?.[m];
                return (
                  <td key={m} className="px-4 py-3 text-right">
                    {entry?.id ? (
                      <input
                        type="number"
                        step="0.01"
                        defaultValue={entry.rpm.toFixed(2)}
                        onBlur={(e) => handleChange(entry.id, e.target.value)}
                        disabled={isPending}
                        className="w-20 text-right rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
