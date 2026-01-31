'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
};

const allNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'ADMIN', 'PATIENT'] },
  { href: '/patients', label: 'Patients', icon: Users, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { href: '/registration', label: 'Registration', icon: UserPlus, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { href: '/statistics', label: 'Statistics', icon: BarChart3, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { href: '/account', label: 'Account', icon: Settings, roles: ['SUPER_ADMIN', 'ADMIN', 'PATIENT'] },
];

interface NavContentProps {
  navItems: NavItem[];
  pathname: string;
  onMobileClose: () => void;
  onLogout: () => void;
}

function NavContent({ navItems, pathname, onMobileClose, onLogout }: NavContentProps) {
  return (
    <>
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center gap-3">
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
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 min-h-0 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200',
                isActive
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:bg-red-50 hover:text-[#C41E3A]'
              )}
              style={
                isActive
                  ? {
                      background: 'linear-gradient(135deg, #C41E3A 0%, #E63946 100%)',
                      boxShadow: '0 4px 12px rgba(196, 30, 58, 0.3)',
                    }
                  : undefined
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data: session } = useSession();

  // Filter navigation items based on user role
  const navItems = allNavItems.filter(item =>
    item.roles.includes(session?.user?.role || '')
  );

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
        style={{ boxShadow: '0 2px 8px rgba(196, 30, 58, 0.1)' }}
      >
        {isMobileOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-100 h-screen sticky top-0 overflow-hidden">
        <NavContent
          navItems={navItems}
          pathname={pathname}
          onMobileClose={() => setIsMobileOpen(false)}
          onLogout={handleLogout}
        />
      </aside>

      {/* Sidebar - Mobile */}
      <aside
        className={cn(
          'lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 z-50 flex flex-col transition-transform duration-300',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <NavContent
          navItems={navItems}
          pathname={pathname}
          onMobileClose={() => setIsMobileOpen(false)}
          onLogout={handleLogout}
        />
      </aside>
    </>
  );
}
