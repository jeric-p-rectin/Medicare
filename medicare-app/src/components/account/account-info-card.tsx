'use client';

import { User } from '@/types/user';
import { Student } from '@/types/student';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

interface AccountInfoCardProps {
  user: User | null;
  student?: Student | null;
}

export function AccountInfoCard({ user, student }: AccountInfoCardProps) {
  if (!user) {
    return (
      <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6 mb-6 animate-pulse">
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  // Get initials for avatar
  const initials = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase();

  // Role badge styling
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white';
      case 'ADMIN':
        return 'bg-red-100 text-[#C41E3A] border border-red-200';
      case 'PATIENT':
        return 'bg-gray-100 text-gray-700 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatRoleName = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'Super Admin';
      case 'ADMIN':
        return 'Admin';
      case 'PATIENT':
        return 'Patient';
      default:
        return role;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6 mb-6">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div
            className="w-24 h-24 rounded-full bg-gradient-to-r from-[#C41E3A] to-[#E63946] flex items-center justify-center shadow-lg shadow-red-500/30"
          >
            <span className="text-3xl font-bold text-white">{initials}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {user.first_name} {user.middle_name} {user.last_name}
            </h2>
            <Badge className={getRoleBadgeClass(user.role)}>
              {formatRoleName(user.role)}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Basic Info */}
            <div>
              <div className="text-sm text-gray-500 mb-1">Username</div>
              <div className="text-gray-800 font-medium font-mono">
                {user.username}
              </div>
            </div>

            {user.email && (
              <div>
                <div className="text-sm text-gray-500 mb-1">Email</div>
                <div className="text-gray-800 font-medium">{user.email}</div>
              </div>
            )}

            <div>
              <div className="text-sm text-gray-500 mb-1">Account Created</div>
              <div className="text-gray-800 font-medium">
                {user.created_at
                  ? format(new Date(user.created_at), 'MMM dd, yyyy')
                  : 'N/A'}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Last Login</div>
              <div className="text-gray-800 font-medium">
                {user.last_login
                  ? format(new Date(user.last_login), 'MMM dd, yyyy h:mm a')
                  : 'Never'}
              </div>
            </div>

            {/* Student-specific info */}
            {student && (
              <>
                <Separator className="col-span-2 my-2" />

                <div>
                  <div className="text-sm text-gray-500 mb-1">Student Number</div>
                  <div className="text-gray-800 font-medium font-mono">
                    {student.studentNumber}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">LRN</div>
                  <div className="text-gray-800 font-medium font-mono">
                    {student.lrn}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Grade & Section</div>
                  <div className="text-gray-800 font-medium">
                    Grade {student.gradeLevel} - {student.section}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
