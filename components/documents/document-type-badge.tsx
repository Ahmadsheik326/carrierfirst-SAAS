'use client';

import { memo } from 'react';
import { documentTypeLabels } from '@/types';
import type { DocumentType } from '@/types';

const typeIcons: Record<DocumentType, string> = {
  insurance: '🛡️',
  w9: '📄',
  authority: '📋',
  rate_confirmation: '💰',
  bol: '📦',
  pod: '✅',
  load_photo: '📷',
  logo: '🏢',
  contract: '📝',
  other: '📎',
};

export const DocumentTypeBadge = memo(function DocumentTypeBadge({ type }: { type: DocumentType }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
      <span className="text-sm">{typeIcons[type]}</span>
      {documentTypeLabels[type]}
    </span>
  );
});