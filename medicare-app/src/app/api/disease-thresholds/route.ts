import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  getAllThresholds,
  createThreshold,
  getExistingDiseases
} from '@/lib/queries/disease-thresholds';
import { logAction } from '@/lib/audit-logger';

/**
 * GET /api/disease-thresholds
 * Get all disease thresholds (SUPER_ADMIN only)
 */
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN can view thresholds
    if (session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const thresholds = await getAllThresholds();
    const existingDiseases = await getExistingDiseases();

    return NextResponse.json({
      thresholds,
      existingDiseases
    });
  } catch (error) {
    console.error('Error fetching disease thresholds:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/disease-thresholds
 * Create a new disease threshold (SUPER_ADMIN only)
 */
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN can create thresholds
    if (session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();

    // Validation
    if (!data.diseaseName || typeof data.diseaseName !== 'string') {
      return NextResponse.json(
        { error: 'Disease name is required' },
        { status: 400 }
      );
    }

    if (!data.casesPerWeek || typeof data.casesPerWeek !== 'number' || data.casesPerWeek <= 0) {
      return NextResponse.json(
        { error: 'Cases per week must be a positive integer' },
        { status: 400 }
      );
    }

    const thresholdId = await createThreshold({
      diseaseName: data.diseaseName.trim(),
      casesPerWeek: Math.floor(data.casesPerWeek),
      description: data.description?.trim(),
      createdById: session.user.id!
    });

    // Log the action
    await logAction(
      session.user.id!,
      'CREATE',
      'disease_thresholds',
      thresholdId,
      null,
      data,
      request
    );

    return NextResponse.json({
      id: thresholdId,
      message: 'Disease threshold created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating disease threshold:', error);

    // Handle unique constraint violation
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'A threshold for this disease already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
