// types/index.ts

export type UserRole = 'super_admin' | 'broker_admin' | 'broker_staff' | 'shipper' | 'carrier';

export type LoadStatus = 'pending' | 'approved' | 'bidding' | 'booked' | 'in_transit' | 'delivered' | 'rejected';

export type QuoteStatus = 'pending' | 'approved' | 'rejected';

export type BidStatus = 'pending' | 'accepted' | 'rejected';

export interface Company {
  id: string;
  name: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  company_id: string | null;
  full_name: string | null;
  created_at: string;
}

export interface Load {
  id: string;
  load_id: string;
  shipper_name: string;
  origin: string;
  destination: string;
  equipment_type: string;
  mileage: number;
  weight: number;
  stops: number;
  tarp: boolean;
  region_x: boolean;
  status: LoadStatus;
  bid_total: number;
  margin: number;
  carrier_id: string | null;
  broker_id: string | null;
  created_at: string;
}

export interface QuoteRequest {
  id: string;
  shipper_name: string;
  origin: string;
  destination: string;
  equipment_type: string;
  mileage: number;
  weight: number;
  stops: number;
  tarp: boolean;
  region_x: boolean;
  market: string;
  estimated_total: number;
  status: QuoteStatus;
  created_at: string;
}

export interface Bid {
  id: string;
  load_id: string;
  carrier_id: string;
  amount: number;
  status: BidStatus;
  created_at: string;
}

export interface Carrier {
  id: string;
  company_name: string;
  mc_number: string | null;
  dot_number: string | null;
  insurance_status: string | null;
  safety_rating: string | null;
  created_at: string;
}

export interface PricingMatrixEntry {
  id: string;
  equipment_type: string;
  market: string;
  rpm: number;
}

export interface CalculationResult {
  baseRPM: number;
  weightAdjRPM: number;
  effectiveRPM: number;
  linehaul: number;
  stopFee: number;
  tarpFee: number;
  regionXFee: number;
  shortMile: number;
  serviceCharges: number;
  bidTotal: number;
  margin: number;
  market: string;
}

export interface LoadInput {
  equipment: string;
  origin: string;
  mileage: number;
  weight: number;
  stops: number;
  tarp: boolean;
  regionX: boolean;
}

export interface Load {
  id: string;
  load_id: string;
  shipper_name: string;
  shipper_id: string | null;  // ← ADD THIS LINE
  origin: string;
  destination: string;
  equipment_type: string;
  mileage: number;
  weight: number;
  stops: number;
  tarp: boolean;
  region_x: boolean;
  status: LoadStatus;
  bid_total: number;
  margin: number;
  carrier_id: string | null;
  broker_id: string | null;
  created_at: string;
}
// ===== DOCUMENT VAULT TYPES (append at bottom) =====

export type DocumentType = 
  | 'insurance'
  | 'w9'
  | 'authority'
  | 'rate_confirmation'
  | 'bol'
  | 'pod'
  | 'load_photo'
  | 'logo'
  | 'contract'
  | 'dot_number'  
  | 'mc_number'
  | 'other';

export type DocumentStatus = 'pending' | 'approved' | 'rejected' | 'expired';

export interface Document {
  id: string;
  load_id: string | null;
  user_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  mime_type: string | null;
  created_at: string;
  document_type: DocumentType;
  status: DocumentStatus;
  expiry_date: string | null;
  notes: string | null;
  uploaded_by: string | null;
  entity_type: 'carrier' | 'shipper' | 'broker' | null;
  entity_id: string | null;
  updated_at: string;
}

export const documentTypeLabels: Record<DocumentType, string> = {
  insurance: 'Insurance Certificate',
  w9: 'W-9 Form',
  authority: 'Operating Authority',
  rate_confirmation: 'Rate Confirmation',
  bol: 'Bill of Lading',
  pod: 'Proof of Delivery',
  load_photo: 'Load Photo',
  logo: 'Company Logo',
  dot_number: 'DOT Number',     
  mc_number: 'MC Number',
  contract: 'Contract Agreement',
  other: 'Other Document',
};

export const documentStatusConfig: Record<DocumentStatus, { label: string; color: string; bg: string; border: string; dot: string }> = {
  pending: {
    label: 'Pending Review',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  approved: {
    label: 'Approved',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },
  rejected: {
    label: 'Rejected',
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
  },
  expired: {
    label: 'Expired',
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    border: 'border-slate-200',
    dot: 'bg-slate-500',
  },
};