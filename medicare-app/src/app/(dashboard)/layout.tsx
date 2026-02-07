import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react';
import { Sidebar } from '@/components/layout/sidebar';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Toaster } from '@/components/ui/sonner';
import { TrendAlertPopup } from '@/components/alerts/trend-alert-popup';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
          {/* Header */}
          <DashboardHeader user={session.user} />

          {/* Page Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
      <Toaster />
      <TrendAlertPopup />
    </SessionProvider>
  );
}
