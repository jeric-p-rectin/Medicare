'use client';

import { useState } from 'react';
import { Copy, CheckCircle, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CredentialCardProps {
  username: string;
  password: string;
  studentNumber: string;
  studentName: string;
  gradeLevel: string;
  section: string;
  email?: string;
  onRegisterAnother: () => void;
}

export function CredentialCard({
  username,
  password,
  studentNumber,
  studentName,
  gradeLevel,
  section,
  email,
  onRegisterAnother,
}: CredentialCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <Card className="credential-card w-full max-w-2xl bg-white rounded-2xl shadow-2xl my-8">
        <CardHeader className="text-center border-b border-gray-200 bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-t-2xl">
          <CardTitle className="text-2xl font-bold mb-2">
            MEDICARE Student Login
          </CardTitle>
          <p className="text-sm opacity-90">
            Medical Data & Information Community Alert Response Engine
          </p>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          {/* Student Information */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{studentName}</h3>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div>
                <span className="font-semibold">Student Number:</span> {studentNumber}
              </div>
              <div>
                <span className="font-semibold">Grade:</span> {gradeLevel} - {section}
              </div>
            </div>
          </div>

          {/* Credentials Box */}
          <div className="bg-[#FFF5F6] border-2 border-[#C41E3A] rounded-xl p-6">
            <h4 className="text-center font-bold text-gray-800 mb-4 text-lg">
              LOGIN CREDENTIALS
            </h4>

            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Username
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-white border-2 border-gray-200 rounded-lg px-4 py-3 font-mono text-lg font-semibold text-gray-800">
                    {username}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="no-print px-4"
                    onClick={() => copyToClipboard(username, 'username')}
                  >
                    {copiedField === 'username' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Temporary Password
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-white border-2 border-gray-200 rounded-lg px-4 py-3 font-mono text-lg font-semibold text-gray-800">
                    {password}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="no-print px-4"
                    onClick={() => copyToClipboard(password, 'password')}
                  >
                    {copiedField === 'password' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Email (if provided) */}
              {email && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Email Address
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white border-2 border-gray-200 rounded-lg px-4 py-3 font-mono text-lg font-semibold text-gray-800">
                      {email}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="no-print px-4"
                      onClick={() => copyToClipboard(email, 'email')}
                    >
                      {copiedField === 'email' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Security Warning */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <h5 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
              ⚠️ IMPORTANT INSTRUCTIONS
            </h5>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Keep these credentials secure and confidential</li>
              <li>• Change your password immediately after first login</li>
              <li>• Do not share your login information with others</li>
              <li>• Contact the administrator if you lose or forget your password</li>
            </ul>
          </div>

          {/* Login Information */}
          <div className="text-center text-sm text-gray-600">
            <p>
              <span className="font-semibold">Login URL:</span>{' '}
              <span className="text-[#C41E3A]">{window.location.origin}/login</span>
            </p>
            <p className="mt-2">
              <span className="font-semibold">Date Issued:</span> {currentDate}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 no-print">
            <Button
              onClick={handlePrint}
              className="flex-1 bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Credentials
            </Button>
            <Button
              onClick={onRegisterAnother}
              variant="outline"
              className="flex-1 border-2 border-[#C41E3A] text-[#C41E3A] hover:bg-[#FFF5F6] rounded-xl"
            >
              Register Another Student
            </Button>
          </div>

          {/* Print Only - Confidential Mark */}
          <div className="hidden print-only text-center text-sm text-gray-500">
            <Badge variant="outline" className="border-red-500 text-red-600">
              CONFIDENTIAL
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
