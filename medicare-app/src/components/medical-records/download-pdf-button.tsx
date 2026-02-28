'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { MedicalRecord, MedicalRecordWithStudent } from '@/types/medical-record';
import type { Student } from '@/types/student';

type DownloadPdfButtonProps =
  | {
      variant: 'single';
      record: MedicalRecord | MedicalRecordWithStudent;
      patient?: Student;
      size?: 'sm' | 'default';
    }
  | {
      variant: 'patient-report';
      patient: Student;
      records: MedicalRecord[];
      size?: 'sm' | 'default';
    }
  | {
      variant: 'bulk';
      records: MedicalRecordWithStudent[];
      size?: 'sm' | 'default';
    };

export function DownloadPdfButton(props: DownloadPdfButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const pdf = await import('@/lib/pdf/generate-medical-report');

      switch (props.variant) {
        case 'single':
          pdf.downloadSingleRecordPdf(props.record, props.patient);
          break;
        case 'patient-report':
          pdf.downloadPatientReportPdf(props.patient, props.records);
          break;
        case 'bulk':
          pdf.downloadBulkRecordsPdf(props.records);
          break;
      }

      toast.success('PDF downloaded successfully');
    } catch {
      toast.error('Failed to generate PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  const size = props.size ?? 'default';

  if (size === 'sm') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDownload}
        disabled={isDownloading}
        className="text-gray-500 hover:text-[#C41E3A] hover:bg-red-50"
        title="Download PDF"
      >
        <Download className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={handleDownload}
      disabled={isDownloading || (props.variant === 'patient-report' && props.records.length === 0)}
      className="border-[#C41E3A] text-[#C41E3A] hover:bg-red-50 rounded-lg font-semibold"
    >
      <Download className="mr-2 h-4 w-4" />
      {isDownloading
        ? 'Generating...'
        : props.variant === 'bulk'
          ? `Download Selected (${props.records.length})`
          : props.variant === 'patient-report'
            ? 'Download Report'
            : 'Download PDF'}
    </Button>
  );
}
