'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import type { DashboardStats } from '@/types/statistics';

export default function SchoolWideDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  useEffect(() => {
    // Check for error parameter from middleware redirect
    if (searchParams.get('error') === 'patient_only') {
      setShowAccessDenied(true);
      // Auto-dismiss after 5 seconds
      setTimeout(() => setShowAccessDenied(false), 5000);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStudentCountForGrade = (grade: string) => {
    if (!stats) return 0;
    const gradeData = stats.gradeStats.find((g) => g.grade === grade);
    return gradeData?.totalStudents || 0;
  };

  const getSpecialEdCount = () => {
    if (!stats) return 0;
    const specialEdData = stats.gradeStats.find((g) => g.grade === 'Non-Graded');
    return specialEdData?.totalStudents || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#C41E3A]" />
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-[#FAFAFA]">
      {/* Access Denied Error Message */}
      {showAccessDenied && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Access Denied:</strong> The Patient Portal is only accessible to users with the PATIENT role.
                {session?.user?.role && ` You are logged in as ${session.user.role}.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        School Wide Dashboard
      </h2>

      {/* Total Students Card */}
      <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-8 mb-8">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Total Registered Students</p>
          <div className="text-7xl font-bold bg-gradient-to-r from-[#C41E3A] to-[#E63946] bg-clip-text text-transparent">
            {stats?.totalStudents || 0}
          </div>
        </div>
      </div>

      {/* Special Education Card */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Special Education</h3>
        <div
          className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6
                   cursor-pointer hover:shadow-xl hover:-translate-y-2
                   transition-all duration-300 max-w-xs"
          onClick={() => router.push('/dashboard/grade/Non-Graded')}
        >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full
                        bg-gradient-to-r from-[#C41E3A] to-[#E63946]
                        flex items-center justify-center shadow-lg shadow-red-500/30">
              <span className="text-2xl font-bold text-white">SPED</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {getSpecialEdCount()}
            </div>
            <div className="text-sm text-gray-500">Students</div>
          </div>
        </div>
        <p className="text-gray-500 mt-4 text-sm">
          Click to view Special Education sections
        </p>
      </div>

      {/* Grade Level Cards */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Grade Levels (Junior & Senior High)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {['7', '8', '9', '10', '11', '12'].map((grade) => (
            <div
              key={grade}
              className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6
                       cursor-pointer hover:shadow-xl hover:-translate-y-2
                       transition-all duration-300"
              onClick={() => router.push(`/dashboard/grade/${grade}`)}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full
                            bg-gradient-to-r from-[#C41E3A] to-[#E63946]
                            flex items-center justify-center shadow-lg shadow-red-500/30">
                  <span className="text-4xl font-bold text-white">{grade}</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {getStudentCountForGrade(grade)}
                </div>
                <div className="text-sm text-gray-500">Students</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-6">
          Click on a grade level to view sections
        </p>
      </div>
    </div>
  );
}
