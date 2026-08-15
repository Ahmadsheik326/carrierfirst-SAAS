// 'use client';

// import { useState, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { uploadDocument } from '@/actions/documents';
// import { documentTypeLabels } from '@/types';
// import type { DocumentType } from '@/types';

// const documentTypes: DocumentType[] = [
//   'authority', 'insurance', 'w9', 'contract', 'bol', 'pod',
//   'rate_confirmation', 'load_photo', 'logo', 'other',
// ];

// interface UploadModalProps {
//   entityType: 'carrier' | 'shipper' | 'broker';
//   entityId: string;
  
//   onClose: () => void;
//   onSuccess: () => void;
// }

// export function UploadModal({ entityType, entityId, onClose, onSuccess }: UploadModalProps) {
//   const [file, setFile] = useState<File | null>(null);
//   const [docType, setDocType] = useState<DocumentType>('other');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [notes, setNotes] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState('');

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     const dropped = e.dataTransfer.files[0];
//     if (dropped) setFile(dropped);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return;
//     setUploading(true);
//     setError('');

//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       await uploadDocument(formData, docType, entityType, entityId, expiryDate || undefined, notes || undefined);
//       onSuccess();
//       onClose();
//     } catch (err: any) {
//       setError(err.message || 'Upload failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const formatSize = (bytes: number) => {
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//     return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
//         <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-slate-900">Upload Document</h3>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">&times;</button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <div
//             onDrop={handleDrop}
//             onDragOver={e => e.preventDefault()}
//             className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
//               file ? 'border-emerald-300 bg-emerald-50' : 'border-slate-300 hover:border-slate-400'
//             }`}
//           >
//             {file ? (
//               <div className="space-y-1">
//                 <p className="text-sm font-medium text-slate-900">{file.name}</p>
//                 <p className="text-xs text-slate-500">{formatSize(file.size)}</p>
//                 <button type="button" onClick={() => setFile(null)} className="text-xs text-rose-600 hover:underline mt-2">Remove</button>
//               </div>
//             ) : (
//               <div className="space-y-2">
//                 <p className="text-3xl">📁</p>
//                 <p className="text-sm text-slate-600">Drag & drop or click to browse</p>
//                 <p className="text-xs text-slate-400">PDF, PNG, JPG, DOC up to 10MB</p>
//                 <input type="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" id="file-input" />
//                 <label htmlFor="file-input" className="inline-block mt-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg cursor-pointer hover:bg-slate-800">Choose File</label>
//               </div>
//             )}
//           </div>

//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Document Type</label>
//             <select value={docType} onChange={e => setDocType(e.target.value as DocumentType)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900">
//               {documentTypes.map(t => <option key={t} value={t}>{documentTypeLabels[t]}</option>)}
//             </select>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Expiry Date (optional)</label>
//             <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
//           </div>

//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Notes (optional)</label>
//             <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none" placeholder="Add any notes..." />
//           </div>

//           {error && <p className="text-sm text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">{error}</p>}

//           <div className="flex gap-3 pt-2">
//             <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
//             <button type="submit" disabled={!file || uploading} className="flex-1 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed">{uploading ? 'Uploading...' : 'Upload'}</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// components/documents/upload-modal.tsx
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { uploadDocument } from '@/actions/documents';
import { documentTypeLabels } from '@/types';
import type { DocumentType } from '@/types';

const documentTypes: DocumentType[] = [
  'authority', 'insurance', 'w9', 'contract', 'bol', 'pod',
  'rate_confirmation', 'load_photo', 'logo', 'other',
];

interface UploadModalProps {
  entityType: 'carrier' | 'shipper' | 'broker';
  entityId: string;
  defaultDocType?: DocumentType;
  onClose: () => void;
  onSuccess: () => void;
}

export function UploadModal({ entityType, entityId, defaultDocType = 'other', onClose, onSuccess }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<DocumentType>(defaultDocType);
  const [expiryDate, setExpiryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      await uploadDocument(formData, docType, entityType, entityId, expiryDate || undefined, notes || undefined);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Upload Document</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              file ? 'border-emerald-300 bg-emerald-50' : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            {file ? (
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900">{file.name}</p>
                <p className="text-xs text-slate-500">{formatSize(file.size)}</p>
                <button type="button" onClick={() => setFile(null)} className="text-xs text-rose-600 hover:underline mt-2">Remove</button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-3xl">📁</p>
                <p className="text-sm text-slate-600">Drag & drop or click to browse</p>
                <p className="text-xs text-slate-400">PDF, PNG, JPG, DOC up to 10MB</p>
                <input type="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" id="file-input" />
                <label htmlFor="file-input" className="inline-block mt-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg cursor-pointer hover:bg-slate-800">Choose File</label>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Document Type</label>
            <select value={docType} onChange={e => setDocType(e.target.value as DocumentType)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900">
              {documentTypes.map(t => <option key={t} value={t}>{documentTypeLabels[t]}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Expiry Date (optional)</label>
            <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Notes (optional)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none" placeholder="Add any notes..." />
          </div>

          {error && <p className="text-sm text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={!file || uploading} className="flex-1 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed">{uploading ? 'Uploading...' : 'Upload'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}