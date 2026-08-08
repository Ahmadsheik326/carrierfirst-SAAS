// // app/(dashboard)/invoices/page.tsx
// 'use client';

// import { useEffect, useState, useCallback } from 'react';
// import { createClient } from '@/lib/supabase/client';

// interface Invoice {
//   id: string;
//   invoice_number: string;
//   amount: number;
//   status: 'pending' | 'paid' | 'overdue' | 'refunded';
//   due_date: string | null;
//   paid_at: string | null;
//   created_at: string;
//   load_id: string | null;
//   loads?: { load_id: string; shipper_name: string } | null;
// }

// interface LoadOption {
//   id: string;
//   load_id: string;
//   shipper_name: string;
//   bid_total: number | null;
//   status: string;
// }

// const STATUS_STYLES: Record<string, string> = {
//   pending: 'bg-amber-100 text-amber-700',
//   paid: 'bg-emerald-100 text-emerald-700',
//   overdue: 'bg-red-100 text-red-700',
//   refunded: 'bg-gray-100 text-gray-700',
// };

// export default function InvoicesPage() {
//   const supabase = createClient();
//   const [invoices, setInvoices] = useState<Invoice[]>([]);
//   const [loads, setLoads] = useState<LoadOption[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedLoadId, setSelectedLoadId] = useState('');
//   const [amount, setAmount] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState('');

//   const loadData = useCallback(async () => {
//     const { data: invoiceData } = await supabase
//       .from('invoices')
//       .select('id, invoice_number, amount, status, due_date, paid_at, created_at, load_id, loads(load_id, shipper_name)')
//       .order('created_at', { ascending: false });

//     setInvoices((invoiceData as any) ?? []);

//     // Loads eligible for a manual invoice: booked or delivered, no invoice yet.
//     const { data: loadData } = await supabase
//       .from('loads')
//       .select('id, load_id, shipper_name, bid_total, status')
//       .in('status', ['booked', 'in_transit', 'delivered'])
//       .order('created_at', { ascending: false })
//       .limit(50);

//     setLoads((loadData as LoadOption[]) ?? []);
//     setLoading(false);
//   }, [supabase]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const handleLoadSelect = (loadId: string) => {
//     setSelectedLoadId(loadId);
//     const match = loads.find((l) => l.id === loadId);
//     if (match?.bid_total) {
//       setAmount(String(match.bid_total));
//     }
//   };

//   const generateInvoiceNumber = () => {
//     const today = new Date();
//     const datePart = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
//     const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
//     return `INV-${datePart}-${randomPart}`;
//   };

//   const handleCreate = async () => {
//     if (!amount) {
//       setError('Amount is required.');
//       return;
//     }
//     setSaving(true);
//     setError('');

//     const selectedLoad = loads.find((l) => l.id === selectedLoadId);

//     const { error: insertErr } = await supabase.from('invoices').insert({
//       load_id: selectedLoadId || null,
//       invoice_number: generateInvoiceNumber(),
//       amount: parseFloat(amount),
//       status: 'pending',
//       due_date: dueDate || null,
//     });

//     if (insertErr) {
//       setError(insertErr.message);
//       setSaving(false);
//       return;
//     }

//     setShowForm(false);
//     setSelectedLoadId('');
//     setAmount('');
//     setDueDate('');
//     setSaving(false);
//     await loadData();
//   };

//   const markPaid = async (id: string) => {
//     await supabase
//       .from('invoices')
//       .update({ status: 'paid', paid_at: new Date().toISOString() })
//       .eq('id', id);
//     await loadData();
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-1">Invoicing</h1>
//           <p className="text-sm text-gray-500">
//             Auto-generated on delivery, or create one manually below.
//           </p>
//         </div>
//         <button
//           onClick={() => setShowForm((v) => !v)}
//           className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
//         >
//           {showForm ? 'Cancel' : '+ New Invoice'}
//         </button>
//       </div>

//       {showForm && (
//         <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
//           <h2 className="text-sm font-semibold text-gray-700 mb-4">Create invoice</h2>

//           <div className="grid sm:grid-cols-3 gap-4 mb-4">
//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
//                 Link to load (optional)
//               </label>
//               <select
//                 value={selectedLoadId}
//                 onChange={(e) => handleLoadSelect(e.target.value)}
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
//               >
//                 <option value="">— No load —</option>
//                 {loads.map((l) => (
//                   <option key={l.id} value={l.id}>
//                     {l.load_id} — {l.shipper_name}
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
//                 placeholder="0.00"
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

//           {error && (
//             <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-3">
//               {error}
//             </p>
//           )}

//           <button
//             onClick={handleCreate}
//             disabled={saving}
//             className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
//           >
//             {saving ? 'Creating…' : 'Create Invoice'}
//           </button>
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
//                 <th className="text-left px-6 py-3 font-semibold">Load</th>
//                 <th className="text-left px-6 py-3 font-semibold">Amount</th>
//                 <th className="text-left px-6 py-3 font-semibold">Status</th>
//                 <th className="text-left px-6 py-3 font-semibold">Due</th>
//                 <th className="text-right px-6 py-3 font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {invoices.map((inv) => (
//                 <tr key={inv.id}>
//                   <td className="px-6 py-3 text-gray-900 font-medium">{inv.invoice_number}</td>
//                   <td className="px-6 py-3 text-gray-500">{inv.loads?.load_id ?? '—'}</td>
//                   <td className="px-6 py-3 text-gray-900">${Number(inv.amount).toFixed(2)}</td>
//                   <td className="px-6 py-3">
//                     <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${STATUS_STYLES[inv.status]}`}>
//                       {inv.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-3 text-gray-500">
//                     {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : '—'}
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
  pending: 'bg-amber-100 text-amber-800',
  paid: 'bg-emerald-100 text-emerald-800',
  overdue: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-700',
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
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          + New Invoice
        </button>
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              disabled={creating}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 disabled:opacity-50"
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
          <div className="p-12 text-center text-gray-500 text-sm">No invoices yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Invoice #</th>
                <th className="text-left px-6 py-3 font-semibold">Load / Shipper</th>
                <th className="text-left px-6 py-3 font-semibold">Amount</th>
                <th className="text-left px-6 py-3 font-semibold">Due</th>
                <th className="text-left px-6 py-3 font-semibold">Status</th>
                <th className="text-right px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="px-6 py-3 text-gray-900 font-medium">{inv.invoice_number}</td>
                  <td className="px-6 py-3 text-gray-600">
                    {inv.loads ? `${inv.loads.load_id} · ${inv.loads.shipper_name}` : '—'}
                  </td>
                  <td className="px-6 py-3 text-gray-900">{formatMoney(inv.amount)}</td>
                  <td className="px-6 py-3 text-gray-500">
                    {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${STATUS_STYLES[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    {inv.status === 'pending' && (
                      <button
                        onClick={() => markPaid(inv.id)}
                        className="text-emerald-700 font-medium hover:underline"
                      >
                        Mark Paid
                      </button>
                    )}
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