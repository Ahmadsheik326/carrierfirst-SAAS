'use server';

import { createClient } from '@/lib/supabase/server';

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