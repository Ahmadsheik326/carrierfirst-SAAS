'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { LoadDocument } from '@/actions/documents';

type DocType = 'rate_con' | 'bol' | 'pod';

const TYPE_LABELS: Record<string, string> = {
  rate_con: 'Rate Confirmation',
  bol: 'Bill of Lading',
  pod: 'Proof of Delivery',
  other: 'Other',
};

interface Props {
  loadId: string;
  docs: LoadDocument[];
  canUploadRateCon: boolean;
  canUploadCarrierDocs: boolean;
}

export default function LoadDocuments({ loadId, docs, canUploadRateCon, canUploadCarrierDocs }: Props) {
  const supabase = createClient();
  const router = useRouter();
  const [uploading, setUploading] = useState<DocType | null>(null);
  const [error, setError] = useState('');

  const handleUpload = async (file: File, docType: DocType) => {
    setUploading(docType);
    setError('');
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      const filePath = `${loadId}/${docType}/${Date.now()}-${file.name}`;

      const { error: uploadErr } = await supabase.storage
        .from('load-documents')
        .upload(filePath, file);
      if (uploadErr) throw uploadErr;

      const { error: insertErr } = await supabase.from('documents').insert({
        load_id: loadId,
        user_id: user.id,
         uploaded_by: user.id,
        file_name: file.name,
        file_path: filePath,
        file_type: docType,
        document_type: docType,
        file_size: file.size,
        mime_type: file.type,
        status: 'approved', 
      });
      if (insertErr) throw insertErr;

      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(null);
    }
  };

  const handleView = async (filePath: string) => {
    const { data, error: signErr } = await supabase.storage
      .from('load-documents')
      .createSignedUrl(filePath, 60 * 5);
    if (signErr || !data?.signedUrl) {
      setError('Could not open this file.');
      return;
    }
    window.open(data.signedUrl, '_blank');
  };

  const UploadButton = ({ type, label }: { type: DocType; label: string }) => (
    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 cursor-pointer transition-colors">
      {uploading === type ? 'Uploading…' : `Upload ${label}`}
      <input
        type="file"
        className="hidden"
        disabled={uploading !== null}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file, type);
          e.target.value = '';
        }}
      />
    </label>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-700">Documents</h2>
        <div className="flex gap-2">
          {canUploadRateCon && <UploadButton type="rate_con" label="Rate Con" />}
          {canUploadCarrierDocs && <UploadButton type="bol" label="BOL" />}
          {canUploadCarrierDocs && <UploadButton type="pod" label="POD" />}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
          {error}
        </p>
      )}

      {docs.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">No documents uploaded yet.</p>
      ) : (
        <div className="divide-y divide-gray-100">
          {docs.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between py-3">
              <div>
                <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded mr-2">
                  {TYPE_LABELS[doc.document_type] || doc.document_type}
                </span>
                <span className="text-sm text-gray-900">{doc.file_name}</span>
              </div>
              <button
                onClick={() => handleView(doc.file_path)}
                className="text-sm text-slate-900 font-medium hover:underline"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}