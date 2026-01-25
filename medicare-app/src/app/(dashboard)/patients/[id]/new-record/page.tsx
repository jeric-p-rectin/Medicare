'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Loader2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Student } from '@/types/student';

const medicalRecordSchema = z.object({
  visitDate: z.string().min(1, 'Visit date is required'),
  chiefComplaint: z.string().min(3, 'Chief complaint is required (minimum 3 characters)'),
  diagnosis: z.string().optional(),
  treatment: z.string().optional(),
  notes: z.string().optional(),
  diseaseCategory: z.string().optional(),
  customDiseaseCategory: z.string().optional(),
  illnessType: z.string().optional(),
  customIllnessType: z.string().optional(),
  severity: z.enum(['MILD', 'MODERATE', 'SEVERE']).optional(),
});

type MedicalRecordFormData = z.infer<typeof medicalRecordSchema>;

export default function NewMedicalRecordPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [patient, setPatient] = useState<Student | null>(null);
  const [diseaseCategories, setDiseaseCategories] = useState<string[]>([]);
  const [illnessTypes, setIllnessTypes] = useState<string[]>([]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [showCustomIllnessType, setShowCustomIllnessType] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<MedicalRecordFormData>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      visitDate: new Date().toISOString().split('T')[0], // Today's date
      severity: 'MILD',
    },
  });

  const selectedDiseaseCategory = watch('diseaseCategory');
  const selectedIllnessType = watch('illnessType');

  // Fetch patient data and disease categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patient info
        const patientResponse = await fetch(`/api/students/${id}`);
        if (patientResponse.ok) {
          const patientData = await patientResponse.json();
          setPatient(patientData);
        } else {
          setError('Failed to load patient data');
        }

        // Fetch disease categories and illness types
        const categoriesResponse = await fetch('/api/disease-categories');
        if (categoriesResponse.ok) {
          const { categories, illnessTypes: types } = await categoriesResponse.json();
          setDiseaseCategories(categories);
          setIllnessTypes(types);
        }
      } catch (err) {
        setError('An error occurred while loading data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Handle disease category selection
  useEffect(() => {
    if (selectedDiseaseCategory === 'CUSTOM') {
      setShowCustomCategory(true);
    } else {
      setShowCustomCategory(false);
      setValue('customDiseaseCategory', '');
    }
  }, [selectedDiseaseCategory, setValue]);

  // Handle illness type selection
  useEffect(() => {
    if (selectedIllnessType === 'CUSTOM') {
      setShowCustomIllnessType(true);
    } else {
      setShowCustomIllnessType(false);
      setValue('customIllnessType', '');
    }
  }, [selectedIllnessType, setValue]);

  const onSubmit = async (data: MedicalRecordFormData) => {
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      // Determine final disease category and illness type
      const finalDiseaseCategory = data.diseaseCategory === 'CUSTOM'
        ? data.customDiseaseCategory
        : data.diseaseCategory;

      const finalIllnessType = data.illnessType === 'CUSTOM'
        ? data.customIllnessType
        : data.illnessType;

      const response = await fetch(`/api/students/${id}/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitDate: data.visitDate,
          chiefComplaint: data.chiefComplaint,
          diagnosis: data.diagnosis || undefined,
          treatment: data.treatment || undefined,
          notes: data.notes || undefined,
          diseaseCategory: finalDiseaseCategory || undefined,
          illnessType: finalIllnessType || undefined,
          severity: data.severity || 'MILD',
        }),
      });

      if (response.ok) {
        setSuccess(true);
        // Auto-redirect after 1.5 seconds
        setTimeout(() => {
          router.push(`/patients/${id}`);
          router.refresh();
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create medical record');
      }
    } catch (err) {
      setError('An error occurred while creating the medical record');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddAnother = () => {
    setSuccess(false);
    reset({
      visitDate: new Date().toISOString().split('T')[0],
      severity: 'MILD',
    });
    setShowCustomCategory(false);
    setShowCustomIllnessType(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-[#C41E3A]" />
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-500">Patient not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 text-gray-600 hover:text-[#C41E3A]"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Patient Details
        </Button>

        {/* Patient Info Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Add Medical Record
          </h1>
          <div className="flex items-center gap-3 text-gray-600">
            <span className="font-semibold">
              {patient.firstName} {patient.middleName} {patient.lastName}
            </span>
            <span>•</span>
            <span>Grade {patient.gradeLevel} - {patient.section}</span>
            <span>•</span>
            <span>LRN: {patient.lrn}</span>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 font-semibold">Medical record created successfully!</p>
                <p className="text-sm text-green-600 mt-1">Redirecting to patient details...</p>
              </div>
              <Button
                onClick={handleAddAnother}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                Add Another Record
              </Button>
            </div>
          </div>
        )}

        <Card className="bg-white rounded-2xl shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Visit Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Visit Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="visitDate" className="block text-sm font-semibold text-gray-700 mb-2">
                      Visit Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="visitDate"
                      type="date"
                      {...register('visitDate')}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                               focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                               transition-all outline-none"
                    />
                    {errors.visitDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.visitDate.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <Label htmlFor="chiefComplaint" className="block text-sm font-semibold text-gray-700 mb-2">
                    Chief Complaint <span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    id="chiefComplaint"
                    {...register('chiefComplaint')}
                    rows={4}
                    placeholder="Enter the primary reason for the visit (e.g., headache, fever, cough)"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                             transition-all outline-none resize-none"
                  />
                  {errors.chiefComplaint && (
                    <p className="text-red-500 text-sm mt-1">{errors.chiefComplaint.message}</p>
                  )}
                </div>
              </div>

              {/* Diagnosis & Treatment */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Diagnosis & Treatment</h2>

                <div className="mb-6">
                  <Label htmlFor="diagnosis" className="block text-sm font-semibold text-gray-700 mb-2">
                    Diagnosis
                  </Label>
                  <textarea
                    id="diagnosis"
                    {...register('diagnosis')}
                    rows={4}
                    placeholder="Enter the medical diagnosis"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                             transition-all outline-none resize-none"
                  />
                </div>

                <div>
                  <Label htmlFor="treatment" className="block text-sm font-semibold text-gray-700 mb-2">
                    Treatment
                  </Label>
                  <textarea
                    id="treatment"
                    {...register('treatment')}
                    rows={4}
                    placeholder="Enter the treatment provided (medications, procedures, etc.)"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                             transition-all outline-none resize-none"
                  />
                </div>
              </div>

              {/* Disease Tracking */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Disease Tracking</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Optional - Used for outbreak detection and statistical analysis
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Disease Category */}
                  <div>
                    <Label htmlFor="diseaseCategory" className="block text-sm font-semibold text-gray-700 mb-2">
                      Disease Category
                    </Label>
                    <select
                      {...register('diseaseCategory')}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                               focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                               transition-all outline-none"
                    >
                      <option value="">Select Category</option>
                      {diseaseCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                      <option value="CUSTOM">✏️ Custom (Add New)</option>
                    </select>

                    {/* Custom Disease Category Input */}
                    {showCustomCategory && (
                      <Input
                        {...register('customDiseaseCategory')}
                        placeholder="Enter custom disease category"
                        className="mt-3 w-full px-4 py-3 bg-white border-2 border-[#C41E3A] rounded-xl
                                 focus:ring-4 focus:ring-red-50 transition-all outline-none"
                      />
                    )}
                  </div>

                  {/* Illness Type */}
                  <div>
                    <Label htmlFor="illnessType" className="block text-sm font-semibold text-gray-700 mb-2">
                      Illness Type
                    </Label>
                    <select
                      {...register('illnessType')}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                               focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                               transition-all outline-none"
                    >
                      <option value="">Select Type</option>
                      {illnessTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                      <option value="CUSTOM">✏️ Custom (Add New)</option>
                    </select>

                    {/* Custom Illness Type Input */}
                    {showCustomIllnessType && (
                      <Input
                        {...register('customIllnessType')}
                        placeholder="Enter custom illness type"
                        className="mt-3 w-full px-4 py-3 bg-white border-2 border-[#C41E3A] rounded-xl
                                 focus:ring-4 focus:ring-red-50 transition-all outline-none"
                      />
                    )}
                  </div>
                </div>

                {/* Severity */}
                <div className="mt-6">
                  <Label className="block text-sm font-semibold text-gray-700 mb-3">
                    Severity
                  </Label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="MILD"
                        {...register('severity')}
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="font-medium text-green-700">Mild</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="MODERATE"
                        {...register('severity')}
                        className="w-4 h-4 text-orange-600"
                      />
                      <span className="font-medium text-orange-700">Moderate</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="SEVERE"
                        {...register('severity')}
                        className="w-4 h-4 text-red-600"
                      />
                      <span className="font-medium text-red-700">Severe</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="pt-6 border-t border-gray-200">
                <Label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes
                </Label>
                <textarea
                  id="notes"
                  {...register('notes')}
                  rows={3}
                  placeholder="Any additional observations or notes"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                           focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                           transition-all outline-none resize-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                  {error}
                </div>
              )}

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="px-8 py-3 border-2 border-gray-200 rounded-xl font-semibold
                           text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || success}
                  className="px-8 py-3 bg-gradient-to-r from-[#C41E3A] to-[#E63946]
                           text-white rounded-xl font-semibold shadow-lg shadow-red-500/30
                           hover:shadow-xl hover:-translate-y-0.5 transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Medical Record'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
