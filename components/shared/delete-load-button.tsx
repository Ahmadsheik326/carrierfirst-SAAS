// 'use client';

// import { useTransition, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { deleteLoad } from '@/actions/loads';

// export default function DeleteLoadButton({ loadId }: { loadId: string }) {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState('');

//   const handleDelete = () => {
//     if (!confirm('Are you sure you want to delete this load? This cannot be undone.')) return;
    
//     setError('');
    
//     startTransition(async () => {
//       try {
//         const result = await deleteLoad(loadId);
//         console.log('Delete result:', result); // Check browser console
        
//         if (result.error) {
//           setError(result.error);
//           alert('Delete failed: ' + result.error);
//         } else {
//           // Force full page reload so data is 100% fresh
//           window.location.reload();
//         }
//       } catch (err: any) {
//         console.error('Delete exception:', err);
//         alert('Delete error: ' + err.message);
//       }
//     });
//   };

//   return (
//     <div className="flex flex-col items-end gap-1">
//       <button
//         onClick={handleDelete}
//         disabled={isPending}
//         className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors disabled:opacity-50"
//       >
//         {isPending ? 'Deleting...' : 'Delete'}
//       </button>
//       {error && <span className="text-[10px] text-red-500">{error}</span>}
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { deleteLoad } from '@/actions/loads';

export default function DeleteLoadButton({ loadId }: { loadId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Delete this load forever?')) return;

    setIsDeleting(true);
    const result = await deleteLoad(loadId);
    setIsDeleting(false);

    console.log('Result:', result);

    if (result.error) {
      alert('Error: ' + result.error);
    } else {
      alert('Deleted successfully!');
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}