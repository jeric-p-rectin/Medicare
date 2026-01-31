import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  getPendingActionById,
  approvePendingAction,
} from '@/lib/queries/pending-actions';
import { executePendingAction, notifyRequester } from '@/lib/pending-action-executor';
import { approveActionSchema } from '@/lib/validations/pending-actions';
import { logAction } from '@/lib/audit-logger';

/**
 * PATCH /api/pending-actions/[id]/approve
 * Approve a pending action and execute it
 * SUPER_ADMIN only
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

    // Only SUPER_ADMIN can approve pending actions
    if (session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: Only SUPER_ADMIN can approve pending actions' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validatedData = approveActionSchema.parse(body);

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

    try {
      // Execute the pending action within a try-catch to handle failures
      const executionResult = await executePendingAction(pendingAction, session.user.id);

      // Mark action as approved
      await approvePendingAction(id, session.user.id, validatedData.reviewNotes);

      // Log the approval
      await logAction(session.user.id, 'UPDATE', 'pending_action', id, {
        status: 'PENDING',
      }, {
        status: 'APPROVED',
        review_notes: validatedData.reviewNotes,
      });

      // Notify the requester with credentials (for registrations)
      await notifyRequester(
        pendingAction.requestedById,
        pendingAction.actionType,
        'APPROVED',
        executionResult.message,
        executionResult.credentials
      );

      return NextResponse.json({
        success: true,
        message: executionResult.message,
        actionId: id,
      });
    } catch (executionError: any) {
      console.error('[PATCH /api/pending-actions/approve] Execution error:', executionError);

      // If execution fails, mark as approved but notify of failure
      await approvePendingAction(id, session.user.id, `EXECUTION FAILED: ${executionError.message}`);

      // Notify requester of failure
      await notifyRequester(
        pendingAction.requestedById,
        pendingAction.actionType,
        'REJECTED',
        `Action approved but execution failed: ${executionError.message}`
      );

      return NextResponse.json(
        {
          error: 'Action approved but execution failed',
          details: executionError.message,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    const { id: paramId } = await params;
    console.error(`[PATCH /api/pending-actions/${paramId}/approve] Error:`, error);

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
