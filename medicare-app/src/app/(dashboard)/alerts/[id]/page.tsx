'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, BarChart3, Users, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertIcon } from '@/components/alerts/alert-icon';
import type { Alert } from '@/types/alert';
import { cn } from '@/lib/utils';

export default function AlertDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [alert, setAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAlertDetails();
    }
  }, [id]);

  const fetchAlertDetails = async () => {
    try {
      // Fetch all alerts and find the one we need
      const response = await fetch('/api/alerts');
      if (response.ok) {
        const alerts: Alert[] = await response.json();
        const foundAlert = alerts.find((a) => a.id === id);
        setAlert(foundAlert || null);

        // Mark as read if unread
        if (foundAlert && !foundAlert.isRead) {
          await fetch(`/api/alerts/${id}/read`, { method: 'PUT' });
        }
      }
    } catch (error) {
      console.error('Error fetching alert details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = async () => {
    try {
      const response = await fetch(`/api/alerts/${id}`, { method: 'DELETE' });
      if (response.ok) {
        router.push('/alerts');
      }
    } catch (error) {
      console.error('Error dismissing alert:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-500';
      case 'HIGH':
        return 'bg-orange-500';
      case 'MEDIUM':
        return 'bg-yellow-500';
      case 'LOW':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#C41E3A] border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading alert details...</p>
        </div>
      </div>
    );
  }

  if (!alert) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <XCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Alert Not Found</h2>
            <p className="text-gray-500 mb-6">The alert you&apos;re looking for doesn&apos;t exist.</p>
            <Button onClick={() => router.push('/alerts')}>Back to Alerts</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 text-gray-600 hover:text-[#C41E3A]"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Alerts
      </Button>

      {/* Alert Detail Card */}
      <Card className="bg-white rounded-2xl shadow-lg mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <AlertIcon type={alert.alertType} severity={alert.severity} className="flex-shrink-0" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                  {alert.title}
                </CardTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={cn('text-white', getSeverityColor(alert.severity))}>
                    {alert.severity}
                  </Badge>
                  <Badge variant="outline">
                    {alert.alertType.replace('_', ' ')}
                  </Badge>
                  {alert.isRead ? (
                    <Badge variant="outline" className="border-green-500 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Read
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-[#C41E3A] text-[#C41E3A]">
                      Unread
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Created</p>
              <p className="text-sm font-medium text-gray-700">
                {new Date(alert.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Message */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Message</h3>
              <p className="text-gray-600 whitespace-pre-line">{alert.message}</p>
            </div>

            {/* Related Information */}
            {alert.relatedDisease && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Related Disease</h3>
                <p className="text-gray-600">{alert.relatedDisease}</p>
              </div>
            )}

            {alert.relatedStudentId && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Related Student</h3>
                <p className="text-gray-600 font-mono">{alert.relatedStudentId}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {alert.alertType === 'OUTBREAK_SUSPECTED' && (
          <Button
            onClick={() => router.push('/statistics')}
            className="bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Disease Statistics
          </Button>
        )}

        {alert.alertType === 'DUPLICATE_DETECTED' && alert.relatedStudentId && (
          <Button
            onClick={() => router.push(`/patients/${alert.relatedStudentId}`)}
            className="bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Users className="w-4 h-4 mr-2" />
            View Student
          </Button>
        )}

        <Button
          variant="outline"
          onClick={handleDismiss}
          className="border-2 border-gray-200 hover:border-red-500 hover:text-red-600"
        >
          Dismiss Alert
        </Button>
      </div>
    </div>
  );
}
