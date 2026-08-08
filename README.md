# QOLTIX Freight SaaS Portal

A production-ready multi-tenant freight marketplace built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Supabase.

## Features

### Three Portals
- **Broker Admin** — Manage loads, review quotes, set pricing, view analytics
- **Shipper** — Submit quote requests, track loads, view invoices
- **Carrier** — Browse load board, place bids, manage documents

### Calculator Engine (Freds Data)
- Base RPM by equipment type × market (8 markets × 7 equipment types)
- Weight adjustments for Hot Shot equipment
- Short-mile surcharges (Hot Shot <200mi, Flatbed/Stepdeck <200mi and 201-275mi)
- Add-ons: Region X ($350), Tarp ($100), Stop fees ($75/stop)
- Service charges: $3.25 + $2.65 + $1.75
- Automatic 15% broker margin calculation

### Tech Stack
- Next.js 15 (App Router + Server Actions)
- React 19 + TypeScript
- Tailwind CSS
- Supabase (Auth, PostgreSQL, RLS)
- Row-Level Security for multi-tenant data isolation

## Project Structure

```
qoltix-freight-saas/
├── app/
│   ├── (auth)/login/page.tsx       # Login page
│   ├── (dashboard)/
│   │   ├── layout.tsx               # Dashboard layout with sidebar
│   │   ├── page.tsx                 # Dashboard home
│   │   ├── loads/page.tsx           # All loads (broker)
│   │   ├── loads/new/page.tsx       # Create load
│   │   ├── quotes/page.tsx          # Quote requests
│   │   ├── quotes/new/page.tsx      # Submit quote (shipper)
│   │   ├── pricing/page.tsx         # Freds Data pricing table
│   │   ├── load-board/page.tsx      # Available loads (carrier)
│   │   ├── bids/page.tsx            # My bids (carrier)
│   │   └── analytics/page.tsx       # Analytics dashboard
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── calculator/freight-calculator.tsx   # Core calculator UI
│   ├── dashboard/stats-cards.tsx           # Stats cards
│   ├── load-board/load-card.tsx            # Load card + bid modal
│   ├── load-board/bid-modal.tsx            # Bid submission modal
│   ├── pricing/pricing-table.tsx          # Editable RPM matrix
│   ├── quotes/quote-form.tsx               # Shipper quote form
│   ├── quotes/quote-actions.tsx           # Approve/reject buttons
│   └── shared/sidebar.tsx                 # Role-based navigation
├── actions/
│   ├── loads.ts                    # Load CRUD server actions
│   ├── quotes.ts                   # Quote request actions
│   ├── bids.ts                     # Bid actions
│   └── pricing.ts                  # Pricing matrix actions
├── lib/
│   ├── constants/pricing.ts        # Equipment, markets, rates
│   ├── utils/calculator.ts         # Freds Data calculation engine
│   ├── utils/helpers.ts            # Utility functions
│   └── supabase/
│       ├── client.ts               # Browser client
│       ├── server.ts               # Server client
│       └── middleware.ts           # Auth middleware
├── types/index.ts                  # TypeScript types
├── hooks/use-auth.ts               # Auth hook
├── middleware.ts                   # Next.js middleware
├── supabase-schema.sql             # Complete database schema
└── package.json
```

## Step-by-Step Setup

### 1. Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier works)

### 2. Create Next.js Project
```bash
npx create-next-app@latest qoltix-freight-saas --typescript --tailwind --eslint --app --no-src-dir
```
When prompted, select:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No
- App Router: Yes
- Import alias: Yes (`@/*`)

### 3. Install Dependencies
```bash
cd qoltix-freight-saas
npm install @supabase/ssr @supabase/supabase-js
```

### 4. Extract the ZIP
Extract `qoltix-freight-saas.zip` and copy all files into your project folder, overwriting where needed.

### 5. Set Up Supabase
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your **Project URL** and **Anon Key** from Project Settings → API
3. Open `.env.local` and paste your credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 6. Run the Database Schema
1. In Supabase Dashboard, go to **SQL Editor**
2. Create a **New Query**
3. Copy the entire contents of `supabase-schema.sql`
4. Click **Run**
5. This creates all tables, triggers, RLS policies, and seeds the pricing matrix

### 7. Set Up Auth (Optional but recommended)
In Supabase Dashboard → Authentication → Settings:
- Enable **Email** provider
- Set Site URL to `http://localhost:3000` for local dev

### 8. Run the App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 9. Create Users (via Supabase Dashboard)
Since new users default to `shipper` role, you need to manually update roles for testing:

Go to Supabase Dashboard → Table Editor → `users` table:
- Create a broker: set `role` = `broker_admin`
- Create a carrier: set `role` = `carrier`
- Create a shipper: set `role` = `shipper` (default)

Sign up users via the app login page, then update their roles in Supabase.

## Calculator Logic (Freds Data)

### Equipment Types
- 0 - 10 feet Hot Shot
- 11 - 20 feet Hot Shot
- 21 - 30 feet Hot Shot
- 31 - 40 feet Hot Shot
- 42 feet Hot Shot
- Stepdeck
- Flatbed

### Markets
Chicago IL, Philadelphia, Charlotte, Atlanta GA, Denver CO, Houston TX, Cleveland OH, Des Moines IA

### Rate Calculation
1. **Base RPM** = Lookup from equipment + market matrix
2. **Weight Adjustment** (Hot Shot only):
   - < 3,000 lbs: $0
   - 3,100 - 10,000 lbs: +$0.1084/mi
   - 10,000 - 14,999 lbs: +$0.10/mi
   - 15,000 - 20,000 lbs: +$0.10/mi
3. **Effective RPM** = Base RPM + Weight Adjustment
4. **Linehaul** = Effective RPM × Mileage
5. **Stop Fees** = Number of stops × $75
6. **Tarp Fee** = $100 (if selected)
7. **Region X Surcharge** = $350 (if selected)
8. **Short-Mile Surcharge**:
   - Hot Shot < 200 mi: $350
   - Flatbed/Stepdeck < 200 mi: $500
   - Flatbed/Stepdeck 201-275 mi: $100
9. **Service Charges** = $3.25 + $2.65 + $1.75 = $7.65
10. **Bid Total** = Linehaul + all fees above
11. **Broker Margin** = Bid Total × 15%

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
Set environment variables in Vercel Dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Railway
1. Push to GitHub
2. Connect Railway to your repo
3. Add environment variables
4. Deploy

## Next Steps / Production Checklist
- [ ] Add Stripe for payments
- [ ] Add email notifications (Resend/Postmark)
- [ ] Add SMS notifications (Twilio)
- [ ] Add document upload via Supabase Storage
- [ ] Add real-time updates via Supabase Realtime
- [ ] Add Google Maps for route visualization
- [ ] Add load tracking with GPS integration
- [ ] Add credit line management for shippers
- [ ] Add invoicing with PDF generation
- [ ] Add messaging system between broker/carrier/shipper
- [ ] Add audit logs
- [ ] Add rate limiting
- [ ] Add input validation with Zod
- [ ] Add error monitoring (Sentry)

## Support
For issues or questions, contact qoltix@gmail.com
