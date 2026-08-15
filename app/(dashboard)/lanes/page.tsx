// 'use client';

// import { Fragment, useEffect, useState, useCallback } from 'react';
// import { createClient } from '@/lib/supabase/client';
// import {
//   getLanes, getMyLanes, getAllLanesForBroker, getPendingLanesForBroker,
//   createLane, expressInterest, updateLaneStatus,
//   approveLane, rejectLane, getInterestsForLane, assignLaneToCarrier,
//   getAssignedLanesForCarrier,
// } from '@/actions/lanes';

// const EQUIPMENT_TYPES = ['Flatbed', 'Dry Van', 'Reefer', 'Stepdeck', 'Hot Shot'];

// const APPROVAL_BADGE: Record<string, string> = {
//   pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//   approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
//   rejected: 'bg-red-100 text-red-800 border-red-200',
// };

// export default function LanesPage() {
//   const supabase = createClient();
//   const [role, setRole] = useState<string | null>(null);
//   const [lanes, setLanes] = useState<any[]>([]);
//   const [pendingLanes, setPendingLanes] = useState<any[]>([]);
//   const [assignedLanes, setAssignedLanes] = useState<any[]>([]);
//   const [carrierTab, setCarrierTab] = useState<'available' | 'mine'>('available');
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [origin, setOrigin] = useState('');
//   const [destination, setDestination] = useState('');
//   const [equipment, setEquipment] = useState(EQUIPMENT_TYPES[0]);
//   const [rate, setRate] = useState('');
//   const [notes, setNotes] = useState('');
//   const [error, setError] = useState('');
//   const [interestSent, setInterestSent] = useState<Record<string, boolean>>({});
//   const [expandedLaneId, setExpandedLaneId] = useState<string | null>(null);
//   const [interests, setInterests] = useState<any[]>([]);
//   const [approveRateInput, setApproveRateInput] = useState<Record<string, string>>({});

//   const isBroker = role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin';
//   const isShipper = role === 'shipper';
//   const isPoster = isShipper || isBroker;
//   const isCarrier = role === 'carrier';

//   const load = useCallback(async () => {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return;

//     const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
//     const userRole = profile?.role ?? null;
//     setRole(userRole);

//     const brokerRole = ['broker_admin', 'broker_staff', 'super_admin'].includes(userRole || '');

//     if (brokerRole) {
//       const [all, pending] = await Promise.all([getAllLanesForBroker(), getPendingLanesForBroker()]);
//       setLanes(all);
//       setPendingLanes(pending);
//     } else if (userRole === 'shipper') {
//       setLanes(await getMyLanes());
//     } else {
//       const [avail, assigned] = await Promise.all([getLanes(), getAssignedLanesForCarrier()]);
//       setLanes(avail);
//       setAssignedLanes(assigned);
//     }
//     setLoading(false);
//   }, [supabase]);

//   useEffect(() => { load(); }, [load]);

//   const handleCreate = async () => {
//     if (!origin || !destination || !rate) {
//       setError('Origin, destination, and target rate are required.');
//       return;
//     }
//     setError('');
//     try {
//       await createLane({ origin, destination, equipment_type: equipment, target_rate: parseFloat(rate), notes });
//       setOrigin(''); setDestination(''); setRate(''); setNotes('');
//       setShowForm(false);
//       await load();
//     } catch (err: any) {
//       setError(err.message || 'Failed to post lane.');
//     }
//   };

//   const handleInterest = async (laneId: string) => {
//     try {
//       await expressInterest(laneId);
//       setInterestSent((prev) => ({ ...prev, [laneId]: true }));
//     } catch (err: any) {
//       setError(err.message || 'Failed to send interest.');
//     }
//   };

//   const handleStatusChange = async (laneId: string, status: 'active' | 'paused' | 'filled') => {
//     await updateLaneStatus(laneId, status);
//     await load();
//   };

//   const handleApprove = async (laneId: string) => {
//     const rateStr = approveRateInput[laneId];
//     const carrierRate = parseFloat(rateStr);
//     if (!rateStr || isNaN(carrierRate) || carrierRate <= 0) {
//       setError('Enter the rate to advertise to carriers before approving.');
//       return;
//     }
//     setError('');
//     await approveLane(laneId, carrierRate);
//     await load();
//   };

//   const handleReject = async (laneId: string) => {
//     await rejectLane(laneId);
//     await load();
//   };

//   const toggleManage = async (laneId: string) => {
//     if (expandedLaneId === laneId) {
//       setExpandedLaneId(null);
//       return;
//     }
//     setExpandedLaneId(laneId);
//     setInterests(await getInterestsForLane(laneId));
//   };

//   const handleAssign = async (laneId: string, carrierId: string, interestId: string) => {
//     await assignLaneToCarrier(laneId, carrierId, interestId);
//     setExpandedLaneId(null);
//     await load();
//   };

//   const carrierVisibleLanes = carrierTab === 'available' ? lanes : assignedLanes;

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Lane Postings</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             {isCarrier
//               ? 'Standing lanes shippers and brokers are looking to fill regularly.'
//               : isShipper
//               ? 'Post a lane you run often. A broker reviews it before carriers can see it.'
//               : 'Review shipper lane requests, set the carrier rate, then assign an interested carrier.'}
//           </p>
//         </div>
//         {isPoster && (
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
//           >
//             + Post a Lane
//           </button>
//         )}
//       </div>

//       {showForm && (
//         <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
//           <div className="grid sm:grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Origin</label>
//               <input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Dallas, TX"
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Destination</label>
//               <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Atlanta, GA"
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Equipment</label>
//               <select value={equipment} onChange={(e) => setEquipment(e.target.value)}
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900">
//                 {EQUIPMENT_TYPES.map((eq) => <option key={eq} value={eq}>{eq}</option>)}
//               </select>
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
//                 {isShipper ? 'Your target rate ($)' : 'Rate to advertise ($)'}
//               </label>
//               <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="2000"
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Notes (optional)</label>
//             <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Runs weekly, flexible pickup window"
//               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
//           </div>
//           {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
//           <div className="flex gap-3">
//             <button onClick={handleCreate} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800">
//               Post Lane
//             </button>
//             <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100">
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {isBroker && pendingLanes.length > 0 && (
//         <div className="bg-white rounded-xl border border-yellow-300 overflow-hidden mb-6">
//           <div className="px-6 py-4 border-b border-yellow-200 bg-yellow-50">
//             <h2 className="text-sm font-semibold text-yellow-900">
//               Pending Shipper Requests ({pendingLanes.length})
//             </h2>
//           </div>
//           <div className="divide-y divide-gray-100">
//             {pendingLanes.map((lane) => (
//               <div key={lane.id} className="px-6 py-4 flex items-center justify-between gap-4">
//                 <div>
//                   <p className="font-medium text-gray-900">{lane.origin} → {lane.destination}</p>
//                   <p className="text-sm text-gray-500">
//                     {lane.equipment_type} · Shipper asking <span className="font-semibold text-gray-700">${Number(lane.target_rate).toLocaleString()}</span>
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     From: <span className="font-medium">{lane.poster?.full_name || lane.poster?.email}</span>
//                     {lane.poster?.email && ` · ${lane.poster.email}`}
//                     {lane.poster?.phone && ` · ${lane.poster.phone}`}
//                   </p>
//                   {lane.notes && <p className="text-xs text-gray-400 mt-1">{lane.notes}</p>}
//                 </div>
//                 <div className="flex items-center gap-2 flex-shrink-0">
//                   <input
//                     type="number"
//                     placeholder="Carrier rate $"
//                     value={approveRateInput[lane.id] || ''}
//                     onChange={(e) => setApproveRateInput((p) => ({ ...p, [lane.id]: e.target.value }))}
//                     className="w-32 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
//                   />
//                   <button
//                     onClick={() => handleApprove(lane.id)}
//                     className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-md hover:bg-emerald-100"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleReject(lane.id)}
//                     className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-md hover:bg-red-100"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {isCarrier && (
//         <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
//           <button
//             onClick={() => setCarrierTab('available')}
//             className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${carrierTab === 'available' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
//           >
//             Available Lanes
//           </button>
//           <button
//             onClick={() => setCarrierTab('mine')}
//             className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${carrierTab === 'mine' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
//           >
//             My Lanes {assignedLanes.length > 0 && `(${assignedLanes.length})`}
//           </button>
//         </div>
//       )}

//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//         {loading ? (
//           <div className="p-12 text-center text-gray-400 text-sm">Loading…</div>
//         ) : isCarrier ? (
//           carrierVisibleLanes.length === 0 ? (
//             <div className="p-12 text-center text-gray-500 text-sm">
//               {carrierTab === 'available' ? 'No active lanes posted right now.' : "You haven't been assigned any lanes yet."}
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
//                   <tr>
//                     <th className="text-left px-6 py-3 font-semibold">Route</th>
//                     <th className="text-left px-6 py-3 font-semibold">Equipment</th>
//                     <th className="text-right px-6 py-3 font-semibold">Rate</th>
//                     <th className="text-left px-6 py-3 font-semibold">Notes</th>
//                     <th className="text-right px-6 py-3 font-semibold">{carrierTab === 'available' ? 'Action' : 'Status'}</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {carrierVisibleLanes.map((lane) => (
//                     <tr key={lane.id}>
//                       <td className="px-6 py-3 text-gray-900 font-medium">{lane.origin} → {lane.destination}</td>
//                       <td className="px-6 py-3 text-gray-600">{lane.equipment_type}</td>
//                       <td className="px-6 py-3 text-right font-semibold text-gray-900">
//                         ${Number(lane.carrier_rate).toLocaleString()}
//                       </td>
//                       <td className="px-6 py-3 text-gray-500">{lane.notes || '—'}</td>
//                       <td className="px-6 py-3 text-right">
//                         {carrierTab === 'available' ? (
//                           <button
//                             onClick={() => handleInterest(lane.id)}
//                             disabled={interestSent[lane.id]}
//                             className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md hover:bg-amber-100 disabled:opacity-50"
//                           >
//                             {interestSent[lane.id] ? 'Interest sent ✓' : "I'm Interested"}
//                           </button>
//                         ) : (
//                           <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-md">
//                             Confirmed
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )
//         ) : lanes.length === 0 ? (
//           <div className="p-12 text-center text-gray-500 text-sm">You haven't posted any lanes yet.</div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
//                 <tr>
//                   <th className="text-left px-6 py-3 font-semibold">Route</th>
//                   <th className="text-left px-6 py-3 font-semibold">Equipment</th>
//                   <th className="text-right px-6 py-3 font-semibold">Shipper Rate</th>
//                   {isBroker && <th className="text-right px-6 py-3 font-semibold">Carrier Rate</th>}
//                   {isBroker && <th className="text-right px-6 py-3 font-semibold">Margin</th>}
//                   <th className="text-left px-6 py-3 font-semibold">Approval</th>
//                   <th className="text-left px-6 py-3 font-semibold">Interested</th>
//                   <th className="text-left px-6 py-3 font-semibold">Status</th>
//                   {isBroker && <th className="text-left px-6 py-3 font-semibold">Posted By</th>}
//                   {isBroker && <th className="text-right px-6 py-3 font-semibold">Manage</th>}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {lanes.map((lane) => {
//                   const margin = lane.carrier_rate != null ? Number(lane.target_rate) - Number(lane.carrier_rate) : null;
//                   return (
//                     <Fragment key={lane.id}>
//                       <tr>
//                         <td className="px-6 py-3 text-gray-900 font-medium">{lane.origin} → {lane.destination}</td>
//                         <td className="px-6 py-3 text-gray-600">{lane.equipment_type}</td>
//                         <td className="px-6 py-3 text-right font-semibold text-gray-900">
//                           ${Number(lane.target_rate).toLocaleString()}
//                         </td>
//                         {isBroker && (
//                           <td className="px-6 py-3 text-right text-gray-700">
//                             {lane.carrier_rate != null ? `$${Number(lane.carrier_rate).toLocaleString()}` : '—'}
//                           </td>
//                         )}
//                         {isBroker && (
//                           <td className="px-6 py-3 text-right">
//                             {margin != null ? (
//                               <span className={margin >= 0 ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'}>
//                                 ${margin.toLocaleString()}
//                               </span>
//                             ) : '—'}
//                           </td>
//                         )}
//                         <td className="px-6 py-3">
//                           <span className={`inline-block text-xs font-medium px-2 py-1 rounded-md border ${APPROVAL_BADGE[lane.approval_status] || APPROVAL_BADGE.pending}`}>
//                             {lane.approval_status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-3 text-gray-700">
//                           {lane.lane_interests?.[0]?.count ?? 0} carrier{(lane.lane_interests?.[0]?.count ?? 0) !== 1 ? 's' : ''}
//                         </td>
//                         <td className="px-6 py-3">
//                           {lane.status === 'filled' ? (
//                             <span className="text-xs font-semibold text-emerald-700">Filled</span>
//                           ) : (
//                             <select
//                               value={lane.status}
//                               onChange={(e) => handleStatusChange(lane.id, e.target.value as any)}
//                               className="text-xs rounded border border-gray-200 px-2 py-1"
//                             >
//                               <option value="active">Active</option>
//                               <option value="paused">Paused</option>
//                               <option value="filled">Filled</option>
//                             </select>
//                           )}
//                         </td>
//                         {isBroker && (
//                           <td className="px-6 py-3 text-gray-600 text-xs">
//                             {lane.poster?.full_name || lane.poster?.email || '—'}
//                             {lane.poster?.role && <span className="text-gray-400"> ({lane.poster.role.replace('_', ' ')})</span>}
//                           </td>
//                         )}
//                         {isBroker && (
//                           <td className="px-6 py-3 text-right">
//                             {lane.status === 'filled' ? (
//                               <span className="text-xs text-gray-400">Assigned</span>
//                             ) : (
//                               <button
//                                 onClick={() => toggleManage(lane.id)}
//                                 className="text-xs font-semibold text-slate-900 hover:underline"
//                               >
//                                 {expandedLaneId === lane.id ? 'Close' : 'Manage'}
//                               </button>
//                             )}
//                           </td>
//                         )}
//                       </tr>
//                       {isBroker && expandedLaneId === lane.id && (
//                         <tr>
//                           <td colSpan={9} className="px-6 py-4 bg-gray-50">
//                             {interests.length === 0 ? (
//                               <p className="text-sm text-gray-400">No carrier interest yet.</p>
//                             ) : (
//                               <div className="space-y-2">
//                                 {interests.map((i) => (
//                                   <div key={i.id} className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-4 py-2">
//                                     <div>
//                                       <p className="text-sm font-medium text-gray-900">
//                                         {i.carrier?.full_name || i.carrier?.email}
//                                       </p>
//                                       <p className="text-xs text-gray-500">
//                                         {i.carrier?.email} {i.carrier?.phone && `· ${i.carrier.phone}`}
//                                       </p>
//                                       {i.message && <p className="text-xs text-gray-400 mt-0.5">"{i.message}"</p>}
//                                     </div>
//                                     {i.status === 'pending' ? (
//                                       <button
//                                         onClick={() => handleAssign(lane.id, i.carrier_id, i.id)}
//                                         className="text-xs font-semibold text-white bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800"
//                                       >
//                                         Assign This Carrier
//                                       </button>
//                                     ) : (
//                                       <span className={`text-xs font-semibold ${i.status === 'accepted' ? 'text-emerald-600' : 'text-red-500'}`}>
//                                         {i.status}
//                                       </span>
//                                     )}
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                           </td>
//                         </tr>
//                       )}
//                     </Fragment>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
'use client';

import { Fragment, useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  getLanes, getMyLanes, getAllLanesForBroker, getPendingLanesForBroker,
  createLane, expressInterest, updateLaneStatus,
  approveLane, rejectLane, getInterestsForLane, assignLaneToCarrier,
  getAssignedLanesForCarrier,
} from '@/actions/lanes';

const EQUIPMENT_TYPES = ['Flatbed', 'Dry Van', 'Reefer', 'Stepdeck', 'Hot Shot'];

const APPROVAL_BADGE: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
};

export default function LanesPage() {
  const supabase = createClient();
  const [role, setRole] = useState<string | null>(null);
  const [lanes, setLanes] = useState<any[]>([]);
  const [pendingLanes, setPendingLanes] = useState<any[]>([]);
  const [assignedLanes, setAssignedLanes] = useState<any[]>([]);
  const [carrierTab, setCarrierTab] = useState<'available' | 'mine'>('available');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [equipment, setEquipment] = useState(EQUIPMENT_TYPES[0]);
  const [rate, setRate] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [interestSent, setInterestSent] = useState<Record<string, boolean>>({});
  const [expandedLaneId, setExpandedLaneId] = useState<string | null>(null);
  const [interests, setInterests] = useState<any[]>([]);
  const [approveRateInput, setApproveRateInput] = useState<Record<string, string>>({});

  const isBroker = role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin';
  const isShipper = role === 'shipper';
  const isPoster = isShipper || isBroker;
  const isCarrier = role === 'carrier';

  const load = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
    const userRole = profile?.role ?? null;
    setRole(userRole);

    const brokerRole = ['broker_admin', 'broker_staff', 'super_admin'].includes(userRole || '');

    if (brokerRole) {
      const [all, pending] = await Promise.all([getAllLanesForBroker(), getPendingLanesForBroker()]);
      setLanes(all);
      setPendingLanes(pending);
    } else if (userRole === 'shipper') {
      setLanes(await getMyLanes());
    } else {
      const [avail, assigned] = await Promise.all([getLanes(), getAssignedLanesForCarrier()]);
      setLanes(avail);
      setAssignedLanes(assigned);
    }
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

  const handleApprove = async (laneId: string) => {
    const rateStr = approveRateInput[laneId];
    const carrierRate = parseFloat(rateStr);
    if (!rateStr || isNaN(carrierRate) || carrierRate <= 0) {
      setError('Enter the rate to advertise to carriers before approving.');
      return;
    }
    setError('');
    await approveLane(laneId, carrierRate);
    await load();
  };

  const handleReject = async (laneId: string) => {
    await rejectLane(laneId);
    await load();
  };

  const toggleManage = async (laneId: string) => {
    if (expandedLaneId === laneId) {
      setExpandedLaneId(null);
      return;
    }
    setExpandedLaneId(laneId);
    setInterests(await getInterestsForLane(laneId));
  };

  const handleAssign = async (laneId: string, carrierId: string, interestId: string) => {
    await assignLaneToCarrier(laneId, carrierId, interestId);
    setExpandedLaneId(null);
    await load();
  };

  const carrierVisibleLanes = carrierTab === 'available' ? lanes : assignedLanes;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lane Postings</h1>
          <p className="text-sm text-gray-500 mt-1">
            {isCarrier
              ? 'Standing lanes shippers and brokers are looking to fill regularly.'
              : isShipper
              ? 'Post a lane you run often. A broker reviews it before carriers can see it.'
              : 'Review shipper lane requests, set the carrier rate, then assign an interested carrier.'}
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
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                {isShipper ? 'Your target rate ($)' : 'Rate to advertise ($)'}
              </label>
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

      {isBroker && pendingLanes.length > 0 && (
        <div className="bg-white rounded-xl border border-yellow-300 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-yellow-200 bg-yellow-50">
            <h2 className="text-sm font-semibold text-yellow-900">
              Pending Shipper Requests ({pendingLanes.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {pendingLanes.map((lane) => (
              <div key={lane.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">{lane.origin} → {lane.destination}</p>
                  <p className="text-sm text-gray-500">
                    {lane.equipment_type} · Shipper asking <span className="font-semibold text-gray-700">${Number(lane.target_rate).toLocaleString()}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    From: <span className="font-medium">{lane.poster?.full_name || lane.poster?.email}</span>
                    {lane.poster?.email && ` · ${lane.poster.email}`}
                    {lane.poster?.phone && ` · ${lane.poster.phone}`}
                  </p>
                  {lane.notes && <p className="text-xs text-gray-400 mt-1">{lane.notes}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <input
                    type="number"
                    placeholder="Carrier rate $"
                    value={approveRateInput[lane.id] || ''}
                    onChange={(e) => setApproveRateInput((p) => ({ ...p, [lane.id]: e.target.value }))}
                    className="w-32 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <button
                    onClick={() => handleApprove(lane.id)}
                    className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-md hover:bg-emerald-100"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(lane.id)}
                    className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-md hover:bg-red-100"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isCarrier && (
        <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => setCarrierTab('available')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${carrierTab === 'available' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
          >
            Available Lanes
          </button>
          <button
            onClick={() => setCarrierTab('mine')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${carrierTab === 'mine' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
          >
            My Lanes {assignedLanes.length > 0 && `(${assignedLanes.length})`}
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading…</div>
        ) : isCarrier ? (
          carrierVisibleLanes.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-sm">
              {carrierTab === 'available' ? 'No active lanes posted right now.' : "You haven't been assigned any lanes yet."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold">Route</th>
                    <th className="text-left px-6 py-3 font-semibold">Equipment</th>
                    <th className="text-right px-6 py-3 font-semibold">Rate</th>
                    <th className="text-left px-6 py-3 font-semibold">Notes</th>
                    <th className="text-right px-6 py-3 font-semibold">{carrierTab === 'available' ? 'Action' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {carrierVisibleLanes.map((lane) => (
                    <tr key={lane.id}>
                      <td className="px-6 py-3 text-gray-900 font-medium">{lane.origin} → {lane.destination}</td>
                      <td className="px-6 py-3 text-gray-600">{lane.equipment_type}</td>
                      <td className="px-6 py-3 text-right font-semibold text-gray-900">
                        ${Number(lane.carrier_rate).toLocaleString()}
                      </td>
                      <td className="px-6 py-3 text-gray-500">{lane.notes || '—'}</td>
                      <td className="px-6 py-3 text-right">
                        {carrierTab === 'available' ? (
                          <button
                            onClick={() => handleInterest(lane.id)}
                            disabled={interestSent[lane.id]}
                            className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md hover:bg-amber-100 disabled:opacity-50"
                          >
                            {interestSent[lane.id] ? 'Interest sent ✓' : "I'm Interested"}
                          </button>
                        ) : (
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-md">
                            Confirmed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : lanes.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">You haven't posted any lanes yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold">Route</th>
                  <th className="text-left px-6 py-3 font-semibold">Equipment</th>
                  <th className="text-right px-6 py-3 font-semibold">Shipper Rate</th>
                  {isBroker && <th className="text-right px-6 py-3 font-semibold">Carrier Rate</th>}
                  {isBroker && <th className="text-right px-6 py-3 font-semibold">Margin</th>}
                  <th className="text-left px-6 py-3 font-semibold">Approval</th>
                  <th className="text-left px-6 py-3 font-semibold">Interested</th>
                  <th className="text-left px-6 py-3 font-semibold">Status</th>
                  <th className="text-left px-6 py-3 font-semibold">Carrier</th>
                  {isBroker && <th className="text-left px-6 py-3 font-semibold">Posted By</th>}
                  {isBroker && <th className="text-right px-6 py-3 font-semibold">Manage</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lanes.map((lane) => {
                  const margin = lane.carrier_rate != null ? Number(lane.target_rate) - Number(lane.carrier_rate) : null;
                  return (
                    <Fragment key={lane.id}>
                      <tr>
                        <td className="px-6 py-3 text-gray-900 font-medium">{lane.origin} → {lane.destination}</td>
                        <td className="px-6 py-3 text-gray-600">{lane.equipment_type}</td>
                        <td className="px-6 py-3 text-right font-semibold text-gray-900">
                          ${Number(lane.target_rate).toLocaleString()}
                        </td>
                        {isBroker && (
                          <td className="px-6 py-3 text-right text-gray-700">
                            {lane.carrier_rate != null ? `$${Number(lane.carrier_rate).toLocaleString()}` : '—'}
                          </td>
                        )}
                        {isBroker && (
                          <td className="px-6 py-3 text-right">
                            {margin != null ? (
                              <span className={margin >= 0 ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'}>
                                ${margin.toLocaleString()}
                              </span>
                            ) : '—'}
                          </td>
                        )}
                        <td className="px-6 py-3">
                          <span className={`inline-block text-xs font-medium px-2 py-1 rounded-md border ${APPROVAL_BADGE[lane.approval_status] || APPROVAL_BADGE.pending}`}>
                            {lane.approval_status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-700">
                          {lane.lane_interests?.[0]?.count ?? 0} carrier{(lane.lane_interests?.[0]?.count ?? 0) !== 1 ? 's' : ''}
                        </td>
                        <td className="px-6 py-3">
                          {lane.status === 'filled' ? (
                            <span className="text-xs font-semibold text-emerald-700">Filled</span>
                          ) : (
                            <select
                              value={lane.status}
                              onChange={(e) => handleStatusChange(lane.id, e.target.value as any)}
                              className="text-xs rounded border border-gray-200 px-2 py-1"
                            >
                              <option value="active">Active</option>
                              <option value="paused">Paused</option>
                              <option value="filled">Filled</option>
                            </select>
                          )}
                        </td>
                        <td className="px-6 py-3">
                          {lane.status === 'filled' && lane.assigned_carrier ? (
                            <div>
                              <p className="text-xs font-semibold text-gray-900">
                                {lane.assigned_carrier.full_name || lane.assigned_carrier.email}
                              </p>
                              <p className="text-xs text-gray-500">
                                {lane.assigned_carrier.email}
                                {lane.assigned_carrier.phone && ` · ${lane.assigned_carrier.phone}`}
                              </p>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                        {isBroker && (
                          <td className="px-6 py-3 text-gray-600 text-xs">
                            {lane.poster?.full_name || lane.poster?.email || '—'}
                            {lane.poster?.role && <span className="text-gray-400"> ({lane.poster.role.replace('_', ' ')})</span>}
                          </td>
                        )}
                        {isBroker && (
                          <td className="px-6 py-3 text-right">
                            {lane.status === 'filled' ? (
                              <span className="text-xs text-gray-400">Assigned</span>
                            ) : (
                              <button
                                onClick={() => toggleManage(lane.id)}
                                className="text-xs font-semibold text-slate-900 hover:underline"
                              >
                                {expandedLaneId === lane.id ? 'Close' : 'Manage'}
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                      {isBroker && expandedLaneId === lane.id && (
                        <tr>
                          <td colSpan={10} className="px-6 py-4 bg-gray-50">
                            {interests.length === 0 ? (
                              <p className="text-sm text-gray-400">No carrier interest yet.</p>
                            ) : (
                              <div className="space-y-2">
                                {interests.map((i) => (
                                  <div key={i.id} className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-4 py-2">
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        {i.carrier?.full_name || i.carrier?.email}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {i.carrier?.email} {i.carrier?.phone && `· ${i.carrier.phone}`}
                                      </p>
                                      {i.message && <p className="text-xs text-gray-400 mt-0.5">"{i.message}"</p>}
                                    </div>
                                    {i.status === 'pending' ? (
                                      <button
                                        onClick={() => handleAssign(lane.id, i.carrier_id, i.id)}
                                        className="text-xs font-semibold text-white bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800"
                                      >
                                        Assign This Carrier
                                      </button>
                                    ) : (
                                      <span className={`text-xs font-semibold ${i.status === 'accepted' ? 'text-emerald-600' : 'text-red-500'}`}>
                                        {i.status}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}