'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, UserPlus, Loader2, X } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { StudentListResult } from '@/types/student';

export default function PatientsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<StudentListResult | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [loading, setLoading] = useState(true);

  const grade = searchParams.get('grade') || '';
  const section = searchParams.get('section') || '';

  const [gradeFilter, setGradeFilter] = useState<string>(grade);
  const [sectionFilter, setSectionFilter] = useState<string>(section);

  // Fetch sections dynamically based on selected grade
  const { sections, isLoading: sectionsLoading } = useSections(gradeFilter);

  useEffect(() => {
    fetchPatients();
  }, [searchQuery, page, grade, section]);

  useEffect(() => {
    setGradeFilter(grade);
    setSectionFilter(section);
  }, [grade, section]);

  const fetchPatients = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(searchQuery && { search: searchQuery }),
        ...(grade && { grade }),
        ...(section && { section }),
      });

      const response = await fetch(`/api/students?${params}`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page on search
  };

  const handleGradeChange = (value: string) => {
    setGradeFilter(value);
    setSectionFilter(''); // Reset section when grade changes
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('grade', value);
    } else {
      params.delete('grade');
    }
    params.delete('section'); // Reset section
    params.set('page', '1'); // Reset to first page
    router.push(`/patients?${params.toString()}`);
  };

  const handleSectionChange = (value: string) => {
    setSectionFilter(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('section', value);
    } else {
      params.delete('section');
    }
    params.set('page', '1');
    router.push(`/patients?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setGradeFilter('');
    setSectionFilter('');
    setSearchQuery('');
    router.push('/patients?page=1');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
          <Button
            onClick={() => router.push('/registration')}
            className="px-6 py-3 bg-gradient-to-r from-[#C41E3A] to-[#E63946]
                     text-white rounded-xl font-semibold shadow-lg shadow-red-500/30
                     hover:shadow-xl hover:-translate-y-0.5 transition-all
                     flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Register New Student
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, grade, or section..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-xl
                       focus:border-[#C41E3A] focus:ring-4 focus:ring-red-50
                       transition-all outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4 items-center flex-wrap">
          {/* Grade Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Grade:</span>
            <Select value={gradeFilter || undefined} onValueChange={handleGradeChange}>
              <SelectTrigger className="w-[180px] bg-white border-2 border-gray-100 rounded-xl
                                       focus:border-[#C41E3A] transition-all">
                <SelectValue placeholder="All Grades" />
              </SelectTrigger>
              <SelectContent>
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

          {/* Section Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Section:</span>
            <div className="w-[250px]">
              <SectionCombobox
                gradeLevel={gradeFilter}
                value={sectionFilter}
                onValueChange={handleSectionChange}
                disabled={!gradeFilter || sectionsLoading}
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          {(gradeFilter || sectionFilter || searchQuery) && (
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

          {/* Active Filters Count */}
          {(gradeFilter || sectionFilter || searchQuery) && (
            <span className="text-sm text-gray-500">
              {[searchQuery, gradeFilter, sectionFilter].filter(Boolean).length} filter(s) active
            </span>
          )}
        </div>

        {/* Patient Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-[#FFF5F6]">
              <TableRow>
                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Student Name
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Grade Level and Section
                </TableHead>
                <TableHead className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100">
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-12">
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-[#C41E3A]" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : data?.students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-12 text-gray-500">
                    No patients found
                  </TableCell>
                </TableRow>
              ) : (
                data?.students.map((patient) => (
                  <TableRow
                    key={patient.id}
                    className="hover:bg-[#FFF5F6] cursor-pointer transition-colors"
                    onClick={() => router.push(`/patients/${patient.id}`)}
                  >
                    <TableCell className="px-6 py-4 font-medium text-gray-800">
                      {patient.lastName}, {patient.firstName} {patient.middleName || ''}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600">
                      Grade {patient.gradeLevel} - {patient.section}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-4 py-2 border-2 border-gray-200 rounded-lg
                                 hover:border-[#C41E3A] hover:bg-[#FFF5F6]
                                 transition-all text-sm font-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/patients/${patient.id}`);
                        }}
                      >
                        View Record
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

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
    </div>
  );
}
