'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils/helpers';
interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface SidebarProps {
  role: string;
}

function DashboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}

function LoadsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function PricingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function BidIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CalcIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0111.186 0z" />
    </svg>
  );
}

function TrackIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  );
}

function CreditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  );
}

function InvoiceIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [counts, setCounts] = useState({ quotes: 0, loads: 0, bids: 0, myActive: 0 });
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    const fetchCounts = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || !mounted) return;

        const { count: q } = await supabase
          .from('quote_requests')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        const { count: l } = await supabase
          .from('loads')
          .select('*', { count: 'exact', head: true })
          .in('status', ['bidding', 'approved']);

        const { count: b } = await supabase
          .from('bids')
          .select('*', { count: 'exact', head: true })
          .eq('carrier_id', user.id)
          .eq('status', 'pending');

        const { count: m } = await supabase
          .from('loads')
          .select('*', { count: 'exact', head: true })
          .eq('carrier_id', user.id)
          .in('status', ['booked', 'picked_up', 'in_transit']);

        if (mounted) {
          setCounts({ quotes: q || 0, loads: l || 0, bids: b || 0, myActive: m || 0 });
        }
      } catch {
        // silently fail
      }
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 8000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Close the drawer automatically whenever the route changes —
  // otherwise it stays open after tapping a link on mobile.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const brokerNav: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
    { id: 'loads', label: 'Load Board', href: '/loads', icon: <LoadsIcon /> },
    { id: 'lanes', label: 'Lane Postings', href: '/lanes', icon: <TruckIcon /> },
    { id: 'quotes', label: 'Quote Requests', href: '/quotes', icon: <QuoteIcon />, badge: counts.quotes },
    { id: 'bids', label: 'Carrier Bids', href: '/bids', icon: <BidIcon /> },
    { id: 'calculator', label: 'DAT Calculator', href: '/calculator', icon: <CalcIcon /> },
    { id: 'ltl', label: 'LTL Calculator', href: '/ltl-calculator', icon: <CalcIcon /> },
    { id: 'saved', label: 'Saved Quotes', href: '/saved-quotes', icon: <SaveIcon /> },
    { id: 'tracking', label: 'Load Tracking', href: '/tracking', icon: <TrackIcon /> },
    { id: 'carriers', label: 'Carriers', href: '/carriers', icon: <TruckIcon /> },
    { id: 'shippers', label: 'Shippers', href: '/shippers', icon: <FactoryIcon /> },
    { id: 'invoices', label: 'Invoicing', href: '/invoices', icon: <InvoiceIcon /> },
    { id: 'documents', label: 'Document Vault', href: '/documents', icon: <DocIcon /> },
    { id: 'credit', label: 'Credit Tracking', href: '/credit', icon: <CreditIcon /> },
    { id: 'pricing', label: 'Pricing Settings', href: '/pricing-settings', icon: <PricingIcon /> },
    { id: 'analytics', label: 'Analytics', href: '/analytics', icon: <AnalyticsIcon /> },
    
    
  ];

  const shipperNav: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
    { id: 'quote', label: 'Request Quote', href: '/quotes', icon: <QuoteIcon /> },
    { id: 'myloads', label: 'My Loads', href: '/loads', icon: <LoadsIcon /> },
    { id: 'invoices', label: 'Invoices', href: '/invoices', icon: <InvoiceIcon /> },
    { id: 'documents', label: 'Documents', href: '/documents', icon: <DocIcon /> },
    { id: 'lanes', label: 'Lane Postings', href: '/lanes', icon: <TruckIcon /> },
  ];

  const carrierNav: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
    { id: 'loadboard', label: 'Load Board', href: '/load-board', icon: <LoadsIcon />, badge: counts.loads },
    { id: 'myloads', label: 'My Loads', href: '/loads', icon: <TruckIcon />, badge: counts.myActive },
    { id: 'bids', label: 'My Bids', href: '/bids', icon: <BidIcon />, badge: counts.bids },
    { id: 'documents', label: 'Documents', href: '/documents', icon: <DocIcon /> },
    { id: 'lanes', label: 'Lane Postings', href: '/lanes', icon: <TruckIcon /> },
  ];

  const items = role === 'broker_admin' || role === 'broker_staff' || role === 'super_admin'
    ? brokerNav
    : role === 'shipper'
    ? shipperNav
    : carrierNav;

  const roleLabel =
    role === 'super_admin' ? 'Super Admin' :
    role === 'broker_admin' ? 'Broker Admin' :
    role === 'broker_staff' ? 'Broker Staff' :
    role === 'shipper' ? 'Shipper' : 'Carrier';

  const navContent = (
    <>
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-wide text-slate-900">Carrier First Management</h1>
          <p className="text-xs text-slate-500 mt-1">Freight Portal</p>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-amber-600 font-semibold">
            {roleLabel}
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          className="lg:hidden text-slate-400 hover:text-slate-700 p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-0.5',
              pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>
            <span className="truncate flex-1">{item.label}</span>
            {item.badge && item.badge > 0 ? (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {item.badge}
              </span>
            ) : null}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-200">
        <div className="text-xs text-slate-400">
          <p>Carrier First Management LLC</p>
          <p className="mt-0.5">v1.0.0</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar — visible below lg breakpoint only */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3">
        <span className="font-bold text-slate-900 text-sm tracking-wide">Carrier First Management</span>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="text-slate-600 hover:text-slate-900 p-1.5 -mr-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-in drawer */}
      <aside
        className={cn(
          'lg:hidden fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-200 ease-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {navContent}
      </aside>

      {/* Desktop sidebar — unchanged from before, always visible at lg+ */}
      <aside className="hidden lg:flex w-64 min-h-screen bg-white border-r border-slate-200 flex-col overflow-y-auto">
        {navContent}
      </aside>
    </>
  );
}