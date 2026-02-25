import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAllMedicalRecords } from '@/lib/queries/medical-records';
import type { Severity } from '@/types/medical-record';

/**
 * GET /api/medical-records
 * Fetch all medical records across all students (paginated, filterable)
 * Only accessible by ADMIN and SUPER_ADMIN
 */
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10) || 20));
    const search = searchParams.get('search') ?? undefined;
    const grade = searchParams.get('grade') ?? undefined;
    const section = searchParams.get('section') ?? undefined;
    const diseaseCategory = searchParams.get('diseaseCategory') ?? undefined;
    const dateFrom = searchParams.get('dateFrom') ?? undefined;
    const dateTo = searchParams.get('dateTo') ?? undefined;

    const rawSeverity = searchParams.get('severity');
    const severity: Severity | undefined =
      rawSeverity === 'MILD' || rawSeverity === 'MODERATE' || rawSeverity === 'SEVERE'
        ? rawSeverity
        : undefined;

    const result = await getAllMedicalRecords({
      page,
      limit,
      search,
      grade,
      section,
      diseaseCategory,
      severity,
      dateFrom,
      dateTo,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching medical records:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
