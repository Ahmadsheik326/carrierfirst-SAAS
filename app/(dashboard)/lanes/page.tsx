// app/(dashboard)/lanes/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getLanes, getMyLanes, createLane, expressInterest, updateLaneStatus } from '@/actions/lanes';

const EQUIPMENT_TYPES = ['Flatbed', 'Dry Van', 'Reefer', 'Stepdeck', 'Hot Shot'];

export default function LanesPage() {
  const supabase = createClient();
  const [role, setRole] = useState<string | null>(null);
  const [lanes, setLanes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [equipment, setEquipment] = useState(EQUIPMENT_TYPES[0]);
  const [rate, setRate] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [interestSent, setInterestSent] = useState<Record<string, boolean>>({});

  const isPoster = role === 'shipper' || role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin';
  const isCarrier = role === 'carrier';

  const load = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
    const userRole = profile?.role ?? null;
    setRole(userRole);

    const data = userRole === 'shipper' || userRole === 'broker_admin' || userRole === 'broker_staff' || userRole === 'super_admin'
      ? await getMyLanes()
      : await getLanes();

    setLanes(data);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    if (!origin || !destination || !rate) {
      setError('Origin, destination, and target rate are required.');
      return;
    }
    setError('');
    try {
      await createLane({ origin, destination, equipment_type: equipment, target_rate: parseFloat(rate), notes });
      setOrigin(''); setDestination(''); setRate(''); setNotes('');
      setShowForm(false);
      await load();
    } catch (err: any) {
      setError(err.message || 'Failed to post lane.');
    }
  };

  const handleInterest = async (laneId: string) => {
    try {
      await expressInterest(laneId);
      setInterestSent((prev) => ({ ...prev, [laneId]: true }));
    } catch (err: any) {
      setError(err.message || 'Failed to send interest.');
    }
  };

  const handleStatusChange = async (laneId: string, status: 'active' | 'paused' | 'filled') => {
    await updateLaneStatus(laneId, status);
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lane Postings</h1>
          <p className="text-sm text-gray-500 mt-1">
            {isCarrier
              ? 'Standing lanes shippers and brokers are looking to fill regularly.'
              : 'Post a lane you run often to get carriers watching it before a load exists.'}
          </p>
        </div>
        {isPoster && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            + Post a Lane
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Origin</label>
              <input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Dallas, TX"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Destination</label>
              <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Atlanta, GA"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Equipment</label>
              <select value={equipment} onChange={(e) => setEquipment(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900">
                {EQUIPMENT_TYPES.map((eq) => <option key={eq} value={eq}>{eq}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Target rate ($)</label>
              <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="2000"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Notes (optional)</label>
            <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Runs weekly, flexible pickup window"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          <div className="flex gap-3">
            <button onClick={handleCreate} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800">
              Post Lane
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading…</div>
        ) : lanes.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            {isCarrier ? 'No active lanes posted right now.' : "You haven't posted any lanes yet."}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Route</th>
                <th className="text-left px-6 py-3 font-semibold">Equipment</th>
                <th className="text-right px-6 py-3 font-semibold">Target Rate</th>
                <th className="text-left px-6 py-3 font-semibold">Notes</th>
                {isPoster && <th className="text-left px-6 py-3 font-semibold">Interested</th>}
                {isPoster && <th className="text-left px-6 py-3 font-semibold">Status</th>}
                {isCarrier && <th className="text-right px-6 py-3 font-semibold">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {lanes.map((lane) => (
                <tr key={lane.id}>
                  <td className="px-6 py-3 text-gray-900 font-medium">{lane.origin} → {lane.destination}</td>
                  <td className="px-6 py-3 text-gray-600">{lane.equipment_type}</td>
                  <td className="px-6 py-3 text-right font-semibold text-gray-900">
                    ${Number(lane.target_rate).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-gray-500">{lane.notes || '—'}</td>
                  {isPoster && (
                    <td className="px-6 py-3 text-gray-700">
                      {lane.lane_interests?.[0]?.count ?? 0} carrier{(lane.lane_interests?.[0]?.count ?? 0) !== 1 ? 's' : ''}
                    </td>
                  )}
                  {isPoster && (
                    <td className="px-6 py-3">
                      <select
                        value={lane.status}
                        onChange={(e) => handleStatusChange(lane.id, e.target.value as any)}
                        className="text-xs rounded border border-gray-200 px-2 py-1"
                      >
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                        <option value="filled">Filled</option>
                      </select>
                    </td>
                  )}
                  {isCarrier && (
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => handleInterest(lane.id)}
                        disabled={interestSent[lane.id]}
                        className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md hover:bg-amber-100 disabled:opacity-50"
                      >
                        {interestSent[lane.id] ? 'Interest sent ✓' : "I'm Interested"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}