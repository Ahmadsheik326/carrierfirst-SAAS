// // app/(dashboard)/layout.tsx
// import { createClient } from '@/lib/supabase/server';
// import { redirect } from 'next/navigation';
// import Sidebar from '@/components/shared/sidebar';

// export default async function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     redirect('/login');
//   }

//   const { data: userData } = await supabase
//     .from('users')
//     .select('role')
//     .eq('id', user.id)
//     .single();

//   const role = userData?.role || 'shipper';

//   return (
//     <div className="dashboard-scope flex flex-col lg:flex-row min-h-screen bg-gray-50" suppressHydrationWarning>
//       <Sidebar role={role} />
//       <main className="flex-1 overflow-y-auto">
//         <div className="max-w-7xl mx-auto p-6 lg:p-8">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }
// app/(dashboard)/layout.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/shared/sidebar';
import NotificationBell from '@/components/shared/notification-bell';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  const role = userData?.role || 'shipper';

  return (
    <div className="dashboard-scope flex flex-col lg:flex-row min-h-screen bg-gray-50" suppressHydrationWarning>
      <Sidebar role={role} />
      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className="hidden lg:flex items-center justify-end border-b border-gray-200 bg-white px-6 py-3">
          <NotificationBell />
        </div>
        <div className="max-w-7xl mx-auto p-6 lg:p-8 w-full">
          {children}
        </div>
      </main>
    </div>
  );
}