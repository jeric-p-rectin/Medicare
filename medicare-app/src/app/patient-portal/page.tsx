'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Calendar, Phone, MapPin, FileText, User } from 'lucide-react';
import type { Student } from '@/types/student';
import type { MedicalRecord } from '@/types/medical-record';
import { format } from 'date-fns';

interface PatientData extends Student {
  medicalRecords: MedicalRecord[];
}

export default function PatientPortalPage() {
  const { data: session } = useSession();
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchPatientData();
    }
  }, [session?.user?.id]);

  const fetchPatientData = async () => {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('[PATIENT PORTAL PAGE] Fetching data for user:', session!.user!.id);
      }

      // Fetch student record by user ID
      const studentResponse = await fetch(`/api/students/user/${session!.user!.id}`);

      if (process.env.NODE_ENV === 'development') {
        console.log('[PATIENT PORTAL PAGE] Student API response status:', studentResponse.status);
      }

      if (!studentResponse.ok) {
        const errorData = await studentResponse.json().catch(() => ({}));
        console.error('[PATIENT PORTAL PAGE] Failed to fetch student data:', {
          status: studentResponse.status,
          statusText: studentResponse.statusText,
          error: errorData,
          userId: session!.user!.id
        });
        setLoading(false);
        return;
      }

      const student = await studentResponse.json();

      if (process.env.NODE_ENV === 'development') {
        console.log('[PATIENT PORTAL PAGE] Student data loaded:', {
          studentId: student.id,
          studentNumber: student.studentNumber,
          name: `${student.firstName} ${student.lastName}`
        });
      }

      // Fetch medical records for this student
      const recordsResponse = await fetch(`/api/students/${student.id}/records`);
      const records = recordsResponse.ok ? await recordsResponse.json() : [];

      if (process.env.NODE_ENV === 'development') {
        console.log('[PATIENT PORTAL PAGE] Medical records loaded:', records.length, 'records');
      }

      setPatientData({
        ...student,
        medicalRecords: records
      });
    } catch (error) {
      console.error('[PATIENT PORTAL PAGE] Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-[#C41E3A]" />
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          No Student Record Found
        </h2>
        <p className="text-gray-500">
          Please contact the clinic administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Health Information</h1>
        <p className="text-gray-500 mt-2">View your student record and medical history</p>
      </div>

      {/* Student Information Card */}
      <Card className="bg-white rounded-2xl shadow-lg shadow-red-500/5">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <User className="w-6 h-6" />
            Student Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Full Name</div>
              <div className="text-lg font-semibold text-gray-800">
                {patientData.firstName} {patientData.middleName} {patientData.lastName}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Student Number</div>
              <div className="text-lg font-semibold font-mono text-gray-800">
                {patientData.studentNumber}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">LRN</div>
              <div className="text-lg font-semibold font-mono text-gray-800">
                {patientData.lrn}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Grade & Section</div>
              <div className="text-lg font-semibold text-gray-800">
                Grade {patientData.gradeLevel} - {patientData.section}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Date of Birth</div>
              <div className="font-semibold flex items-center gap-2 text-gray-800">
                <Calendar className="h-4 w-4 text-[#C41E3A]" />
                {format(new Date(patientData.dateOfBirth), 'MMMM dd, yyyy')}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Age / Sex</div>
              <div className="font-semibold text-gray-800">
                {patientData.age} years old / {patientData.sex}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Parent/Guardian</div>
              <div className="font-semibold text-gray-800">{patientData.parentGuardianName}</div>
              <div className="text-sm flex items-center gap-2 mt-1 text-gray-600">
                <Phone className="h-4 w-4 text-[#C41E3A]" />
                {patientData.parentGuardianContact}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Address</div>
              <div className="font-semibold flex items-start gap-2 text-gray-800">
                <MapPin className="h-4 w-4 mt-1 text-[#C41E3A] flex-shrink-0" />
                {patientData.address}
              </div>
            </div>

            {patientData.bmi && (
              <div>
                <div className="text-sm text-gray-500 mb-1">BMI</div>
                <div className="font-semibold text-gray-800">{patientData.bmi}</div>
              </div>
            )}
          </div>

          {patientData.healthHistory && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="text-sm text-gray-500 mb-2">Health History</div>
              <div className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                {patientData.healthHistory}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Medical Records Card */}
      <Card className="bg-white rounded-2xl shadow-lg shadow-red-500/5">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Medical Records
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Your clinic visit history and health records
          </p>
        </CardHeader>
        <CardContent>
          {patientData.medicalRecords.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">No medical records found</p>
              <p className="text-sm mt-1">Your medical visit records will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {patientData.medicalRecords
                .sort((a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime())
                .map((record) => (
                  <Card
                    key={record.id}
                    className="border-l-4 border-l-[#C41E3A] bg-[#FFF5F6] hover:shadow-md transition-shadow"
                  >
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="font-semibold text-lg text-gray-800">
                          {record.chiefComplaint}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-2 bg-white px-3 py-1 rounded-full">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(record.visitDate), 'MMM dd, yyyy')}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        {record.diagnosis && (
                          <div className="flex gap-2">
                            <span className="font-semibold text-gray-700 min-w-[100px]">Diagnosis:</span>
                            <span className="text-gray-800">{record.diagnosis}</span>
                          </div>
                        )}
                        {record.treatment && (
                          <div className="flex gap-2">
                            <span className="font-semibold text-gray-700 min-w-[100px]">Treatment:</span>
                            <span className="text-gray-800">{record.treatment}</span>
                          </div>
                        )}
                        {record.diseaseCategory && (
                          <div className="flex gap-2">
                            <span className="font-semibold text-gray-700 min-w-[100px]">Category:</span>
                            <span className="text-gray-800">{record.diseaseCategory}</span>
                          </div>
                        )}
                        {record.notes && (
                          <div className="flex gap-2">
                            <span className="font-semibold text-gray-700 min-w-[100px]">Notes:</span>
                            <span className="text-gray-800">{record.notes}</span>
                          </div>
                        )}
                        {record.recordedByName && (
                          <div className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
                            Recorded by: {record.recordedByName} on {format(new Date(record.createdAt), 'MMM dd, yyyy')}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
