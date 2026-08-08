-- Supabase Schema for QOLTIX Freight SaaS
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- COMPANIES (Multi-tenant)
-- ============================================
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  subscription_tier TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USERS (extends Supabase auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'broker_admin', 'broker_staff', 'shipper', 'carrier')),
  company_id UUID REFERENCES public.companies(id),
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRICING MATRIX (Freds Data)
-- ============================================
CREATE TABLE IF NOT EXISTS public.pricing_matrix (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_type TEXT NOT NULL,
  market TEXT NOT NULL,
  rpm DECIMAL(10,4) NOT NULL DEFAULT 2.5000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(equipment_type, market)
);

-- ============================================
-- LOADS
-- ============================================
CREATE TABLE IF NOT EXISTS public.loads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  load_id TEXT UNIQUE NOT NULL,
  company_id UUID REFERENCES public.companies(id),
  shipper_name TEXT NOT NULL,
  shipper_id UUID REFERENCES public.users(id),
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  equipment_type TEXT NOT NULL,
  mileage DECIMAL(10,2) NOT NULL,
  weight DECIMAL(10,2) NOT NULL,
  stops INTEGER NOT NULL DEFAULT 0,
  tarp BOOLEAN NOT NULL DEFAULT FALSE,
  region_x BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'bidding', 'booked', 'in_transit', 'delivered', 'rejected')),
  bid_total DECIMAL(12,2),
  margin DECIMAL(12,2),
  carrier_id UUID REFERENCES public.users(id),
  broker_id UUID REFERENCES public.users(id),
  pickup_date DATE,
  delivery_date DATE,
  commodity TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- QUOTE REQUESTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id),
  shipper_name TEXT NOT NULL,
  shipper_id UUID REFERENCES public.users(id),
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  equipment_type TEXT NOT NULL,
  mileage DECIMAL(10,2) NOT NULL,
  weight DECIMAL(10,2) NOT NULL,
  stops INTEGER NOT NULL DEFAULT 0,
  tarp BOOLEAN NOT NULL DEFAULT FALSE,
  region_x BOOLEAN NOT NULL DEFAULT FALSE,
  market TEXT NOT NULL,
  estimated_total DECIMAL(12,2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BIDS
-- ============================================
CREATE TABLE IF NOT EXISTS public.bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  load_id UUID NOT NULL REFERENCES public.loads(id) ON DELETE CASCADE,
  carrier_id UUID NOT NULL REFERENCES public.users(id),
  amount DECIMAL(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(load_id, carrier_id)
);

-- ============================================
-- CARRIERS
-- ============================================
CREATE TABLE IF NOT EXISTS public.carriers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  company_name TEXT NOT NULL,
  mc_number TEXT,
  dot_number TEXT,
  insurance_status TEXT DEFAULT 'pending',
  insurance_expiry DATE,
  safety_rating TEXT,
  equipment_types TEXT[],
  preferred_lanes TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SHIPPERS
-- ============================================
CREATE TABLE IF NOT EXISTS public.shippers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  company_name TEXT NOT NULL,
  credit_limit DECIMAL(12,2) DEFAULT 0,
  credit_balance DECIMAL(12,2) DEFAULT 0,
  payment_terms TEXT DEFAULT 'net_30',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INVOICES
-- ============================================
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  load_id UUID REFERENCES public.loads(id),
  company_id UUID REFERENCES public.companies(id),
  invoice_number TEXT UNIQUE NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'refunded')),
  due_date DATE,
  paid_at TIMESTAMPTZ,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DOCUMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  load_id UUID REFERENCES public.loads(id),
  user_id UUID REFERENCES public.users(id),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MESSAGES
-- ============================================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  load_id UUID REFERENCES public.loads(id),
  sender_id UUID NOT NULL REFERENCES public.users(id),
  receiver_id UUID NOT NULL REFERENCES public.users(id),
  content TEXT NOT NULL,
  attachments JSONB,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ACTIVITY LOGS
-- ============================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  company_id UUID REFERENCES public.companies(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SEED: Default Pricing Matrix (Freds Data)
-- ============================================
INSERT INTO public.pricing_matrix (equipment_type, market, rpm) VALUES
('0 - 10 feet Hot Shot', 'Chicago IL', 2.10),
('0 - 10 feet Hot Shot', 'Philadelphia', 2.20),
('0 - 10 feet Hot Shot', 'Charlotte', 2.05),
('0 - 10 feet Hot Shot', 'Atlanta GA', 2.15),
('0 - 10 feet Hot Shot', 'Denver CO', 2.50),
('0 - 10 feet Hot Shot', 'Houston TX', 2.30),
('0 - 10 feet Hot Shot', 'Cleveland OH', 2.15),
('0 - 10 feet Hot Shot', 'Des Moines IA', 2.40),
('11 - 20 feet Hot Shot', 'Chicago IL', 2.30),
('11 - 20 feet Hot Shot', 'Philadelphia', 2.40),
('11 - 20 feet Hot Shot', 'Charlotte', 2.25),
('11 - 20 feet Hot Shot', 'Atlanta GA', 2.35),
('11 - 20 feet Hot Shot', 'Denver CO', 2.70),
('11 - 20 feet Hot Shot', 'Houston TX', 2.50),
('11 - 20 feet Hot Shot', 'Cleveland OH', 2.35),
('11 - 20 feet Hot Shot', 'Des Moines IA', 2.60),
('21 - 30 feet Hot Shot', 'Chicago IL', 2.50),
('21 - 30 feet Hot Shot', 'Philadelphia', 2.60),
('21 - 30 feet Hot Shot', 'Charlotte', 2.45),
('21 - 30 feet Hot Shot', 'Atlanta GA', 2.55),
('21 - 30 feet Hot Shot', 'Denver CO', 2.90),
('21 - 30 feet Hot Shot', 'Houston TX', 2.70),
('21 - 30 feet Hot Shot', 'Cleveland OH', 2.55),
('21 - 30 feet Hot Shot', 'Des Moines IA', 2.80),
('31 - 40 feet Hot Shot', 'Chicago IL', 2.80),
('31 - 40 feet Hot Shot', 'Philadelphia', 2.90),
('31 - 40 feet Hot Shot', 'Charlotte', 2.75),
('31 - 40 feet Hot Shot', 'Atlanta GA', 2.85),
('31 - 40 feet Hot Shot', 'Denver CO', 3.20),
('31 - 40 feet Hot Shot', 'Houston TX', 3.00),
('31 - 40 feet Hot Shot', 'Cleveland OH', 2.85),
('31 - 40 feet Hot Shot', 'Des Moines IA', 3.10),
('42 feet Hot Shot', 'Chicago IL', 3.00),
('42 feet Hot Shot', 'Philadelphia', 3.10),
('42 feet Hot Shot', 'Charlotte', 2.95),
('42 feet Hot Shot', 'Atlanta GA', 3.05),
('42 feet Hot Shot', 'Denver CO', 3.40),
('42 feet Hot Shot', 'Houston TX', 3.20),
('42 feet Hot Shot', 'Cleveland OH', 3.05),
('42 feet Hot Shot', 'Des Moines IA', 3.30),
('Stepdeck', 'Chicago IL', 2.40),
('Stepdeck', 'Philadelphia', 2.50),
('Stepdeck', 'Charlotte', 2.35),
('Stepdeck', 'Atlanta GA', 2.45),
('Stepdeck', 'Denver CO', 2.80),
('Stepdeck', 'Houston TX', 2.60),
('Stepdeck', 'Cleveland OH', 2.45),
('Stepdeck', 'Des Moines IA', 2.70),
('Flatbed', 'Chicago IL', 2.20),
('Flatbed', 'Philadelphia', 2.30),
('Flatbed', 'Charlotte', 2.15),
('Flatbed', 'Atlanta GA', 2.25),
('Flatbed', 'Denver CO', 2.60),
('Flatbed', 'Houston TX', 2.40),
('Flatbed', 'Cleveland OH', 2.25),
('Flatbed', 'Des Moines IA', 2.50)
ON CONFLICT (equipment_type, market) DO NOTHING;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carriers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shippers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_matrix ENABLE ROW LEVEL SECURITY;

-- Companies: visible to members
CREATE POLICY "Companies visible to members" ON public.companies
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE users.company_id = companies.id AND users.id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'super_admin')
  );

-- Users: visible within same company or super admin
CREATE POLICY "Users visible within company" ON public.users
  FOR SELECT USING (
    company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid())
    OR role = 'super_admin'
  );

-- Loads: visible to broker, shipper (own loads), carrier (available/bidded)
CREATE POLICY "Loads visible to authenticated" ON public.loads
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid())
  );

CREATE POLICY "Loads insertable by brokers" ON public.loads
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role IN ('broker_admin', 'broker_staff', 'super_admin'))
  );

CREATE POLICY "Loads updatable by brokers or assigned carrier" ON public.loads
  FOR UPDATE USING (
    broker_id = auth.uid()
    OR carrier_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'super_admin')
  );

-- Quote Requests
CREATE POLICY "Quotes visible to brokers and owner" ON public.quote_requests
  FOR SELECT USING (
    shipper_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role IN ('broker_admin', 'broker_staff', 'super_admin'))
  );

CREATE POLICY "Quotes insertable by shippers" ON public.quote_requests
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'shipper')
  );

CREATE POLICY "Quotes updatable by brokers" ON public.quote_requests
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role IN ('broker_admin', 'broker_staff', 'super_admin'))
  );

-- Bids
CREATE POLICY "Bids visible to participants" ON public.bids
  FOR SELECT USING (
    carrier_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.loads WHERE loads.id = bids.load_id AND loads.broker_id = auth.uid()
    )
    OR EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'super_admin')
  );

CREATE POLICY "Bids insertable by carriers" ON public.bids
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'carrier')
  );

-- Pricing Matrix: visible to all, editable by brokers
CREATE POLICY "Pricing visible to all" ON public.pricing_matrix FOR SELECT USING (true);
CREATE POLICY "Pricing editable by brokers" ON public.pricing_matrix
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role IN ('broker_admin', 'super_admin'))
  );

-- Documents
CREATE POLICY "Documents visible to load participants" ON public.documents
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.loads WHERE loads.id = documents.load_id AND (loads.broker_id = auth.uid() OR loads.carrier_id = auth.uid() OR loads.shipper_id = auth.uid()))
  );

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_loads_updated_at BEFORE UPDATE ON public.loads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bids_updated_at BEFORE UPDATE ON public.bids
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role, full_name)
  VALUES (NEW.id, NEW.email, 'shipper', NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
