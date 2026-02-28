'use client';

import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteRecordDialog } from './delete-record-dialog';
import { DownloadPdfButton } from './download-pdf-button';
import type { MedicalRecordWithStudent } from '@/types/medical-record';
import { Loader2 } from 'lucide-react';

const severityClass: Record<string, string> = {
  MILD: 'bg-green-100 text-green-700 border-green-200',
  MODERATE: 'bg-orange-100 text-orange-700 border-orange-200',
  SEVERE: 'bg-red-100 text-[#C41E3A] border-red-200',
};

interface MedicalRecordsTableProps {
  records: MedicalRecordWithStudent[] | undefined;
  loading: boolean;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
  allSelected: boolean;
  someSelected: boolean;
  onEdit: (record: MedicalRecordWithStudent) => void;
  onRefresh: () => void;
}

export function MedicalRecordsTable({
  records,
  loading,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  allSelected,
  someSelected,
  onEdit,
  onRefresh,
}: MedicalRecordsTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#C41E3A]" />
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-lg font-medium">No medical records found</p>
        <p className="text-sm mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-12 px-4">
              <Checkbox
                checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                onCheckedChange={(checked) => onSelectAll(checked === true)}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Student</TableHead>
            <TableHead className="hidden sm:table-cell">Grade & Section</TableHead>
            <TableHead>Visit Date</TableHead>
            <TableHead>Chief Complaint</TableHead>
            <TableHead className="hidden md:table-cell">Disease</TableHead>
            <TableHead className="hidden md:table-cell">Severity</TableHead>
            <TableHead className="hidden lg:table-cell">Recorded By</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow
              key={record.id}
              className="hover:bg-[#FFF5F6] transition-colors"
              data-selected={selectedIds.has(record.id)}
            >
              <TableCell className="px-4">
                <Checkbox
                  checked={selectedIds.has(record.id)}
                  onCheckedChange={() => onToggleSelect(record.id)}
                  aria-label={`Select record for ${record.studentName}`}
                />
              </TableCell>
              <TableCell>
                <Link
                  href={`/patients/${record.studentId}`}
                  className="font-medium text-[#C41E3A] hover:underline"
                >
                  {record.studentName}
                </Link>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-gray-600">
                {record.gradeLevel ? `Grade ${record.gradeLevel}` : '—'}
                {record.section ? ` - ${record.section}` : ''}
              </TableCell>
              <TableCell className="text-gray-700 whitespace-nowrap">
                {new Date(record.visitDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-gray-700 max-w-[200px]">
                <span className="line-clamp-2" title={record.chiefComplaint}>
                  {record.chiefComplaint.length > 60
                    ? record.chiefComplaint.slice(0, 60) + '…'
                    : record.chiefComplaint}
                </span>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {record.diseaseCategory ? (
                  <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                    {record.diseaseCategory}
                  </Badge>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge
                  variant="outline"
                  className={severityClass[record.severity] ?? 'bg-gray-100 text-gray-600'}
                >
                  {record.severity}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell text-gray-600 text-sm">
                {record.recordedByName ?? '—'}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <DownloadPdfButton
                    variant="single"
                    record={record}
                    size="sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(record)}
                    className="text-gray-500 hover:text-[#C41E3A] hover:bg-red-50"
                    title="Edit record"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <DeleteRecordDialog
                    record={record}
                    studentId={record.studentId}
                    onDelete={onRefresh}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
