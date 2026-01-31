import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  getPendingActionById,
  rejectPendingAction,
} from '@/lib/queries/pending-actions';
import { notifyRequester } from '@/lib/pending-action-executor';
import { rejectActionSchema } from '@/lib/validations/pending-actions';
import { logAction } from '@/lib/audit-logger';

/**
 * PATCH /api/pending-actions/[id]/reject
 * Reject a pending action
 * SUPER_ADMIN only
 * Rejection reason is required
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN can reject pending actions
    if (session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: Only SUPER_ADMIN can reject pending actions' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Validate request body (rejection requires notes)
    const validatedData = rejectActionSchema.parse(body);

    // Get the pending action
    const pendingAction = await getPendingActionById(id);

    if (!pendingAction) {
      return NextResponse.json(
        { error: 'Pending action not found' },
        { status: 404 }
      );
    }

    // Check if action is still pending
    if (pendingAction.status !== 'PENDING') {
      return NextResponse.json(
        { error: `Action has already been ${pendingAction.status.toLowerCase()}` },
        { status: 400 }
      );
    }

    // Reject the action
    await rejectPendingAction(id, session.user.id, validatedData.reviewNotes);

    // Log the rejection
    await logAction(session.user.id, 'UPDATE', 'pending_action', id, {
      status: 'PENDING',
    }, {
      status: 'REJECTED',
      review_notes: validatedData.reviewNotes,
    });

    // Notify the requester
    await notifyRequester(
      pendingAction.requestedById,
      pendingAction.actionType,
      'REJECTED',
      `Your request was rejected. Reason: ${validatedData.reviewNotes}`
    );

    return NextResponse.json({
      success: true,
      message: 'Pending action rejected',
      actionId: id,
    });
  } catch (error: any) {
    const { id: paramId } = await params;
    console.error(`[PATCH /api/pending-actions/${paramId}/reject] Error:`, error);

    // Handle validation errors
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
