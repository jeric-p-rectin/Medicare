'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@/types/user';
import { Student } from '@/types/student';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountInfoCard } from '@/components/account/account-info-card';
import { ProfileForm } from '@/components/account/profile-form';
import { PasswordForm } from '@/components/account/password-form';
import { UserManagementTable } from '@/components/account/user-management-table';
import { PatientInfoSection } from '@/components/account/patient-info-section';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingStudent, setIsLoadingStudent] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }
  }, [status]);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!session?.user?.id) return;

      setIsLoadingUser(true);
      try {
        const response = await fetch(`/api/users/${session.user.id}`);
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.error('Failed to fetch user details:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserDetails();
  }, [session?.user?.id]);

  // Fetch student record if user is a PATIENT
  useEffect(() => {
    const fetchStudentRecord = async () => {
      if (!session?.user?.id || session?.user?.role !== 'PATIENT') return;

      setIsLoadingStudent(true);
      try {
        const response = await fetch(`/api/students/user/${session.user.id}`);
        const data = await response.json();

        if (response.ok) {
          setStudent(data);
        } else {
          // Student record not found - this is okay for new patients
          setStudent(null);
        }
      } catch (error) {
        console.error('Error fetching student record:', error);
        setStudent(null);
      } finally {
        setIsLoadingStudent(false);
      }
    };

    fetchStudentRecord();
  }, [session?.user?.id, session?.user?.role]);

  if (status === 'loading' || isLoadingUser) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#C41E3A]" />
      </div>
    );
  }

  if (!session || !user) {
    return null;
  }

  const tabs = [
    { value: 'profile', label: 'Profile', show: true },
    { value: 'password', label: 'Password', show: true },
    { value: 'users', label: 'User Management', show: user.role === 'SUPER_ADMIN' || user.role === 'ADMIN' },
    { value: 'medical', label: 'Medical Records', show: user.role === 'PATIENT' },
  ];

  const visibleTabs = tabs.filter((tab) => tab.show);

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Account Settings</h1>
        <p className="text-gray-500 mb-6">
          Manage your profile, security, and preferences
        </p>

        {/* Account Info Card */}
        <AccountInfoCard user={user} student={student} />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white rounded-xl p-1 shadow-sm border border-gray-100">
            {visibleTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="px-6 py-3 rounded-lg font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C41E3A] data-[state=active]:to-[#E63946] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/30"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <ProfileForm user={user} onUpdate={setUser} />
          </TabsContent>

          {/* Password Tab */}
          <TabsContent value="password" className="space-y-6">
            <PasswordForm userId={user.id} />
          </TabsContent>

          {/* User Management Tab (SUPER_ADMIN and ADMIN) */}
          {(user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') && (
            <TabsContent value="users" className="space-y-6">
              <UserManagementTable />
            </TabsContent>
          )}

          {/* Medical Records Tab (PATIENT only) */}
          {user.role === 'PATIENT' && (
            <TabsContent value="medical" className="space-y-6">
              <PatientInfoSection student={student} isLoading={isLoadingStudent} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
