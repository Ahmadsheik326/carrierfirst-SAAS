// lib/utils/helpers.ts

export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    bidding: 'bg-blue-100 text-blue-800 border-blue-200',
    booked: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    picked_up: 'bg-amber-100 text-amber-800 border-amber-200',
    in_transit: 'bg-purple-100 text-purple-800 border-purple-200',
    delivered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    won: 'bg-green-100 text-green-800 border-green-200',
    lost: 'bg-red-100 text-red-800 border-red-200',
  };
  return map[status] || 'bg-gray-100 text-gray-800 border-gray-200';
}

export function capitalize(str: string): string {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}
