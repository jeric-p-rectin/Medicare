'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { isErrorWithMessage } from '@/types/api-response';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CreateUserDialog } from './create-user-dialog';
import { toast } from 'sonner';
import { Search, Plus, Loader2, X } from 'lucide-react';
import { format } from 'date-fns';

const ITEMS_PER_PAGE = 10;

export function UserManagementTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (roleFilter) params.append('role', roleFilter);
      if (statusFilter) params.append('status', statusFilter);
      if (search) params.append('search', search);

      const response = await fetch(`/api/users?${params.toString()}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch users');
      }

      setUsers(result.users);
      setPage(1);
    } catch (error: unknown) {
      const message = isErrorWithMessage(error) ? error.message : 'Failed to fetch users';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, statusFilter, search]);

  const handleClearFilters = () => {
    setSearch('');
    setRoleFilter('');
    setStatusFilter('');
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update user status');
      }

      // Check if ADMIN (pending approval) or SUPER_ADMIN (direct action)
      if (result.status === 'pending_approval') {
        toast.info(result.message || 'Request submitted for approval');
      } else {
        toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      }

      fetchUsers();
    } catch (error: unknown) {
      const message = isErrorWithMessage(error) ? error.message : 'Failed to update user status';
      toast.error(message);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Requested deletion' }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete user');
      }

      // Check if ADMIN (pending approval) or SUPER_ADMIN (direct action)
      if (result.status === 'pending_approval') {
        toast.info(result.message || 'Deletion request submitted for approval');
      } else {
        toast.success('User deleted successfully');
      }

      fetchUsers();
    } catch (error: unknown) {
      const message = isErrorWithMessage(error) ? error.message : 'Failed to delete user';
      toast.error(message);
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white';
      case 'ADMIN':
        return 'bg-red-100 text-[#C41E3A]';
      case 'PATIENT':
        return 'bg-gray-100 text-gray-700';
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

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedUsers = users.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">User Management</h3>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create User
        </Button>
      </div>

      {/* Search bar */}
      <div className="mb-4 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by name, username, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl
                     focus:border-[#C41E3A] focus:ring-4 focus:ring-red-50
                     transition-all outline-none shadow-sm"
        />
      </div>

      {/* Filter row */}
      <div className="mb-6 flex gap-4 items-center flex-wrap">
        {/* Role Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:ring-4 focus:ring-red-50 transition-all outline-none text-sm"
          >
            <option value="">All Roles</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="ADMIN">Admin</option>
            <option value="PATIENT">Patient</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:ring-4 focus:ring-red-50 transition-all outline-none text-sm"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Clear Filters */}
        {(roleFilter || statusFilter || search) && (
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="px-4 py-2 border-2 border-gray-200 rounded-xl
                       hover:border-[#C41E3A] hover:bg-[#FFF5F6]
                       transition-all text-sm font-semibold flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#C41E3A]" />
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FFF5F6]">
                <TableHead className="font-semibold text-gray-700">Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Username</TableHead>
                <TableHead className="hidden md:table-cell font-semibold text-gray-700">Email</TableHead>
                <TableHead className="font-semibold text-gray-700">Role</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="hidden lg:table-cell font-semibold text-gray-700">Last Login</TableHead>
                <TableHead className="font-semibold text-gray-700 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-[#FFF5F6]">
                    <TableCell className="font-medium">
                      {user.first_name} {user.last_name}
                    </TableCell>
                    <TableCell className="font-mono text-sm">{user.username}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.email || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeClass(user.role)}>
                        {formatRoleName(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          user.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }
                      >
                        {user.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">
                      {user.last_login
                        ? format(new Date(user.last_login), 'MMM dd, yyyy')
                        : 'Never'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          onClick={() => handleToggleStatus(user.id, user.is_active)}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          {user.is_active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          onClick={() => handleDeleteUser(user.id, `${user.first_name} ${user.last_name}`)}
                          variant="outline"
                          size="sm"
                          className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {totalPages > 1 ? (
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 border-2 border-gray-200 rounded-lg hover:border-[#C41E3A] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
            <span className="text-gray-400 ml-2">· {users.length} user{users.length !== 1 ? 's' : ''}</span>
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 border-2 border-gray-200 rounded-lg hover:border-[#C41E3A] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      ) : (
        <div className="mt-4 text-sm text-gray-500 text-center">
          Showing {users.length} user{users.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Create User Dialog */}
      <CreateUserDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={fetchUsers}
      />
    </div>
  );
}
