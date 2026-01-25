'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordChangeSchema, PasswordChangeInput } from '@/lib/validations/account';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface PasswordFormProps {
  userId: string;
}

export function PasswordForm({ userId }: PasswordFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordChangeInput>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordChangeInput) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/users/${userId}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to change password');
      }

      toast.success('Password changed successfully');
      reset(); // Clear the form
    } catch (error: any) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Change Password</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Current Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type={showCurrentPassword ? 'text' : 'password'}
              {...register('currentPassword')}
              disabled={isSubmitting}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showCurrentPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type={showNewPassword ? 'text' : 'password'}
              {...register('newPassword')}
              disabled={isSubmitting}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.newPassword.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 8 characters and include uppercase, lowercase, and a
            number
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              disabled={isSubmitting}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Changing Password...
              </>
            ) : (
              'Change Password'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
