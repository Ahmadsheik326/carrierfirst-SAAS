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