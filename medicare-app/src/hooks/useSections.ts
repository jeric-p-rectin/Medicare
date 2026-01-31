import useSWR from 'swr';
import type { Section } from '@/types/section';

interface SectionsResponse {
  sections: Section[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Hook to fetch sections, optionally filtered by grade level
 * @param gradeLevel - Grade level to filter by (e.g., '7', '8', ..., '12', 'Non-Graded')
 * @returns Object containing sections array, loading state, and error
 */
export function useSections(gradeLevel?: string) {
  const url = gradeLevel ? `/api/sections?grade=${gradeLevel}` : null;

  const { data, error, isLoading } = useSWR<SectionsResponse>(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Cache for 1 minute
  });

  return {
    sections: data?.sections || [],
    error,
    isLoading,
  };
}
