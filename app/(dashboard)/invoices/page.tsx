// // app/(dashboard)/invoices/page.tsx
// 'use client';

// import { useEffect, useState, useCallback } from 'react';
// import { createClient } from '@/lib/supabase/client';

// interface LoadOption {
//   id: string;
//   load_id: string;
//   shipper_name: string;
//   bid_total: number | null;
//   company_id: string | null;
// }

// interface InvoiceRow {
//   id: string;
//   invoice_number: string;
//   amount: number;
//   status: 'pending' | 'paid' | 'overdue' | 'refunded';
//   due_date: string | null;
//   paid_at: string | null;
//   created_at: string;
//   load_id: string | null;
//   loads: { load_id: string; shipper_name: string } | null;
// }

// const STATUS_STYLES: Record<string, string> = {
//   pending: 'bg-amber-100 text-amber-800',
//   paid: 'bg-emerald-100 text-emerald-800',
//   overdue: 'bg-red-100 text-red-800',
//   refunded: 'bg-gray-100 text-gray-700',
// };

// export default function InvoicesPage() {
//   const supabase = createClient();
//   const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
//   const [loads, setLoads] = useState<LoadOption[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreate, setShowCreate] = useState(false);
//   const [selectedLoadId, setSelectedLoadId] = useState('');
//   const [amount, setAmount] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [creating, setCreating] = useState(false);
//   const [error, setError] = useState('');

//   const loadInvoices = useCallback(async () => {
//     const { data } = await supabase
//       .from('invoices')
//       .select('id, invoice_number, amount, status, due_date, paid_at, created_at, load_id, loads(load_id, shipper_name)')
//       .order('created_at', { ascending: false });

//     setInvoices((data as any) ?? []);
//     setLoading(false);
//   }, [supabase]);

//   const loadOpenLoads = useCallback(async () => {
//     const { data } = await supabase
//       .from('loads')
//       .select('id, load_id, shipper_name, bid_total, company_id')
//       .in('status', ['booked', 'in_transit', 'delivered'])
//       .order('created_at', { ascending: false })
//       .limit(100);

//     setLoads((data as LoadOption[]) ?? []);
//   }, [supabase]);

//   useEffect(() => {
//     loadInvoices();
//     loadOpenLoads();
//   }, [loadInvoices, loadOpenLoads]);

//   const handleLoadSelect = (loadId: string) => {
//     setSelectedLoadId(loadId);
//     const load = loads.find((l) => l.id === loadId);
//     if (load?.bid_total) setAmount(String(load.bid_total));
//   };

//   const generateInvoiceNumber = (loadRefId: string | null) => {
//     const load = loads.find((l) => l.id === loadRefId);
//     const suffix = load?.load_id || Date.now().toString();
//     return `INV-MANUAL-${suffix}-${Math.floor(Math.random() * 900 + 100)}`;
//   };

//   const handleCreate = async () => {
//     if (!amount) {
//       setError('Amount is required.');
//       return;
//     }
//     setCreating(true);
//     setError('');

//     const load = loads.find((l) => l.id === selectedLoadId);

//     const { error: insertErr } = await supabase.from('invoices').insert({
//       load_id: selectedLoadId || null,
//       company_id: load?.company_id ?? null,
//       invoice_number: generateInvoiceNumber(selectedLoadId || null),
//       amount: parseFloat(amount),
//       status: 'pending',
//       due_date: dueDate || null,
//     });

//     if (insertErr) {
//       setError(insertErr.message);
//     } else {
//       setShowCreate(false);
//       setSelectedLoadId('');
//       setAmount('');
//       setDueDate('');
//       await loadInvoices();
//     }
//     setCreating(false);
//   };

//   const markPaid = async (id: string) => {
//     await supabase
//       .from('invoices')
//       .update({ status: 'paid', paid_at: new Date().toISOString() })
//       .eq('id', id);
//     await loadInvoices();
//   };

//   const formatMoney = (n: number) =>
//     n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Invoicing</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Auto-generated on delivery, or create one manually below.
//           </p>
//         </div>
//         <button
//           onClick={() => setShowCreate(true)}
//           className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
//         >
//           + New Invoice
//         </button>
//       </div>

//       {showCreate && (
//         <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
//           <h2 className="text-sm font-semibold text-gray-700 mb-4">Create invoice</h2>
//           <div className="grid sm:grid-cols-3 gap-4 mb-4">
//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
//                 Load (optional)
//               </label>
//               <select
//                 value={selectedLoadId}
//                 onChange={(e) => handleLoadSelect(e.target.value)}
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
//               >
//                 <option value="">— Standalone invoice —</option>
//                 {loads.map((l) => (
//                   <option key={l.id} value={l.id}>
//                     {l.load_id} · {l.shipper_name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
//                 Amount ($)
//               </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
//                 Due date
//               </label>
//               <input
//                 type="date"
//                 value={dueDate}
//                 onChange={(e) => setDueDate(e.target.value)}
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
//               />
//             </div>
//           </div>
//           {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
//           <div className="flex gap-3">
//             <button
//               onClick={handleCreate}
//               disabled={creating}
//               className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 disabled:opacity-50"
//             >
//               {creating ? 'Creating…' : 'Create Invoice'}
//             </button>
//             <button
//               onClick={() => setShowCreate(false)}
//               className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//         {loading ? (
//           <div className="p-12 text-center text-gray-400 text-sm">Loading…</div>
//         ) : invoices.length === 0 ? (
//           <div className="p-12 text-center text-gray-500 text-sm">No invoices yet.</div>
//         ) : (
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
//               <tr>
//                 <th className="text-left px-6 py-3 font-semibold">Invoice #</th>
//                 <th className="text-left px-6 py-3 font-semibold">Load / Shipper</th>
//                 <th className="text-left px-6 py-3 font-semibold">Amount</th>
//                 <th className="text-left px-6 py-3 font-semibold">Due</th>
//                 <th className="text-left px-6 py-3 font-semibold">Status</th>
//                 <th className="text-right px-6 py-3 font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {invoices.map((inv) => (
//                 <tr key={inv.id}>
//                   <td className="px-6 py-3 text-gray-900 font-medium">{inv.invoice_number}</td>
//                   <td className="px-6 py-3 text-gray-600">
//                     {inv.loads ? `${inv.loads.load_id} · ${inv.loads.shipper_name}` : '—'}
//                   </td>
//                   <td className="px-6 py-3 text-gray-900">{formatMoney(inv.amount)}</td>
//                   <td className="px-6 py-3 text-gray-500">
//                     {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : '—'}
//                   </td>
//                   <td className="px-6 py-3">
//                     <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${STATUS_STYLES[inv.status]}`}>
//                       {inv.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-3 text-right">
//                     {inv.status === 'pending' && (
//                       <button
//                         onClick={() => markPaid(inv.id)}
//                         className="text-emerald-700 font-medium hover:underline"
//                       >
//                         Mark Paid
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }
// app/(dashboard)/invoices/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface LoadOption {
  id: string;
  load_id: string;
  shipper_name: string;
  bid_total: number | null;
  company_id: string | null;
}

interface InvoiceRow {
  id: string;
  invoice_number: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'refunded';
  due_date: string | null;
  paid_at: string | null;
  created_at: string;
  load_id: string | null;
  loads: { load_id: string; shipper_name: string } | null;
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  paid: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  overdue: 'bg-red-100 text-red-800 border-red-200',
  refunded: 'bg-gray-100 text-gray-700 border-gray-200',
};

const STATUS_ACCENT: Record<string, string> = {
  pending: 'border-l-amber-500',
  paid: 'border-l-emerald-500',
  overdue: 'border-l-red-500',
  refunded: 'border-l-gray-300',
};

export default function InvoicesPage() {
  const supabase = createClient();
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [loads, setLoads] = useState<LoadOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedLoadId, setSelectedLoadId] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const loadInvoices = useCallback(async () => {
    const { data } = await supabase
      .from('invoices')
      .select('id, invoice_number, amount, status, due_date, paid_at, created_at, load_id, loads(load_id, shipper_name)')
      .order('created_at', { ascending: false });

    setInvoices((data as any) ?? []);
    setLoading(false);
  }, [supabase]);

  const loadOpenLoads = useCallback(async () => {
    const { data } = await supabase
      .from('loads')
      .select('id, load_id, shipper_name, bid_total, company_id')
      .in('status', ['booked', 'in_transit', 'delivered'])
      .order('created_at', { ascending: false })
      .limit(100);

    setLoads((data as LoadOption[]) ?? []);
  }, [supabase]);

  useEffect(() => {
    loadInvoices();
    loadOpenLoads();
  }, [loadInvoices, loadOpenLoads]);

  const handleLoadSelect = (loadId: string) => {
    setSelectedLoadId(loadId);
    const load = loads.find((l) => l.id === loadId);
    if (load?.bid_total) setAmount(String(load.bid_total));
  };

  const generateInvoiceNumber = (loadRefId: string | null) => {
    const load = loads.find((l) => l.id === loadRefId);
    const suffix = load?.load_id || Date.now().toString();
    return `INV-MANUAL-${suffix}-${Math.floor(Math.random() * 900 + 100)}`;
  };

  const handleCreate = async () => {
    if (!amount) {
      setError('Amount is required.');
      return;
    }
    setCreating(true);
    setError('');

    const load = loads.find((l) => l.id === selectedLoadId);

    const { error: insertErr } = await supabase.from('invoices').insert({
      load_id: selectedLoadId || null,
      company_id: load?.company_id ?? null,
      invoice_number: generateInvoiceNumber(selectedLoadId || null),
      amount: parseFloat(amount),
      status: 'pending',
      due_date: dueDate || null,
    });

    if (insertErr) {
      setError(insertErr.message);
    } else {
      setShowCreate(false);
      setSelectedLoadId('');
      setAmount('');
      setDueDate('');
      await loadInvoices();
    }
    setCreating(false);
  };

  const markPaid = async (id: string) => {
    await supabase
      .from('invoices')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('id', id);
    await loadInvoices();
  };

  const formatMoney = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const stats = [
    { label: 'Total Invoiced', value: formatMoney(invoices.reduce((s, i) => s + i.amount, 0)), accent: 'bg-slate-900' },
    { label: 'Pending', value: invoices.filter((i) => i.status === 'pending').length, accent: 'bg-amber-500' },
    { label: 'Paid', value: invoices.filter((i) => i.status === 'paid').length, accent: 'bg-emerald-500' },
    { label: 'Overdue', value: invoices.filter((i) => i.status === 'overdue').length, accent: 'bg-red-500' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoicing</h1>
          <p className="text-sm text-gray-500 mt-1">
            Auto-generated on delivery, or create one manually below.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
        >
          + New Invoice
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${s.accent}`} />
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1 pl-2 truncate">{s.label}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 pl-2">{s.value}</p>
          </div>
        ))}
      </div>

      {showCreate && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Create invoice</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Load (optional)
              </label>
              <select
                value={selectedLoadId}
                onChange={(e) => handleLoadSelect(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="">— Standalone invoice —</option>
                {loads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.load_id} · {l.shipper_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Due date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              disabled={creating}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 disabled:opacity-50"
            >
              {creating ? 'Creating…' : 'Create Invoice'}
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading…</div>
        ) : invoices.length === 0 ? (
          <div className="p-16 text-center text-gray-400 text-sm">No invoices yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900">
                  <th className="text-left px-6 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Invoice #</th>
                  <th className="text-left px-6 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Load / Shipper</th>
                  <th className="text-left px-6 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Due</th>
                  <th className="text-left px-6 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className={`hover:bg-slate-50 border-l-4 ${STATUS_ACCENT[inv.status]} transition-colors`}>
                    <td className="px-6 py-3 text-gray-900 font-semibold font-mono">{inv.invoice_number}</td>
                    <td className="px-6 py-3 text-gray-600">
                      {inv.loads ? `${inv.loads.load_id} · ${inv.loads.shipper_name}` : '—'}
                    </td>
                    <td className="px-6 py-3 text-gray-900 font-bold">{formatMoney(inv.amount)}</td>
                    <td className="px-6 py-3 text-gray-500 font-mono">
                      {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_STYLES[inv.status]}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      {inv.status === 'pending' && (
                        <button
                          onClick={() => markPaid(inv.id)}
                          className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-md hover:bg-emerald-100"
                        >
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}