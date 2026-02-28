'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CredentialCard } from '@/components/registration/credential-card';
import { SectionCombobox } from '@/components/registration/section-combobox';

const registrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  sex: z.enum(['MALE', 'FEMALE']),
  gradeLevel: z.enum(['7', '8', '9', '10', '11', '12', 'Non-Graded']),
  section: z.string().min(1, 'Section is required'),
  lrn: z.string().length(12, 'LRN must be 12 digits'),
  parentGuardianName: z.string().min(1, 'Guardian name is required'),
  parentGuardianContact: z.string().min(1, 'Contact number is required'),
  address: z.string().min(1, 'Address is required'),
  bmi: z.string().optional(),
  healthHistory: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function RegistrationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
    studentNumber: string;
    studentName: string;
    gradeLevel: string;
    section: string;
    schoolYear?: string;
    email?: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const dateOfBirth = watch('dateOfBirth');
  const gradeLevel = watch('gradeLevel');

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

  // Clear section when grade level changes
  useEffect(() => {
    if (gradeLevel) {
      setValue('section', '');
    }
  }, [gradeLevel, setValue]);

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      // Generate username and student number
      const username = `${data.lastName.toLowerCase()}${data.firstName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;
      const studentNumber = `STU${Date.now()}`;
      const password = `student${Math.floor(Math.random() * 10000)}`; // Generate temp password

      // Build school year string
      const schoolYear = startYear && endYear ? `${startYear}-${endYear}` : undefined;

      // Store credentials for display after successful registration
      const tempCredentials = {
        username,
        password,
        studentNumber,
        studentName: `${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`,
        gradeLevel: data.gradeLevel,
        section: data.section,
        schoolYear,
        email: data.email || undefined,
      };

      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          username,
          studentNumber,
          password,
          age,
          schoolYear,
          bmi: data.bmi ? parseFloat(data.bmi) : undefined,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Check if ADMIN (pending approval) or SUPER_ADMIN (direct creation)
        if (result.status === 'pending_approval') {
          // ADMIN: Registration pending approval
          setError(''); // Clear any errors
          alert(result.message || 'Registration request submitted for SUPER_ADMIN approval. You will be notified when it is approved.');
          reset(); // Reset form
        } else {
          // SUPER_ADMIN: Display credentials
          setCredentials(tempCredentials);
          setRegistrationSuccess(true);
        }
      } else {
        if (result.duplicates) {
          interface DuplicateResult { name: string }
          setError(`Potential duplicate detected. Similar students found: ${(result.duplicates as DuplicateResult[]).map((d) => d.name).join(', ')}`);
        } else {
          setError(result.error || 'Failed to register student');
        }
      }
    } catch (err) {
      setError('An error occurred while registering the student');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterAnother = () => {
    setRegistrationSuccess(false);
    setCredentials(null);
    setError('');
    setStartYear('');
    setEndYear('');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Registration - New Student
        </h1>

        {registrationSuccess && credentials ? (
          <CredentialCard
            username={credentials.username}
            password={credentials.password}
            studentNumber={credentials.studentNumber}
            studentName={credentials.studentName}
            gradeLevel={credentials.gradeLevel}
            section={credentials.section}
            schoolYear={credentials.schoolYear}
            email={credentials.email}
            onRegisterAnother={handleRegisterAnother}
          />
        ) : (
          <Card className="bg-white rounded-2xl shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
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

                {/* Email Field */}
                <div className="mt-6">
                  <Label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="student@example.com"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                             transition-all outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional - for notifications and account recovery</p>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Academic Information */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Academic Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="gradeLevel" className="block text-sm font-semibold text-gray-700 mb-2">
                      Grade Level <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="gradeLevel"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setValue('section', ''); // Clear section when grade changes
                          }}
                        >
                          <SelectTrigger className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none">
                            <SelectValue placeholder="Select Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Non-Graded">SNED (Non-Graded)</SelectItem>
                            <SelectItem value="7">Grade 7</SelectItem>
                            <SelectItem value="8">Grade 8</SelectItem>
                            <SelectItem value="9">Grade 9</SelectItem>
                            <SelectItem value="10">Grade 10</SelectItem>
                            <SelectItem value="11">Grade 11</SelectItem>
                            <SelectItem value="12">Grade 12</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.gradeLevel && (
                      <p className="text-red-500 text-sm mt-1">{errors.gradeLevel.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="section" className="block text-sm font-semibold text-gray-700 mb-2">
                      Section <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="section"
                      control={control}
                      render={({ field }) => (
                        <SectionCombobox
                          gradeLevel={gradeLevel}
                          value={field.value || ''}
                          onValueChange={field.onChange}
                          disabled={!gradeLevel}
                        />
                      )}
                    />
                    {errors.section && (
                      <p className="text-red-500 text-sm mt-1">{errors.section.message}</p>
                    )}
                  </div>
                </div>

                {/* LRN */}
                <div className="mt-6">
                  <Label htmlFor="lrn" className="block text-sm font-semibold text-gray-700 mb-2">
                    LRN (Learner Reference Number) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lrn"
                    {...register('lrn')}
                    maxLength={12}
                    placeholder="123456789012"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                             transition-all outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">12-digit unique identifier</p>
                  {errors.lrn && (
                    <p className="text-red-500 text-sm mt-1">{errors.lrn.message}</p>
                  )}
                </div>

                {/* School Year */}
                <div className="mt-6">
                  <Label className="block text-sm font-semibold text-gray-700 mb-2">
                    School Year
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      value={startYear}
                      onChange={(e) => {
                        const val = e.target.value;
                        setStartYear(val);
                        if (val.length === 4) {
                          setEndYear(String(parseInt(val) + 1));
                        } else {
                          setEndYear('');
                        }
                      }}
                      placeholder="2025"
                      maxLength={4}
                      className="w-28 px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
                               focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50
                               transition-all outline-none"
                    />
                    <span className="text-gray-500 font-semibold text-lg">-</span>
                    <Input
                      type="number"
                      value={endYear}
                      readOnly
                      placeholder="2026"
                      className="w-28 px-4 py-3 bg-gray-100 border-2 border-gray-100 rounded-xl
                               outline-none cursor-not-allowed text-gray-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Optional — end year is auto-filled</p>
                </div>
              </div>

              {/* Guardian Information */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Parents or Guardian Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  {isSubmitting ? 'Registering...' : 'Register Student'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  );
}
