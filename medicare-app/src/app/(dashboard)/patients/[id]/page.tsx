'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Edit, Calendar, Phone, MapPin, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DeleteRecordDialog } from '@/components/medical-records/delete-record-dialog';
import type { Student } from '@/types/student';
import type { MedicalRecord } from '@/types/medical-record';

interface PatientWithRecords extends Student {
  medicalRecords: MedicalRecord[];
}

export default function IndividualPatientPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [patient, setPatient] = useState<PatientWithRecords | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPatientDetails();
    }
  }, [id]);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(`/api/students/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPatient(data);
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading patient details...</div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Patient not found</div>
      </div>
    );
  }

  const initials = `${patient.firstName[0]}${patient.lastName[0]}`;

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-8 text-gray-600 hover:text-[#C41E3A]"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Patient List
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column - Patient Info */}
        <div className="lg:col-span-1">
          <Card className="bg-white rounded-2xl shadow-lg">
            <CardContent className="pt-6">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#C41E3A] to-[#E63946]
                              flex items-center justify-center shadow-lg text-white text-5xl font-bold">
                  {initials}
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="font-semibold text-lg text-gray-800">
                    {patient.firstName} {patient.middleName} {patient.lastName}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Age</div>
                    <div className="font-semibold">{patient.age}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Sex</div>
                    <div className="font-semibold">{patient.sex}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Birthday</div>
                  <div className="font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(patient.dateOfBirth).toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">LRN</div>
                  <div className="font-semibold font-mono">{patient.lrn}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Grade Level and Section</div>
                  <div className="font-semibold">
                    Grade {patient.gradeLevel} - {patient.section}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Parents or Guardian Contact</div>
                  <div className="font-semibold">{patient.parentGuardianName}</div>
                  <div className="text-sm flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4" />
                    {patient.parentGuardianContact}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-semibold flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1" />
                    {patient.address}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">BMI</div>
                  <div className="font-semibold">{patient.bmi || 'Not recorded'}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Health History</div>
                  <div className="text-sm whitespace-pre-line">
                    {patient.healthHistory || 'No health history recorded'}
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <Button
                className="w-full mt-6 bg-gradient-to-r from-[#C41E3A] to-[#E63946]
                         text-white rounded-xl font-semibold shadow-lg shadow-red-500/30
                         hover:shadow-xl hover:-translate-y-0.5 transition-all"
                onClick={() => router.push(`/patients/${id}/edit`)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Patient Info
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Medical Records */}
        <div className="lg:col-span-2">
          <Card className="bg-white rounded-2xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Medical Records
              </CardTitle>
              <Button
                className="bg-gradient-to-r from-[#C41E3A] to-[#E63946]
                         text-white rounded-lg font-semibold shadow-lg shadow-red-500/30
                         hover:shadow-xl transition-all"
                onClick={() => router.push(`/patients/${id}/new-record`)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Record
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.medicalRecords.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No medical records yet</p>
                  </div>
                ) : (
                  patient.medicalRecords.map((record) => (
                    <Card
                      key={record.id}
                      className="border-l-4 border-l-[#C41E3A] bg-[#FFF5F6]"
                    >
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold text-lg text-gray-800">
                            {record.chiefComplaint}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-500">
                              {new Date(record.visitDate).toLocaleDateString()}
                            </div>
                            <DeleteRecordDialog
                              record={record}
                              studentId={id}
                              onDelete={fetchPatientDetails}
                            />
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          {record.diagnosis && (
                            <div>
                              <span className="font-semibold">Diagnosis: </span>
                              {record.diagnosis}
                            </div>
                          )}
                          {record.treatment && (
                            <div>
                              <span className="font-semibold">Treatment: </span>
                              {record.treatment}
                            </div>
                          )}
                          {record.diseaseCategory && (
                            <div>
                              <span className="font-semibold">Category: </span>
                              {record.diseaseCategory}
                            </div>
                          )}
                          {record.recordedByName && (
                            <div className="text-xs text-gray-500 mt-2">
                              Recorded by: {record.recordedByName}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
