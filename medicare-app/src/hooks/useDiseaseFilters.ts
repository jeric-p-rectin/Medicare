import { useState, useEffect, useMemo } from 'react';

const STORAGE_KEY = 'medicare-disease-filters';

interface UseDiseaseFiltersReturn {
  selectedDiseases: Set<string>;
  setSelectedDiseases: (diseases: Set<string>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  debouncedSearch: string;
  filteredDiseases: string[];
  selectAll: () => void;
  clearAll: () => void;
  toggleDisease: (disease: string) => void;
}

/**
 * Custom hook for managing disease filter state with localStorage persistence
 */
export function useDiseaseFilters(availableDiseases: string[]): UseDiseaseFiltersReturn {
  const [selectedDiseases, setSelectedDiseasesState] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Load saved filters from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSelectedDiseasesState(new Set(parsed));
        }
      }
    } catch (error) {
      console.error('Failed to load disease filters:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save to localStorage whenever selections change (throttled)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (selectedDiseases.size > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...selectedDiseases]));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [selectedDiseases]);

  // Debounce search query (300ms delay)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // Filter diseases based on debounced search
  const filteredDiseases = useMemo(() => {
    if (!debouncedSearch) return availableDiseases;

    const lowerSearch = debouncedSearch.toLowerCase();
    return availableDiseases.filter(disease =>
      disease.toLowerCase().includes(lowerSearch)
    );
  }, [availableDiseases, debouncedSearch]);

  // Select all visible (filtered) diseases
  const selectAll = () => {
    setSelectedDiseasesState(new Set(filteredDiseases));
  };

  // Clear all selections and search
  const clearAll = () => {
    setSelectedDiseasesState(new Set());
    setSearchQuery('');
    localStorage.removeItem(STORAGE_KEY);
  };

  // Toggle individual disease selection
  const toggleDisease = (disease: string) => {
    const newSet = new Set(selectedDiseases);
    if (newSet.has(disease)) {
      newSet.delete(disease);
    } else {
      newSet.add(disease);
    }
    setSelectedDiseasesState(newSet);
  };

  // Wrapper to allow external updates
  const setSelectedDiseases = (diseases: Set<string>) => {
    setSelectedDiseasesState(diseases);
  };

  return {
    selectedDiseases,
    setSelectedDiseases,
    searchQuery,
    setSearchQuery,
    debouncedSearch,
    filteredDiseases,
    selectAll,
    clearAll,
    toggleDisease,
  };
}
