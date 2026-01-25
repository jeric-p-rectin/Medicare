import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/sonner';
import Image from 'next/image';
import { PatientLogoutButton } from '@/components/auth/patient-logout-button';

export default async function PatientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Authentication check
  if (!session?.user) {
    redirect('/login');
  }

  // Authorization check: Only patients allowed
  if (session.user.role !== 'PATIENT') {
    if (process.env.NODE_ENV === 'development') {
      console.error('[PATIENT PORTAL LAYOUT] Authorization Failed:', {
        userId: session.user.id,
        userName: session.user.name,
        actualRole: session.user.role,
        requiredRole: 'PATIENT',
        action: 'Redirecting to /dashboard'
      });
    }
    redirect('/dashboard');
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Minimal header with logout only */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="MED-Alert"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-xl font-bold" style={{ color: '#C41E3A' }}>
                  MED-Alert
                </h1>
                <p className="text-xs text-gray-500">School Clinic System</p>
              </div>
            </div>

            {/* User info + logout */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-gray-800">{session.user.name}</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
              <PatientLogoutButton />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </div>
      <Toaster />
    </SessionProvider>
  );
}
