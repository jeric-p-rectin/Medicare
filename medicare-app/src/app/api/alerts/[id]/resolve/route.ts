import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { resolveAlert } from '@/lib/queries/alerts';

/**
 * PUT /api/alerts/[id]/resolve
 * Resolve (soft-delete) an alert
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

    // Only SUPER_ADMIN and ADMIN can resolve alerts
    if (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;

    // Extract optional resolution notes from request body
    let resolutionNotes: string | undefined;
    try {
      const body = await request.json();
      resolutionNotes = body.resolutionNotes;
    } catch {
      // No body or invalid JSON - that's okay, notes are optional
      resolutionNotes = undefined;
    }

    await resolveAlert(id, session.user.id, resolutionNotes);

    return NextResponse.json({ message: 'Alert dismissed successfully' });
  } catch (error) {
    console.error('Error resolving alert:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
