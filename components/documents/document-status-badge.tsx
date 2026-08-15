// 'use client';

// import { memo } from 'react';
// import { documentStatusConfig } from '@/types';
// import type { DocumentStatus } from '@/types';

// export const DocumentStatusBadge = memo(function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
//   const config = documentStatusConfig[status];
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.border} ${config.color}`}>
//       <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
//       {config.label}
//     </span>
//   );
// });
'use client';

import { memo } from 'react';
import { documentStatusConfig } from '@/types';
import type { DocumentStatus } from '@/types';

export const DocumentStatusBadge = memo(function DocumentStatusBadge({ status }: { status: DocumentStatus | null | undefined }) {
  // Handle null/undefined status (old documents before status column existed)
  const safeStatus = status || 'pending';
  const config = documentStatusConfig[safeStatus];
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.border} ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
});