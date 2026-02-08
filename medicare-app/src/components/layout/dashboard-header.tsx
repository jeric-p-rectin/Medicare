'use client';

import { AlertPopover } from '@/components/alerts/alert-popover';

interface DashboardHeaderProps {
  user?: {
    name?: string | null;
    role?: string;
  };
}

export function DashboardHeader({ user }: DashboardHeaderProps) {

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
      <div className="flex items-center justify-end">
        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Alert System */}
          <AlertPopover />

          {/* User Info */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold"
              style={{
                background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)',
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="block">
              <p className="font-medium text-gray-800 truncate max-w-[100px] sm:max-w-none">
                {user?.name || 'User'}
              </p>
              <span
                className="hidden sm:inline-flex text-xs px-2 py-0.5 rounded-full font-medium"
                style={getRoleBadgeStyle(user?.role || '')}
              >
                {user?.role || 'User'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
