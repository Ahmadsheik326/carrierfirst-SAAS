// components/dashboard/stats-cards.tsx
'use client';

import { formatCurrency, formatNumber } from '@/lib/utils/calculator';

interface Stat {
  label: string;
  value: number;
  isCurrency?: boolean;
}

interface StatsCardsProps {
  stats: Stat[];
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">{stat.label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
            {stat.isCurrency ? formatCurrency(stat.value) : formatNumber(stat.value)}
          </p>
        </div>
      ))}
    </div>
  );
}
