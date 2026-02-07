'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileUpdateSchema, ProfileUpdateInput } from '@/lib/validations/account';
import { User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { isErrorWithMessage } from '@/types/api-response';
import { Loader2 } from 'lucide-react';

interface ProfileFormProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

export function ProfileForm({ user, onUpdate }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPatient = user.role === 'PATIENT';

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      middleName: user.middle_name || '',
      email: user.email || '',
    },
  });

  const onSubmit = async (data: ProfileUpdateInput) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update profile');
      }

      toast.success('Profile updated successfully');
      onUpdate(result.user);
    } catch (error: unknown) {
      const message = isErrorWithMessage(error) ? error.message : 'Failed to update profile';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Profile Information</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('firstName')}
              disabled={isPatient || isSubmitting}
              className={`${
                isPatient ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
            )}
            {isPatient && (
              <p className="text-xs text-gray-500 mt-1">
                This field can only be updated by an administrator
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('lastName')}
              disabled={isPatient || isSubmitting}
              className={`${
                isPatient ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
            )}
            {isPatient && (
              <p className="text-xs text-gray-500 mt-1">
                This field can only be updated by an administrator
              </p>
            )}
          </div>
        </div>

        {/* Middle Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Middle Name
          </label>
          <Input
            {...register('middleName')}
            disabled={isPatient || isSubmitting}
            className={`${
              isPatient ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          />
          {errors.middleName && (
            <p className="text-sm text-red-500 mt-1">{errors.middleName.message}</p>
          )}
          {isPatient && (
            <p className="text-xs text-gray-500 mt-1">
              This field can only be updated by an administrator
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <Input
            type="email"
            {...register('email')}
            disabled={isSubmitting}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
          <Button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
