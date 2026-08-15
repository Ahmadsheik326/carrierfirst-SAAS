'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type DocType = 'bol' | 'pod';

const TYPE_LABELS: Record<DocType, string> = {
  bol: 'Bill of Lading',
  pod: 'Proof of Delivery',
};

interface Props {
  loadId: string;
  docType: DocType;
  onClose: () => void;
}

export default function DocumentUploadModal({ loadId, docType, onClose }: Props) {
  const supabase = createClient();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      const filePath = `${loadId}/${docType}/${Date.now()}-${file.name}`;

      const { error: uploadErr } = await supabase.storage
        .from('load-documents')
        .upload(filePath, file);
      if (uploadErr) throw uploadErr;

     const { error: insertErr } = await supabase.from('documents').insert({
  load_id: loadId,
  user_id: user.id,
  uploaded_by: user.id,        // ADD THIS
  file_name: file.name,
  file_path: filePath,
  file_type: docType,
  document_type: docType,
  file_size: file.size,
  mime_type: file.type,
  status: 'approved',          // ADD THIS
});
      if (insertErr) throw insertErr;

      router.refresh();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          Upload {TYPE_LABELS[docType]}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Attach the {TYPE_LABELS[docType].toLowerCase()} for this load, or skip and add it later.
        </p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-3">
            {error}
          </p>
        )}

        <input
          type="file"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 mb-4"
        />

        <div className="flex justify-end">
          <button
            onClick={onClose}
            disabled={uploading}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {uploading ? 'Uploading…' : 'Skip for now'}
          </button>
        </div>
      </div>
    </div>
  );
}