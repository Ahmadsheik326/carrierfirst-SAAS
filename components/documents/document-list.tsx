// 'use client';

// import { useState, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { getDocumentUrl, deleteDocument, updateDocumentStatus } from '@/actions/documents';
// import { DocumentStatusBadge } from './document-status-badge';
// import { DocumentTypeBadge } from './document-type-badge';
// import { UploadModal } from './upload-modal';
// import { documentTypeLabels } from '@/types';
// import type { Document } from '@/types';

// interface DocumentListProps {
//   documents: Document[];
//   entityType: 'carrier' | 'shipper' | 'broker';
//   entityId: string;
//   isBroker?: boolean;
//   allowUpload?: boolean;
// }

// export function DocumentList({ documents, entityType, entityId, isBroker = false, allowUpload = true }: DocumentListProps) {
//   const [showUpload, setShowUpload] = useState(false);
//   const [viewingDoc, setViewingDoc] = useState<Document | null>(null);
//   const [docUrl, setDocUrl] = useState('');
//   const router = useRouter();

//   const handleView = async (doc: Document) => {
//     try {
//       const url = await getDocumentUrl(doc.file_path);
//       setDocUrl(url);
//       setViewingDoc(doc);
//     } catch (err) {
//       console.error('Failed to get document URL', err);
//     }
//   };

//   const handleDelete = async (doc: Document) => {
//     if (!confirm(`Delete "${doc.file_name}"?`)) return;
//     try {
//       await deleteDocument(doc.id, doc.file_path);
//       router.refresh();
//     } catch (err: any) {
//       alert(err.message);
//     }
//   };

//   const handleStatusUpdate = async (docId: string, status: Document['status']) => {
//     try {
//       await updateDocumentStatus(docId, status);
//       router.refresh();
//     } catch (err: any) {
//       alert(err.message);
//     }
//   };

//   const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   const isExpired = (expiryDate: string | null) => expiryDate ? new Date(expiryDate) < new Date() : false;

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-lg font-semibold text-slate-900">Documents</h2>
//           <p className="text-sm text-slate-500">{documents.length} document{documents.length !== 1 ? 's' : ''}</p>
//         </div>
//         {allowUpload && (
//           <button onClick={() => setShowUpload(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors">
//             + Upload Document
//           </button>
//         )}
//       </div>

//       {documents.length === 0 ? (
//         <div className="border border-slate-200 rounded-xl p-12 text-center bg-white">
//           <p className="text-3xl mb-3">📁</p>
//           <p className="text-sm font-medium text-slate-900">No documents yet</p>
//           <p className="text-xs text-slate-500 mt-1">Upload insurance, authority, W-9, and other required documents</p>
//         </div>
//       ) : (
//         <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-slate-950 text-white">
//                 <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider">Document</th>
//                 <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider">Type</th>
//                 <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider">Status</th>
//                 <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider">Uploaded</th>
//                 <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider">Expiry</th>
//                 <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {documents.map((doc) => (
//                 <tr key={doc.id} className={`border-b border-slate-100 hover:bg-slate-50/60 transition-colors ${isExpired(doc.expiry_date) ? 'bg-rose-50/30' : ''}`}>
//                   <td className="px-4 py-3.5">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm">
//                         {doc.mime_type?.includes('pdf') ? '📄' : '🖼️'}
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-slate-900 truncate max-w-[180px]">{doc.file_name}</p>
//                         <p className="text-xs text-slate-500">{(doc.file_size ? (doc.file_size / 1024).toFixed(1) : '0')} KB</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3.5"><DocumentTypeBadge type={doc.document_type} /></td>
//                   <td className="px-4 py-3.5"><DocumentStatusBadge status={isExpired(doc.expiry_date) ? 'expired' : (doc.status || 'pending')} /></td>
//                   <td className="px-4 py-3.5 text-sm text-slate-600 tabular-nums">{formatDate(doc.created_at)}</td>
//                   <td className="px-4 py-3.5 text-sm text-slate-600 tabular-nums">
//                     {doc.expiry_date ? (
//                       <span className={isExpired(doc.expiry_date) ? 'text-rose-600 font-semibold' : ''}>
//                         {formatDate(doc.expiry_date)}{isExpired(doc.expiry_date) && ' (Expired)'}
//                       </span>
//                     ) : <span className="text-slate-400">—</span>}
//                   </td>
//                   <td className="px-4 py-3.5">
//                     <div className="flex items-center gap-2">
//                       <button onClick={() => handleView(doc)} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">View</button>
//                       {isBroker && doc.status === 'pending' && (
//                         <>
//                           <button onClick={() => handleStatusUpdate(doc.id, 'approved')} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">Approve</button>
//                           <button onClick={() => handleStatusUpdate(doc.id, 'rejected')} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors">Reject</button>
//                         </>
//                       )}
//                       {!isBroker && doc.status === 'pending' && (
//                         <button onClick={() => handleDelete(doc)} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors">Delete</button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {showUpload && <UploadModal entityType={entityType} entityId={entityId} onClose={() => setShowUpload(false)} onSuccess={() => router.refresh()} />}

//       {viewingDoc && docUrl && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setViewingDoc(null)}>
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
//             <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
//               <div>
//                 <h3 className="font-semibold text-slate-900">{viewingDoc.file_name}</h3>
//                 <p className="text-xs text-slate-500">{documentTypeLabels[viewingDoc.document_type]}</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <a href={docUrl} download={viewingDoc.file_name} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">Download</a>
//                 <button onClick={() => setViewingDoc(null)} className="text-slate-400 hover:text-slate-600 text-xl">&times;</button>
//               </div>
//             </div>
//             <div className="flex-1 p-4 overflow-auto bg-slate-50">
//               {viewingDoc.mime_type?.includes('pdf') ? (
//                 <iframe src={docUrl} className="w-full h-[600px] rounded-lg border border-slate-200 bg-white" />
//               ) : (
//                 <img src={docUrl} alt={viewingDoc.file_name} className="max-w-full rounded-lg border border-slate-200" />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getDocumentUrl, deleteDocument, updateDocumentStatus } from '@/actions/documents';
import { DocumentStatusBadge } from './document-status-badge';
import { DocumentTypeBadge } from './document-type-badge';
import { UploadModal } from './upload-modal';
import { documentTypeLabels } from '@/types';
import type { Document, DocumentType } from '@/types';
import Link from 'next/link';

interface DocumentListProps {
  documents: Document[];
  entityType: 'carrier' | 'shipper' | 'broker';
  entityId: string;
  isBroker?: boolean;
  allowUpload?: boolean;
}

// Required compliance docs for carriers
const CARRIER_REQUIRED_DOCS: DocumentType[] = [
  'authority', 'insurance', 'w9', 'dot_number'
];

// Required compliance docs for shippers
const SHIPPER_REQUIRED_DOCS: DocumentType[] = [
  'w9', 'contract', 'insurance'
];

// All compliance types (not load-related)
const COMPLIANCE_TYPES: DocumentType[] = [
  'authority', 'insurance', 'w9', 'dot_number', 'mc_number',
  'contract', 'logo', 'other'
];

// Load-related types
const LOAD_DOC_TYPES: DocumentType[] = [
  'bol', 'pod', 'load_photo', 'rate_confirmation'
];

export function DocumentList({ documents, entityType, entityId, isBroker = false, allowUpload = true }: DocumentListProps) {
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForType, setUploadForType] = useState<DocumentType>('other');
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);
  const [docUrl, setDocUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'compliance' | 'loads'>('compliance');
  const router = useRouter();

  const handleView = async (doc: Document) => {
    try {
      const url = await getDocumentUrl(doc.file_path);
      setDocUrl(url);
      setViewingDoc(doc);
    } catch (err) {
      console.error('Failed to get document URL', err);
    }
  };

  const handleDelete = async (doc: Document) => {
    if (!confirm(`Delete "${doc.file_name}"?`)) return;
    try {
      await deleteDocument(doc.id, doc.file_path);
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleStatusUpdate = async (docId: string, status: Document['status']) => {
    try {
      await updateDocumentStatus(docId, status);
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Separate docs
  const complianceDocs = documents.filter(d => !d.load_id && COMPLIANCE_TYPES.includes(d.document_type));
  const loadDocs = documents.filter(d => d.load_id || LOAD_DOC_TYPES.includes(d.document_type));

  // Get required list based on role
  const requiredDocs = entityType === 'shipper' ? SHIPPER_REQUIRED_DOCS : CARRIER_REQUIRED_DOCS;

  // Calculate compliance score
  const approvedCount = complianceDocs.filter(d => d.status === 'approved' && !isExpired(d.expiry_date)).length;
  const totalRequired = requiredDocs.length;
  const complianceScore = Math.round((approvedCount / totalRequired) * 100);

  // Group load docs by load_id
  const loadDocsByLoad = loadDocs.reduce((acc, doc) => {
    const loadId = doc.load_id || 'unassigned';
    if (!acc[loadId]) acc[loadId] = [];
    acc[loadId].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  const getDocIcon = (type: DocumentType) => {
    const icons: Record<string, string> = {
      insurance: '🛡️', authority: '📋', w9: '📄', dot_number: '🚛',
      mc_number: '🚛', contract: '📝', bol: '📄', pod: '✅',
      load_photo: '📷', rate_confirmation: '💰', logo: '🏢', other: '📎'
    };
    return icons[type] || '📎';
  };

  const getDocColor = (status: string, isMissing?: boolean) => {
    if (isMissing) return 'slate';
    if (status === 'approved') return 'green';
    if (status === 'pending') return 'amber';
    if (status === 'rejected') return 'red';
    return 'slate';
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('compliance')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'compliance'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          📋 Compliance
        </button>
        <button
          onClick={() => setActiveTab('loads')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'loads'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          🚛 Load Docs ({loadDocs.length})
        </button>
      </div>

      {/* ===== COMPLIANCE TAB ===== */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          {/* Compliance Score */}
          <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4">
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15" fill="none"
                  stroke={complianceScore >= 80 ? '#059669' : complianceScore >= 50 ? '#d97706' : '#dc2626'}
                  strokeWidth="3"
                  strokeDasharray={`${complianceScore * 0.94} 94`}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-900">
                {complianceScore}%
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Compliance Score</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {approvedCount} of {totalRequired} required documents approved
              </p>
            </div>
            {allowUpload && complianceScore < 100 && (
              <button
                onClick={() => { setUploadForType('other'); setShowUpload(true); }}
                className="ml-auto px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                + Upload Document
              </button>
            )}
          </div>

          {/* Required Docs Grid */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Required Documents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {requiredDocs.map((reqType) => {
                const doc = complianceDocs.find(d => d.document_type === reqType);
                const isMissing = !doc;
                const status = doc ? (isExpired(doc.expiry_date) ? 'expired' : doc.status) : 'missing';
                const color = getDocColor(status, isMissing);

                return (
                  <div
                    key={reqType}
                    className={`relative bg-white border rounded-xl p-5 transition-all ${
                      isMissing ? 'border-dashed border-2 border-slate-200 bg-slate-50/50' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                        color === 'green' ? 'bg-emerald-50' :
                        color === 'amber' ? 'bg-amber-50' :
                        color === 'red' ? 'bg-rose-50' : 'bg-slate-100'
                      }`}>
                        {getDocIcon(reqType)}
                      </div>
                      {!isMissing && (
                        <DocumentStatusBadge status={status as any} />
                      )}
                      {isMissing && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                          Required
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-semibold text-slate-900 mb-1">
                      {documentTypeLabels[reqType]}
                    </p>

                    {doc ? (
                      <>
                        <p className="text-xs text-slate-500 mb-3">
                          {formatDate(doc.created_at)} • {formatSize(doc.file_size)}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(doc)}
                            className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            View
                          </button>
                          {isBroker && doc.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(doc.id, 'approved')}
                                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(doc.id, 'rejected')}
                                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {!isBroker && doc.status === 'pending' && (
                            <button
                              onClick={() => handleDelete(doc)}
                              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-50/80 rounded-xl">
                        <p className="text-xs font-semibold text-slate-500">Not uploaded</p>
                        {allowUpload && (
                          <button
                            onClick={() => { setUploadForType(reqType); setShowUpload(true); }}
                            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                          >
                            + Upload Now
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Other Compliance Docs */}
          {complianceDocs.filter(d => !requiredDocs.includes(d.document_type)).length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                Additional Documents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {complianceDocs
                  .filter(d => !requiredDocs.includes(d.document_type))
                  .map((doc) => (
                    <div key={doc.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
                          {getDocIcon(doc.document_type)}
                        </div>
                        <DocumentStatusBadge status={isExpired(doc.expiry_date) ? 'expired' : doc.status} />
                      </div>
                      <p className="text-sm font-semibold text-slate-900 mb-1">{documentTypeLabels[doc.document_type]}</p>
                      <p className="text-xs text-slate-500 mb-3">{formatDate(doc.created_at)} • {formatSize(doc.file_size)}</p>
                      <div className="flex gap-2">
                        <button onClick={() => handleView(doc)} className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">View</button>
                        {isBroker && doc.status === 'pending' && (
                          <>
                            <button onClick={() => handleStatusUpdate(doc.id, 'approved')} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100">Approve</button>
                            <button onClick={() => handleStatusUpdate(doc.id, 'rejected')} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100">Reject</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== LOAD DOCUMENTS TAB ===== */}
      {activeTab === 'loads' && (
        <div className="space-y-6">
          {loadDocs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
              <p className="text-3xl mb-3">🚛</p>
              <p className="text-sm font-medium text-slate-900">No load documents yet</p>
              <p className="text-xs text-slate-500 mt-1">BOLs and PODs will appear here when carriers upload them during pickup and delivery</p>
            </div>
          ) : (
            Object.entries(loadDocsByLoad).map(([loadId, docs]) => (
              <div key={loadId} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🚛</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {loadId === 'unassigned' ? 'Unassigned Documents' : `Load ${loadId}`}
                      </p>
                      <p className="text-xs text-slate-500">{docs.length} document{docs.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  {loadId !== 'unassigned' && (
                    <Link
                      href={`/loads/${loadId}`}
                      className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      View Load →
                    </Link>
                  )}
                </div>
                <div className="divide-y divide-slate-100">
                  {docs.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg">
                          {doc.document_type === 'bol' ? '📄' : doc.document_type === 'pod' ? '✅' : '📷'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{doc.file_name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                              doc.document_type === 'bol' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              doc.document_type === 'pod' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {doc.document_type === 'bol' ? '📄 BOL' : doc.document_type === 'pod' ? '✅ POD' : '📷 Photo'}
                            </span>
                            <span className="text-xs text-slate-400">{formatDate(doc.created_at)} • {formatSize(doc.file_size)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(doc)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          View
                        </button>
                        <a
                          href={docUrl} // Will be set on view
                          onClick={(e) => { e.preventDefault(); handleView(doc); }}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal
          entityType={entityType}
          entityId={entityId}
          defaultDocType={uploadForType}
          onClose={() => setShowUpload(false)}
          onSuccess={() => router.refresh()}
        />
      )}

      {/* View Modal */}
      {viewingDoc && docUrl && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setViewingDoc(null)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{viewingDoc.file_name}</h3>
                <p className="text-xs text-slate-500">{documentTypeLabels[viewingDoc.document_type]} • {formatSize(viewingDoc.file_size)}</p>
              </div>
              <div className="flex items-center gap-3">
                <a href={docUrl} download={viewingDoc.file_name} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">Download</a>
                <button onClick={() => setViewingDoc(null)} className="text-slate-400 hover:text-slate-600 text-xl">&times;</button>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-auto bg-slate-50">
              {viewingDoc.mime_type?.includes('pdf') ? (
                <iframe src={docUrl} className="w-full h-[600px] rounded-lg border border-slate-200 bg-white" />
              ) : (
                <img src={docUrl} alt={viewingDoc.file_name} className="max-w-full rounded-lg border border-slate-200" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}