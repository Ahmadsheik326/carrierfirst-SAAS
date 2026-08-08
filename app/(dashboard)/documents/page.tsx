// app/(dashboard)/documents/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

type DocCategory = 'insurance' | 'authority' | 'w9' | 'contract' | 'other';

const CATEGORIES: { value: DocCategory; label: string }[] = [
  { value: 'insurance', label: 'Insurance Certificate' },
  { value: 'authority', label: 'MC / DOT Authority' },
  { value: 'w9', label: 'W9' },
  { value: 'contract', label: 'Signed Contract' },
  { value: 'other', label: 'Other' },
];

interface DocRow {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number | null;
  mime_type: string | null;
  created_at: string;
  file_path: string;
}

export default function DocumentsPage() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [docs, setDocs] = useState<DocRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState<DocCategory>('insurance');
  const [insuranceExpiry, setInsuranceExpiry] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadDocs = useCallback(async (uid: string) => {
    const { data, error: fetchErr } = await supabase
  .from('documents')
  .select('id, file_name, file_type, file_size, mime_type, created_at, file_path')
  .eq('user_id', uid)
  .is('load_id', null)
  .order('created_at', { ascending: false });

    if (!fetchErr && data) {
      setDocs(data as DocRow[]);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;
      setUserId(user.id);

      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      setUserRole(profile?.role ?? null);
      await loadDocs(user.id);
    })();
  }, [supabase, loadDocs]);

  const handleUpload = async () => {
    if (!selectedFile || !userId) return;
    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const ext = selectedFile.name.split('.').pop();
      const safeName = `${category}-${Date.now()}.${ext}`;
      const filePath = `${userId}/${safeName}`;

      const { error: uploadErr } = await supabase.storage
        .from('documents')
        .upload(filePath, selectedFile);

      if (uploadErr) throw uploadErr;

      const { error: insertErr } = await supabase.from('documents').insert({
        user_id: userId,
        file_name: selectedFile.name,
        file_path: filePath,
        file_type: category,
        file_size: selectedFile.size,
        mime_type: selectedFile.type,
      });

      if (insertErr) throw insertErr;

      // If this is an insurance doc and the user has a carrier profile
      // already, mark it pending broker review and record the expiry date
      // they gave us. If no carrier row exists yet, we skip this silently —
      // that profile hasn't been created yet, which is a separate flow.
      if (category === 'insurance') {
        await supabase
          .from('carriers')
          .update({
            insurance_status: 'pending',
            insurance_expiry: insuranceExpiry || null,
          })
          .eq('user_id', userId);
      }

      setSuccess('Document uploaded successfully.');
      setSelectedFile(null);
      setInsuranceExpiry('');
      await loadDocs(userId);
    } catch (err: any) {
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleView = async (filePath: string) => {
    const { data, error: signErr } = await supabase.storage
      .from('documents')
      .createSignedUrl(filePath, 60 * 5); // 5 minute link

    if (signErr || !data?.signedUrl) {
      setError('Could not generate a link for this file.');
      return;
    }
    window.open(data.signedUrl, '_blank');
  };

  const handleDelete = async (doc: DocRow) => {
    if (!confirm(`Delete "${doc.file_name}"? This cannot be undone.`)) return;

    const { error: storageErr } = await supabase.storage
      .from('documents')
      .remove([doc.file_path]);

    if (storageErr) {
      setError('Could not delete the file from storage.');
      return;
    }

    await supabase.from('documents').delete().eq('id', doc.id);
    if (userId) await loadDocs(userId);
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const categoryLabel = (value: string) =>
    CATEGORIES.find((c) => c.value === value)?.label ?? value;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Document Vault</h1>
      <p className="text-sm text-gray-500 mb-6">
        Upload insurance certificates, authority letters, W9s, and contracts.
      </p>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Upload a document</h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Document type
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as DocCategory)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {category === 'insurance' && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Expiry date
              </label>
              <input
                type="date"
                value={insuranceExpiry}
                onChange={(e) => setInsuranceExpiry(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            className="flex-1 text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-3">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 mt-3">
            {success}
          </p>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Your documents</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading…</div>
        ) : docs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-sm">No documents uploaded yet.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">File</th>
                <th className="text-left px-6 py-3 font-semibold">Type</th>
                <th className="text-left px-6 py-3 font-semibold">Size</th>
                <th className="text-left px-6 py-3 font-semibold">Uploaded</th>
                <th className="text-right px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {docs.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-6 py-3 text-gray-900">{doc.file_name}</td>
                  <td className="px-6 py-3">
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                      {categoryLabel(doc.file_type)}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">{formatSize(doc.file_size)}</td>
                  <td className="px-6 py-3 text-gray-500">
                    {new Date(doc.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 text-right space-x-3">
                    <button
                      onClick={() => handleView(doc.file_path)}
                      className="text-gray-900 font-medium hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(doc)}
                      className="text-red-600 font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}