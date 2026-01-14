'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoutButtonProps {
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
}

export function LogoutButton({
  className,
  showIcon = true,
  showText = true,
}: LogoutButtonProps) {
  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <button
      onClick={handleLogout}
      className={cn(
        'flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors',
        className
      )}
    >
      {showIcon && <LogOut className="w-5 h-5" />}
      {showText && <span>Logout</span>}
    </button>
  );
}
