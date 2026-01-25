'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export function PatientLogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}
