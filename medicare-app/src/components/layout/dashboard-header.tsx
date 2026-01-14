'use client';

import { useSession } from 'next-auth/react';
import { Bell, Search } from 'lucide-react';

export function DashboardHeader() {
  const { data: session } = useSession();

  const getRoleBadgeStyle = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'superadmin':
        return {
          background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)',
          color: 'white',
        };
      case 'admin':
        return {
          background: 'rgba(196, 30, 58, 0.1)',
          color: '#C41E3A',
        };
      default:
        return {
          background: '#F5F5F5',
          color: '#263238',
        };
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-[#C41E3A] focus:ring-2 focus:ring-red-50 outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-4">
          {/* Notifications */}
          <button
            className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ background: '#E63946' }}
            />
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold"
              style={{
                background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)',
              }}
            >
              {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="hidden sm:block">
              <p className="font-medium text-gray-800">
                {session?.user?.name || 'User'}
              </p>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={getRoleBadgeStyle(session?.user?.role || '')}
              >
                {session?.user?.role || 'User'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
