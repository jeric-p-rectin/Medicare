'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { GradeLevelStats } from '@/types/statistics';

export default function GradeLevelView() {
  const router = useRouter();
  const params = useParams();
  const grade = params.grade as string;

  const [stats, setStats] = useState<GradeLevelStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (grade) {
      fetchGradeStats();
    }
  }, [grade]);

  const fetchGradeStats = async () => {
    try {
      const response = await fetch(`/api/dashboard/grade/${grade}`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching grade stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading grade data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.push('/dashboard')}
        className="mb-8 text-gray-600 hover:text-[#C41E3A]"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </Button>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Grade {grade} - Level Wide
      </h2>

      {/* Total Students Card */}
      <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-8 mb-8">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Total Registered Students</p>
          <div className="text-6xl font-bold bg-gradient-to-r from-[#C41E3A] to-[#E63946] bg-clip-text text-transparent">
            {stats?.totalStudents || 0}
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Sections</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stats?.sections.map((section) => (
            <div
              key={section.sectionName}
              className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6
                       cursor-pointer hover:shadow-xl transition-all"
              onClick={() => router.push(`/patients?grade=${grade}&section=${section.sectionName}`)}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFF5F6]
                            flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#C41E3A]">
                    {section.sectionName}
                  </span>
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-1">
                  {section.studentCount}
                </div>
                <div className="text-sm text-gray-500">
                  Registered Patients
                </div>
              </div>
            </div>
          ))}
        </div>
        {(!stats?.sections || stats.sections.length === 0) && (
          <div className="text-center py-12 text-gray-500">
            <p>No sections found for Grade {grade}</p>
          </div>
        )}
      </div>
    </div>
  );
}
