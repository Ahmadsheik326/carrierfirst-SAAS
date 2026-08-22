// // // components/quotes/quote-actions.tsx
// // 'use client';

// // import { useTransition } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { approveQuote, rejectQuote } from '@/actions/quotes';

// // interface QuoteActionsProps {
// //   quoteId: string;
// //   status: string;
// // }

// // export default function QuoteActions({ quoteId, status }: QuoteActionsProps) {
// //   const router = useRouter();
// //   const [isPending, startTransition] = useTransition();

// //   if (status !== 'pending') {
// //     return <span className="text-sm text-gray-500">{status}</span>;
// //   }

// //   const handleApprove = () => {
// //     startTransition(async () => {
// //       await approveQuote(quoteId);
// //       router.refresh();
// //     });
// //   };

// //   const handleReject = () => {
// //     startTransition(async () => {
// //       await rejectQuote(quoteId);
// //       router.refresh();
// //     });
// //   };

// //   return (
// //     <div className="flex gap-2">
// //       <button onClick={handleApprove} disabled={isPending}
// //         className="px-3 py-1.5 rounded-md text-xs font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors disabled:opacity-50">
// //         {isPending ? '...' : 'Approve'}
// //       </button>
// //       <button onClick={handleReject} disabled={isPending}
// //         className="px-3 py-1.5 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50">
// //         {isPending ? '...' : 'Reject'}
// //       </button>
// //     </div>
// //   );
// // }
// 'use client';

// import { useTransition } from 'react';
// import { useRouter } from 'next/navigation';
// import { approveQuote, rejectQuote, deleteQuote } from '@/actions/quotes';

// interface QuoteActionsProps {
//   quoteId: string;
//   status: string;
// }

// export default function QuoteActions({ quoteId, status }: QuoteActionsProps) {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   if (status !== 'pending') {
//     return (
//       <div className="flex gap-2">
//         <span className="text-sm text-gray-500 capitalize">{status}</span>
//         <button
//           onClick={() => {
//             startTransition(async () => {
//               await deleteQuote(quoteId);
//               router.refresh();
//             });
//           }}
//           disabled={isPending}
//           className="px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors disabled:opacity-50"
//         >
//           {isPending ? '...' : 'Delete'}
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex gap-2">
//       <button
//         onClick={() => {
//           startTransition(async () => {
//             await approveQuote(quoteId);
//             router.refresh();
//           });
//         }}
//         disabled={isPending}
//         className="px-3 py-1.5 rounded-md text-xs font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors disabled:opacity-50"
//       >
//         {isPending ? '...' : 'Approve'}
//       </button>
//       <button
//         onClick={() => {
//           startTransition(async () => {
//             await rejectQuote(quoteId);
//             router.refresh();
//           });
//         }}
//         disabled={isPending}
//         className="px-3 py-1.5 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50"
//       >
//         {isPending ? '...' : 'Reject'}
//       </button>
//     </div>
//   );
// }
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { approveQuote, rejectQuote, deleteQuote } from '@/actions/quotes';

interface QuoteActionsProps {
  quoteId: string;
  status: string;
}

export default function QuoteActions({ quoteId, status }: QuoteActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [rate, setRate] = useState('');
  const [error, setError] = useState('');

  if (status !== 'pending') {
    return (
      <div className="flex gap-2">
        <span className="text-sm text-gray-500 capitalize">{status}</span>
        <button
          onClick={() => {
            startTransition(async () => {
              await deleteQuote(quoteId);
              router.refresh();
            });
          }}
          disabled={isPending}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {isPending ? '...' : 'Delete'}
        </button>
      </div>
    );
  }

  const handleApprove = () => {
    const carrierRate = parseFloat(rate);
    if (!rate || isNaN(carrierRate) || carrierRate <= 0) {
      setError('Enter a rate');
      return;
    }
    setError('');
    startTransition(async () => {
      try {
        await approveQuote(quoteId, carrierRate);
        router.refresh();
      } catch (err: any) {
        setError(err.message || 'Failed to approve');
      }
    });
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Carrier rate $"
          className="w-28 rounded-md border border-gray-300 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <button
          onClick={handleApprove}
          disabled={isPending}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors disabled:opacity-50"
        >
          {isPending ? '...' : 'Approve'}
        </button>
        <button
          onClick={() => {
            startTransition(async () => {
              await rejectQuote(quoteId);
              router.refresh();
            });
          }}
          disabled={isPending}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50"
        >
          {isPending ? '...' : 'Reject'}
        </button>
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}