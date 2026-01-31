'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Student } from '@/types/student';

const editStudentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  sex: z.enum(['MALE', 'FEMALE'], { message: 'Sex is required' }),
  gradeLevel: z.enum(['7', '8', '9', '10', '11', '12', 'Non-Graded'], { message: 'Grade level is required' }),
  section: z.string().min(1, 'Section is required'),
  address: z.string().min(1, 'Address is required'),
  parentGuardianName: z.string().min(1, 'Guardian name is required'),
  parentGuardianContact: z.string().min(1, 'Contact number is required'),
  bmi: z.string().optional(),
  healthHistory: z.string().optional(),
});

type EditStudentFormData = z.infer<typeof editStudentSchema>;

export default function EditPatientPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [patient, setPatient] = useState<Student | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EditStudentFormData>({
    resolver: zodResolver(editStudentSchema),
  });

  const dateOfBirth = watch('dateOfBirth');

  // Calculate age from date of birth
  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = dateOfBirth ? calculateAge(dateOfBirth) : 0;

  // Fetch patient data
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`/api/students/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPatient(data);

          // Pre-populate form
          setValue('firstName', data.firstName);
          setValue('middleName', data.middleName || '');
          setValue('lastName', data.lastName);
          setValue('dateOfBirth', data.dateOfBirth.split('T')[0]); // Format for date input
          setValue('sex', data.sex);
          setValue('gradeLevel', data.gradeLevel);
          setValue('section', data.section);
          setValue('address', data.address);
          setValue('parentGuardianName', data.parentGuardianName);
          setValue('parentGuardianContact', data.parentGuardianContact);
          setValue('bmi', data.bmi ? String(data.bmi) : '');
          setValue('healthHistory', data.healthHistory || '');
        } else {
          setError('Failed to load patient data');
        }
      } catch (err) {
        setError('An error occurred while loading patient data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPatient();
    }
  }, [id, setValue]);

  const onSubmit = async (data: EditStudentFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          age: calculateAge(data.dateOfBirth),
          bmi: data.bmi ? parseFloat(data.bmi) : undefined,
        }),
      });

      if (response.ok) {
        router.push(`/patients/${id}`);
        router.refresh();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update patient');
      }
    } catch (err) {
      setError('An error occurred while updating the patient');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
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

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Edit Patient Information
        </h1>

        <Card className="bg-white rounded-2xl shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      {...register('firstName')}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                               focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                               transition-all outline-none"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="middleName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Middle Name
                    </Label>
                    <Input
                      id="middleName"
                      {...register('middleName')}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                               focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                               transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                             transition-all outline-none"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <Label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      {...register('dateOfBirth')}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                               focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                               transition-all outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Age: {age} years old (auto-calculated)</p>
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sex <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-6 mt-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="MALE"
                          {...register('sex')}
                          className="w-4 h-4"
                        />
                        <span className="font-medium text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="FEMALE"
                          {...register('sex')}
                          className="w-4 h-4"
                        />
                        <span className="font-medium text-gray-700">Female</span>
                      </label>
                    </div>
                    {errors.sex && (
                      <p className="text-red-500 text-sm mt-1">{errors.sex.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Academic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="gradeLevel" className="block text-sm font-semibold text-gray-700 mb-2">
                      Grade Level <span className="text-red-500">*</span>
                    </Label>
                    <select
                      {...register('gradeLevel')}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                               focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                               transition-all outline-none"
                    >
                      <option value="">Select Grade</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                    {errors.gradeLevel && (
                      <p className="text-red-500 text-sm mt-1">{errors.gradeLevel.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="section" className="block text-sm font-semibold text-gray-700 mb-2">
                      Section <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="section"
                      {...register('section')}
                      placeholder="e.g., A, B, C, D"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                               focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                               transition-all outline-none"
                    />
                    {errors.section && (
                      <p className="text-red-500 text-sm mt-1">{errors.section.message}</p>
                    )}
                  </div>
                </div>

                {/* Display immutable fields */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">LRN:</span> {patient.lrn}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Student Number:</span> {patient.studentNumber}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 italic">
                    LRN and Student Number cannot be edited
                  </p>
                </div>
              </div>

              {/* Guardian Information */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Parents or Guardian Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="parentGuardianName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="parentGuardianName"
                      {...register('parentGuardianName')}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                               focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                               transition-all outline-none"
                    />
                    {errors.parentGuardianName && (
                      <p className="text-red-500 text-sm mt-1">{errors.parentGuardianName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="parentGuardianContact" className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="parentGuardianContact"
                      {...register('parentGuardianContact')}
                      placeholder="09123456789"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                               focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                               transition-all outline-none"
                    />
                    {errors.parentGuardianContact && (
                      <p className="text-red-500 text-sm mt-1">{errors.parentGuardianContact.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="pt-6 border-t border-gray-200">
                <div className="mb-6">
                  <Label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    {...register('address')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                             transition-all outline-none"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div className="mb-6">
                  <Label htmlFor="bmi" className="block text-sm font-semibold text-gray-700 mb-2">
                    BMI
                  </Label>
                  <Input
                    id="bmi"
                    type="number"
                    step="0.1"
                    {...register('bmi')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                             transition-all outline-none"
                  />
                </div>

                <div>
                  <Label htmlFor="healthHistory" className="block text-sm font-semibold text-gray-700 mb-2">
                    Health History
                  </Label>
                  <textarea
                    id="healthHistory"
                    {...register('healthHistory')}
                    rows={4}
                    placeholder="Enter any relevant health history, allergies, medications, etc."
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                             transition-all outline-none resize-none"
                  />
                </div>
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
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-[#C41E3A] to-[#E63946]
                           text-white rounded-xl font-semibold shadow-lg shadow-red-500/30
                           hover:shadow-xl hover:-translate-y-0.5 transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Patient'
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
