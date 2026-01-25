import { Metadata } from 'next';
import Image from 'next/image';
import { LoginForm } from '@/components/forms/login-form';

export const metadata: Metadata = {
  title: 'Login | MED-Alert',
  description: 'Login to MED-Alert Medical Electronic Database with Alert System',
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Logo and Branding */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-4"
          style={{ boxShadow: '0 8px 32px rgba(196, 30, 58, 0.15)' }}
        >
          <Image
            src="/logo.png"
            alt="MED-Alert"
            width={48}
            height={48}
            className="w-12 h-12"
          />
        </div>
        <h1
          className="text-3xl font-bold"
          style={{ color: '#C41E3A' }}
        >
          MED-Alert
        </h1>
        <p className="text-gray-600 mt-2">
          Medical Electronic Database with Alert System
        </p>
        <p className="text-sm mt-1" style={{ color: '#90A4AE' }}>
          Bajet-Castillo High School Clinic
        </p>
      </div>

      {/* Login Form */}
      <LoginForm />

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-8">
        Healthcare Management System
      </p>
    </div>
  );
}
