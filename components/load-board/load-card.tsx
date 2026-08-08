// // components/load-board/load-card.tsx
// 'use client';

// import { useState } from 'react';
// import { formatCurrency } from '@/lib/utils/calculator';
// import { getStatusColor } from '@/lib/utils/helpers';
// import type { Load } from '@/types';
// import BidModal from './bid-modal';

// interface LoadCardProps {
//   load: Load;
// }

// export default function LoadCard({ load }: LoadCardProps) {
//   const [showBid, setShowBid] = useState(false);

//   return (
//     <>
//       <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
//         <div className="flex items-center justify-between mb-3">
//           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStatusColor(load.status)}`}>
//             {load.status.replace('_', ' ')}
//           </span>
//           <span className="text-xs text-gray-500">{load.mileage.toLocaleString()} mi</span>
//         </div>

//         <h3 className="text-base font-semibold text-gray-900 mb-1">
//           {load.origin} → {load.destination}
//         </h3>
//         <p className="text-sm text-gray-500 mb-4">
//           {load.shipper_name} · {load.equipment_type} · {load.weight.toLocaleString()} lbs
//         </p>

//         <div className="flex items-end justify-between mb-4">
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Broker rate</p>
//             <p className="text-2xl font-bold text-gray-900">{formatCurrency(load.bid_total || 0)}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Margin</p>
//             <p className="text-lg font-semibold text-gray-700">{formatCurrency(load.margin || 0)}</p>
//           </div>
//         </div>

//         <div className="flex gap-2">
//           {load.status === 'bidding' && (
//             <button onClick={() => setShowBid(true)}
//               className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
//               Place Bid
//             </button>
//           )}
//           <button onClick={() => alert(`Load: ${load.load_id}\nRoute: ${load.origin} → ${load.destination}\nEquipment: ${load.equipment_type}\nMiles: ${load.mileage}\nWeight: ${load.weight} lbs`)}
//             className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition-colors">
//             Details
//           </button>
//         </div>
//       </div>
//       {showBid && <BidModal load={load} onClose={() => setShowBid(false)} />}
//     </>
//   );
// }
'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/calculator';
import { getStatusColor } from '@/lib/utils/helpers';
import type { Load } from '@/types';
import BidModal from './bid-modal';

interface LoadCardProps {
  load: Load;
}

export default function LoadCard({ load }: LoadCardProps) {
  const [showBid, setShowBid] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStatusColor(load.status)}`}>
            {load.status.replace('_', ' ')}
          </span>
          <span className="text-xs text-gray-500">{load.mileage.toLocaleString()} mi</span>
        </div>

        <h3 className="text-base font-semibold text-gray-900 mb-1">
          {load.origin} → {load.destination}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {load.shipper_name} · {load.equipment_type} · {load.weight.toLocaleString()} lbs
        </p>

        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Broker rate</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(load.bid_total || 0)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Margin</p>
            <p className="text-lg font-semibold text-gray-700">{formatCurrency(load.margin || 0)}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {load.status === 'bidding' && (
            <button onClick={() => setShowBid(true)}
              className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
              Place Bid
            </button>
          )}
          <button onClick={() => setShowDetails(true)}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition-colors">
            Details
          </button>
        </div>
      </div>

      {showBid && <BidModal load={load} onClose={() => setShowBid(false)} />}

      {showDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Load {load.load_id}</h2>
              <button onClick={() => setShowDetails(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Route</span>
                <span className="font-medium">{load.origin} → {load.destination}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Shipper</span>
                <span className="font-medium">{load.shipper_name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Equipment</span>
                <span className="font-medium">{load.equipment_type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Mileage</span>
                <span className="font-medium">{load.mileage.toLocaleString()} mi</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Weight</span>
                <span className="font-medium">{load.weight.toLocaleString()} lbs</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Stops</span>
                <span className="font-medium">{load.stops}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Tarp</span>
                <span className="font-medium">{load.tarp ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Region X</span>
                <span className="font-medium">{load.region_x ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Status</span>
                <span className="font-medium capitalize">{load.status.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between py-2 pt-3 border-t-2 border-gray-200">
                <span className="font-semibold text-gray-900">Bid Total</span>
                <span className="font-bold text-lg text-gray-900">{formatCurrency(load.bid_total || 0)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Broker Margin</span>
                <span className="font-medium text-gray-700">{formatCurrency(load.margin || 0)}</span>
              </div>
            </div>
            <button onClick={() => setShowDetails(false)}
              className="w-full mt-4 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}