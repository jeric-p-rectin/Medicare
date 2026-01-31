import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  getPendingActionById,
  deletePendingAction,
} from '@/lib/queries/pending-actions';
import { logAction } from '@/lib/audit-logger';

/**
 * GET /api/pending-actions/[id]
 * Get a specific pending action by ID
 * SUPER_ADMIN: Can view any pending action
 * ADMIN: Can only view their own pending actions
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const pendingAction = await getPendingActionById(id);

    if (!pendingAction) {
      return NextResponse.json(
        { error: 'Pending action not found' },
        { status: 404 }
      );
    }

    // Authorization check: ADMIN can only view their own pending actions
    if (session.user.role === 'ADMIN' && pendingAction.requestedById !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden: You can only view your own pending actions' },
        { status: 403 }
      );
    }

    return NextResponse.json(pendingAction);
  } catch (error) {
    const resolvedParams = await params;
    console.error(`[GET /api/pending-actions/${resolvedParams.id}] Error:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/pending-actions/[id]
 * Cancel/delete a pending action
 * Requester can cancel their own pending actions
 * SUPER_ADMIN can cancel any pending action
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

    const { id } = await params;
    const pendingAction = await getPendingActionById(id);

    if (!pendingAction) {
      return NextResponse.json(
        { error: 'Pending action not found' },
        { status: 404 }
      );
    }

    // Only allow deletion of pending actions (not approved/rejected)
    if (pendingAction.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Cannot delete a pending action that has already been reviewed' },
        { status: 400 }
      );
    }

    // Authorization check: Requester or SUPER_ADMIN can delete
    const isRequester = pendingAction.requestedById === session.user.id;
    const isSuperAdmin = session.user.role === 'SUPER_ADMIN';

    if (!isRequester && !isSuperAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: You can only cancel your own pending actions' },
        { status: 403 }
      );
    }

    // Delete the pending action
    await deletePendingAction(id);

    // Log the action
    await logAction(session.user.id, 'DELETE', 'pending_action', id, {
      action_type: pendingAction.actionType,
      status: pendingAction.status,
    }, null);

    return NextResponse.json({
      success: true,
      message: 'Pending action cancelled',
    });
  } catch (error) {
    const resolvedParams = await params;
    console.error(`[DELETE /api/pending-actions/${resolvedParams.id}] Error:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
