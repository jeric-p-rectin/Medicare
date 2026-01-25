'use client';

import { Student } from '@/types/student';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PatientInfoSectionProps {
  student: Student | null;
  isLoading: boolean;
}

export function PatientInfoSection({ student, isLoading }: PatientInfoSectionProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6 animate-pulse">
        <div className="h-48 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6">
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Student Record Pending
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Your student record is not yet available in the system. Please contact the clinic administrator for assistance.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Medical Records</h3>

      {/* Student Information Card */}
      <div className="bg-gradient-to-r from-[#FFF5F6] to-white border border-red-100 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">Student Number</div>
            <div className="text-gray-800 font-semibold font-mono text-lg">
              {student.studentNumber}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-1">LRN</div>
            <div className="text-gray-800 font-semibold font-mono text-lg">
              {student.lrn}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-1">Grade & Section</div>
            <div className="text-gray-800 font-semibold text-lg">
              Grade {student.gradeLevel} - {student.section}
            </div>
          </div>

          {student.age && (
            <div>
              <div className="text-sm text-gray-500 mb-1">Age</div>
              <div className="text-gray-800 font-semibold text-lg">
                {student.age} years old
              </div>
            </div>
          )}
        </div>

        {student.healthHistory && (
          <div className="mt-4 pt-4 border-t border-red-100">
            <div className="text-sm text-gray-500 mb-2">Health History</div>
            <div className="text-gray-700 text-sm whitespace-pre-line">
              {student.healthHistory}
            </div>
          </div>
        )}
      </div>

      {/* View Medical Records Button */}
      <div className="text-center">
        <Button
          onClick={() => router.push(`/patients/${student.id}`)}
          className="px-8 py-4 bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <FileText className="w-5 h-5 mr-2" />
          View My Medical Records
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-sm text-gray-500 mt-4">
          Access your complete medical history, visit records, and health information
        </p>
      </div>
    </div>
  );
}
