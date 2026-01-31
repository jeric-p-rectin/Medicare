import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getSectionsByGrade, getAllSections } from '@/lib/queries/sections';

/**
 * GET /api/sections
 * Returns sections, optionally filtered by grade level
 * Query params:
 *   - grade: Filter by grade level (e.g., '7', '8', ..., '12', 'Non-Graded')
 */
export async function GET(request: Request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade');

    // Fetch sections based on filter
    const sections = grade
      ? await getSectionsByGrade(grade)
      : await getAllSections();

    return NextResponse.json({ sections });
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
