'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search, X, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSections } from '@/hooks/useSections';
import { SectionCombobox } from '@/components/registration/section-combobox';
import { MedicalRecordsTable } from '@/components/medical-records/medical-records-table';
import { BulkDeleteBar } from '@/components/medical-records/bulk-delete-bar';
import { DownloadPdfButton } from '@/components/medical-records/download-pdf-button';
import { EditRecordDialog } from '@/components/medical-records/edit-record-dialog';
import { toast } from 'sonner';
import type { MedicalRecordListResult, MedicalRecordWithStudent } from '@/types/medical-record';

export default function MedicalRecordsPage() {
  const [data, setData] = useState<MedicalRecordListResult | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);

  // Selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit
  const [editingRecord, setEditingRecord] = useState<MedicalRecordWithStudent | null>(null);

  // Disease categories for the filter dropdown
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  // Sections hook (for section combobox)
  const { sections, isLoading: sectionsLoading } = useSections(gradeFilter);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(searchQuery && { search: searchQuery }),
        ...(gradeFilter && { grade: gradeFilter }),
        ...(sectionFilter && { section: sectionFilter }),
        ...(categoryFilter && { diseaseCategory: categoryFilter }),
        ...(severityFilter && { severity: severityFilter }),
        ...(dateFrom && { dateFrom }),
        ...(dateTo && { dateTo }),
      });

      const res = await fetch(`/api/medical-records?${params}`);
      if (res.ok) {
        setData(await res.json());
      }
    } catch (err) {
      console.error('Error fetching medical records:', err);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, gradeFilter, sectionFilter, categoryFilter, severityFilter, dateFrom, dateTo]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // Fetch disease categories once on mount
  useEffect(() => {
    fetch('/api/disease-categories')
      .then((r) => r.json())
      .then(({ categories }) => setAvailableCategories(categories ?? []))
      .catch(() => {});
  }, []);

  // Clear selection when page or filters change
  useEffect(() => {
    setSelectedIds(new Set());
  }, [page, searchQuery, gradeFilter, sectionFilter, categoryFilter, severityFilter, dateFrom, dateTo]);

  const handleGradeChange = (value: string) => {
    setGradeFilter(value === 'ALL' ? '' : value);
    setSectionFilter('');
    setPage(1);
  };

  const handleSectionChange = (value: string) => {
    setSectionFilter(value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setGradeFilter('');
    setSectionFilter('');
    setCategoryFilter('');
    setSeverityFilter('');
    setDateFrom('');
    setDateTo('');
    setPage(1);
  };

  const hasActiveFilters =
    searchQuery || gradeFilter || sectionFilter || categoryFilter || severityFilter || dateFrom || dateTo;

  // Selection handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && data?.records) {
      setSelectedIds(new Set(data.records.map((r) => r.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const allSelected =
    !!data?.records?.length && selectedIds.size === data.records.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  // Bulk delete handler
  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;

    const confirmed = window.confirm(
      `Delete ${selectedIds.size} selected record${selectedIds.size !== 1 ? 's' : ''}? This cannot be undone.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const res = await fetch('/api/medical-records/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });

      if (res.ok) {
        const result = await res.json();
        toast.success(`Deleted ${result.deleted} record${result.deleted !== 1 ? 's' : ''} successfully`);
        setSelectedIds(new Set());
        fetchRecords();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to delete records');
      }
    } catch {
      toast.error('An error occurred during bulk delete');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <FileText className="w-7 h-7 text-[#C41E3A]" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Medical Records</h1>
              {data && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {data.total.toLocaleString()} record{data.total !== 1 ? 's' : ''} total
                </p>
              )}
            </div>
          </div>
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2">
              <DownloadPdfButton
                variant="bulk"
                records={data?.records?.filter(r => selectedIds.has(r.id)) ?? []}
              />
              <BulkDeleteBar
                count={selectedIds.size}
                onDelete={handleBulkDelete}
                isDeleting={isDeleting}
                onClearSelection={() => setSelectedIds(new Set())}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Search Bar */}
        <div className="mb-5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by student name or chief complaint…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-xl
                         focus:border-[#C41E3A] focus:ring-4 focus:ring-red-50
                         transition-all outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Filter Row */}
        <div className="mb-6 flex gap-3 items-center flex-wrap">
          {/* Grade */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Grade:</span>
            <Select value={gradeFilter || 'ALL'} onValueChange={handleGradeChange}>
              <SelectTrigger className="w-[160px] bg-white border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] transition-all">
                <SelectValue placeholder="All Grades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Grades</SelectItem>
                <SelectItem value="7">Grade 7</SelectItem>
                <SelectItem value="8">Grade 8</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
                <SelectItem value="Non-Graded">Non-Graded (SNED)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Section */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Section:</span>
            <div className="w-[220px]">
              <SectionCombobox
                gradeLevel={gradeFilter}
                value={sectionFilter}
                onValueChange={handleSectionChange}
                disabled={!gradeFilter || sectionsLoading}
              />
            </div>
          </div>

          {/* Disease Category */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Disease:</span>
            <Select value={categoryFilter || 'ALL'} onValueChange={(v) => { setCategoryFilter(v === 'ALL' ? '' : v); setPage(1); }}>
              <SelectTrigger className="w-[180px] bg-white border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] transition-all">
                <SelectValue placeholder="All Diseases" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Diseases</SelectItem>
                {availableCategories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Severity */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Severity:</span>
            <Select value={severityFilter || 'ALL'} onValueChange={(v) => { setSeverityFilter(v === 'ALL' ? '' : v); setPage(1); }}>
              <SelectTrigger className="w-[150px] bg-white border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] transition-all">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="MILD">Mild</SelectItem>
                <SelectItem value="MODERATE">Moderate</SelectItem>
                <SelectItem value="SEVERE">Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date range */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">From:</span>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
              className="w-[150px] bg-white border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">To:</span>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
              className="w-[150px] bg-white border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] transition-all"
            />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="px-4 py-2 border-2 border-gray-200 rounded-xl
                         hover:border-[#C41E3A] hover:bg-[#FFF5F6]
                         transition-all text-sm font-semibold flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <MedicalRecordsTable
            records={data?.records}
            loading={loading}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onSelectAll={handleSelectAll}
            allSelected={allSelected}
            someSelected={someSelected}
            onEdit={setEditingRecord}
            onRefresh={fetchRecords}
          />

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg
                           hover:border-[#C41E3A] transition-all font-semibold
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </Button>
              <span className="text-gray-600">
                Page {page} of {data.totalPages}
                <span className="text-gray-400 text-sm ml-2">
                  ({data.total.toLocaleString()} records)
                </span>
              </span>
              <Button
                variant="outline"
                disabled={page === data.totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg
                           hover:border-[#C41E3A] transition-all font-semibold
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <EditRecordDialog
        record={editingRecord}
        open={!!editingRecord}
        onClose={() => setEditingRecord(null)}
        onSuccess={fetchRecords}
      />
    </div>
  );
}
