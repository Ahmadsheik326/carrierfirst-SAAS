// actions/documents.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Document, DocumentType, DocumentStatus } from '@/types';

// ===== YOUR EXISTING FUNCTION (keep this) =====
export type LoadDocument = {
  id: string;
  file_name: string;
  file_path: string;
  document_type: string;
  file_size: number | null;
  created_at: string;
};

export async function getLoadDocuments(loadId: string): Promise<LoadDocument[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('documents')
    .select('id, file_name, file_path, document_type, file_size, created_at')
    .eq('load_id', loadId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load documents:', error.message);
    return [];
  }
  return (data as LoadDocument[]) || [];
}

// ===== NEW FUNCTIONS (add below) =====

export async function getMyDocuments(): Promise<Document[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data || []) as Document[];
}

// Replace the getEntityDocuments function in actions/documents.ts
// Replace getEntityDocuments in actions/documents.ts
export async function getEntityDocuments(
  entityType: 'carrier' | 'shipper',
  entityId: string
): Promise<Document[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Verify broker
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  const isBroker = profile?.role === 'broker_admin' || profile?.role === 'broker_staff' || profile?.role === 'super_admin';
  if (!isBroker) throw new Error('Unauthorized');

  // Look up the carrier/shipper's auth user_id
  const table = entityType === 'carrier' ? 'carriers' : 'shippers';
  const { data: entity } = await supabase
    .from(table)
    .select('user_id')
    .eq('id', entityId)
    .single();

  if (!entity?.user_id) {
    console.log(`[getEntityDocuments] No ${entityType} found with id: ${entityId}`);
    return [];
  }

  console.log(`[getEntityDocuments] Looking for docs with user_id: ${entity.user_id}, entity_type: ${entityType}`);

  // Query documents by user_id (primary) OR entity_id (fallback)
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .or(`user_id.eq.${entity.user_id},entity_id.eq.${entityId}`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getEntityDocuments] Error:', error.message);
    throw new Error(error.message);
  }

  console.log(`[getEntityDocuments] Found ${data?.length || 0} documents`);
  return (data || []) as Document[];
}

export async function uploadDocument(
  formData: FormData,
  documentType: DocumentType,
  entityType: string,
  entityId: string,
  expiryDate?: string,
  notes?: string
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const file = formData.get('file') as File;
  if (!file) throw new Error('No file provided');

  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File size exceeds 10MB');
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'pdf';
  const timestamp = Date.now();
  const safeName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const filePath = `${user.id}/${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from('documents')
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  const { data, error } = await supabase
    .from('documents')
    .insert({
      user_id: user.id,
      file_name: file.name,
      file_path: filePath,
      file_type: ext,
      file_size: file.size,
      mime_type: file.type,
      document_type: documentType,
      status: 'pending',
      expiry_date: expiryDate || null,
      notes: notes || null,
      uploaded_by: user.id,
      entity_type: entityType,
      entity_id: entityId,
    })
    .select()
    .single();

  if (error) {
    await supabase.storage.from('documents').remove([filePath]);
    throw new Error(error.message);
  }

  revalidatePath('/documents');
  revalidatePath(`/carriers/${entityId}`);
  revalidatePath(`/shippers/${entityId}`);
  return data as Document;
}

export async function getDocumentUrl(filePath: string): Promise<string> {
  const supabase = await createClient();
  
  // Try documents bucket first
  let result = await supabase.storage
    .from('documents')
    .createSignedUrl(filePath, 300);
  
  // If not found, try load-documents bucket
  if (result.error) {
    console.log('[getDocumentUrl] Not in documents bucket, trying load-documents:', result.error.message);
    result = await supabase.storage
      .from('load-documents')
      .createSignedUrl(filePath, 300);
  }

  if (result.error) {
    console.error('[getDocumentUrl] Failed both buckets:', result.error.message);
    throw new Error(result.error.message);
  }
  
  return result.data!.signedUrl;
}

export async function updateDocumentStatus(
  documentId: string,
  status: DocumentStatus,
  brokerNotes?: string
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('documents')
    .update({
      status,
      notes: brokerNotes || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', documentId);

  if (error) throw new Error(error.message);
  revalidatePath('/documents');
  return { success: true };
}

export async function deleteDocument(documentId: string, filePath: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error: dbError } = await supabase
    .from('documents')
    .delete()
    .eq('id', documentId)
    .eq('uploaded_by', user.id)
    .eq('status', 'pending');

  if (dbError) throw new Error(dbError.message);

  await supabase.storage.from('documents').remove([filePath]);
  revalidatePath('/documents');
  return { success: true };
}