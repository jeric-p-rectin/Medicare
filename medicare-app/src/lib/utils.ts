import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PatientCategory } from '@/types';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: Date | string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

/**
 * Determine patient categories based on age and conditions
 */
export function determinePatientCategories(
  age: number,
  isPWD: boolean = false,
  isPregnant: boolean = false
): PatientCategory[] {
  const categories: PatientCategory[] = [];

  // Age-based categories
  if (age < 1) {
    categories.push('INFANT');
  } else if (age < 18) {
    categories.push('MINOR');
  } else if (age >= 60) {
    categories.push('SENIOR');
  } else {
    categories.push('ADULT');
  }

  // Condition-based categories
  if (isPWD) {
    categories.push('PWD');
  }
  if (isPregnant) {
    categories.push('PREGNANT');
  }

  return categories;
}

/**
 * Generate unique patient number
 * Format: P{YEAR}{4-digit-random}
 * Example: P202500001
 */
export function generatePatientNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  const sequence = String(random).padStart(5, '0');
  return `P${year}${sequence}`;
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date and time for display
 */
export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format date for input fields (YYYY-MM-DD)
 */
export function formatDateForInput(date: Date | string | null | undefined): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

/**
 * Get full name from user/patient data
 */
export function getFullName(
  firstName: string,
  lastName: string,
  middleName?: string | null
): string {
  if (middleName) {
    return `${firstName} ${middleName} ${lastName}`;
  }
  return `${firstName} ${lastName}`;
}

/**
 * Get initials from name
 */
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

/**
 * Validate Philippine phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Philippine mobile: 09xxxxxxxxx or +639xxxxxxxxx
  const pattern = /^(\+?63|0)?9\d{9}$/;
  return pattern.test(phone.replace(/\s|-/g, ''));
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('09')) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Truncate text with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Sleep/delay function for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
