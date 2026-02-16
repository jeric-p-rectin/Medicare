'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userCreateSchema, UserCreateInput } from '@/lib/validations/account';
import { isErrorWithMessage } from '@/types/api-response';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2, Copy, Check } from 'lucide-react';

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateUserDialog({ open, onOpenChange, onSuccess }: CreateUserDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{
    username: string;
    password: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UserCreateInput>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      middleName: '',
      role: 'PATIENT',
      password: '',
    },
  });

  // Generate random password when dialog opens
  useEffect(() => {
    if (open) {
      const randomPassword = generateSecurePassword();
      setValue('password', randomPassword);
      setCreatedCredentials(null);
    }
  }, [open, setValue]);

  const generateSecurePassword = () => {
    const length = 12;
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const all = uppercase + lowercase + numbers;

    let password = '';
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];

    for (let i = 3; i < length; i++) {
      password += all[Math.floor(Math.random() * all.length)];
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
  };

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
      toast.success(`${field} copied to clipboard`);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const onSubmit = async (data: UserCreateInput) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create user');
      }

      toast.success('User created successfully');

      // Show credentials
      setCreatedCredentials({
        username: data.username,
        password: result.temporaryPassword,
      });

      onSuccess();
    } catch (error: unknown) {
      const message = isErrorWithMessage(error) ? error.message : 'Failed to create user';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setCreatedCredentials(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {createdCredentials ? 'User Created Successfully' : 'Create New User'}
          </DialogTitle>
          <DialogDescription>
            {createdCredentials
              ? 'Save these credentials - the password will not be shown again'
              : 'Fill in the details to create a new user account'}
          </DialogDescription>
        </DialogHeader>

        {createdCredentials ? (
          /* Show Credentials */
          <div className="space-y-4 py-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-yellow-800 mb-2">
                ⚠️ Important: Save these credentials
              </p>
              <p className="text-sm text-yellow-700">
                The password will not be shown again. Make sure to save it securely and share it with the new user.
              </p>
            </div>

            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="flex gap-2">
                  <Input
                    value={createdCredentials.username}
                    readOnly
                    className="font-mono bg-gray-50"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleCopy(createdCredentials.username, 'Username')}
                  >
                    {copiedField === 'Username' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Temporary Password
                </label>
                <div className="flex gap-2">
                  <Input
                    value={createdCredentials.password}
                    readOnly
                    className="font-mono bg-gray-50"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleCopy(createdCredentials.password, 'Password')}
                  >
                    {copiedField === 'Password' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="px-8 py-3 bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl transition-all disabled:opacity-50">
              <Button onClick={handleClose}>Done</Button>
            </div>
          </div>
        ) : (
          /* Create User Form */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input {...register('firstName')} disabled={isSubmitting} />
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input {...register('lastName')} disabled={isSubmitting} />
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Middle Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Middle Name
              </label>
              <Input {...register('middleName')} disabled={isSubmitting} />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <Input {...register('username')} disabled={isSubmitting} />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <Input type="email" {...register('email')} disabled={isSubmitting} />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                {...register('role')}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:ring-4 focus:ring-red-50 transition-all outline-none"
              >
                <option value="PATIENT">Patient</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN" className="font-semibold text-red-600">
                  ⚠️ Super Admin (Full System Access)
                </option>
              </select>
              {errors.role && (
                <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create User'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
