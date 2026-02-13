import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  updateThreshold,
  deleteThreshold
} from '@/lib/queries/disease-thresholds';
import { logAction } from '@/lib/audit-logger';

/**
 * PUT /api/disease-thresholds/[id]
 * Update a disease threshold (SUPER_ADMIN only)
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN can update thresholds
    if (session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const data = await request.json();

    // Validation
    if (data.casesPerWeek !== undefined) {
      if (typeof data.casesPerWeek !== 'number' || data.casesPerWeek <= 0) {
        return NextResponse.json(
          { error: 'Cases per week must be a positive integer' },
          { status: 400 }
        );
      }
    }

    await updateThreshold(id, {
      casesPerWeek: data.casesPerWeek !== undefined ? Math.floor(data.casesPerWeek) : undefined,
      description: data.description,
      isActive: data.isActive,
      updatedById: session.user.id!
    });

    // Log the action
    await logAction(
      session.user.id!,
      'UPDATE',
      'disease_thresholds',
      id,
      null, // old values would require additional query
      data,
      request
    );

    return NextResponse.json({
      message: 'Disease threshold updated successfully'
    });
  } catch (error) {
    console.error('Error updating disease threshold:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/disease-thresholds/[id]
 * Delete a disease threshold (SUPER_ADMIN only)
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN can delete thresholds
    if (session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;

    await deleteThreshold(id);

    // Log the action
    await logAction(
      session.user.id!,
      'DELETE',
      'disease_thresholds',
      id,
      null,
      null,
      request
    );

    return NextResponse.json({
      message: 'Disease threshold deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting disease threshold:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
