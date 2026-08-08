'use client';

import { useState, useMemo } from 'react';
import LoadCard from '@/components/load-board/load-card';
import type { Load } from '@/types';


interface LoadBoardClientProps {
  loads: Load[];
}

export default function LoadBoardClient({ loads }: LoadBoardClientProps) {
  const [search, setSearch] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('all');

  const equipmentTypes = useMemo(() => {
    const set = new Set(loads.map((l) => l.equipment_type).filter(Boolean));
    return Array.from(set).sort();
  }, [loads]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return loads.filter((load) => {
      const matchesSearch =
        !q ||
        load.origin?.toLowerCase().includes(q) ||
        load.destination?.toLowerCase().includes(q) ||
        load.load_id?.toLowerCase().includes(q) ||
        load.equipment_type?.toLowerCase().includes(q);

      const matchesEquipment =
        equipmentFilter === 'all' || load.equipment_type === equipmentFilter;

      return matchesSearch && matchesEquipment;
    });
  }, [loads, search, equipmentFilter]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by origin, destination, load ID, or equipment"
            className="w-full rounded-lg border border-slate-300 pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>
        <select
          value={equipmentFilter}
          onChange={(e) => setEquipmentFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 sm:w-56"
        >
          <option value="all">All equipment types</option>
          {equipmentTypes.map((eq) => (
            <option key={eq} value={eq}>{eq}</option>
          ))}
        </select>
      </div>

      <p className="text-sm text-slate-500 mb-4">
        {filtered.length} load{filtered.length !== 1 ? 's' : ''} available
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((load) => (
          <LoadCard key={load.id} load={load} />
        ))}
        {filtered.length === 0 && loads.length > 0 && (
          <div className="col-span-full text-center py-16 text-slate-500">
            <p className="text-lg font-medium">No loads match your search</p>
            <p className="text-sm mt-1">Try a different search term or clear the equipment filter.</p>
          </div>
        )}
        {loads.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-500">
            <p className="text-lg font-medium">No available loads right now</p>
            <p className="text-sm mt-1">Check back later for new freight opportunities.</p>
          </div>
        )}
      </div>
    </div>
  );
}