import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  createPendingAction,
  getPendingActions,
  countPendingByStatus,
} from '@/lib/queries/pending-actions';
import { createAlert } from '@/lib/queries/alerts';
import { createPendingActionSchema } from '@/lib/validations/pending-actions';
import { logAction } from '@/lib/audit-logger';
import type { PendingActionFilters } from '@/types/pending-action';

/**
 * Helper function to generate notification title based on action type
 */
function getNotificationTitle(actionType: string): string {
  switch (actionType) {
    case 'REGISTER_STUDENT':
      return 'New Student Registration Request';
    case 'DEACTIVATE_USER':
      return 'New User Deactivation Request';
    case 'DELETE_USER':
      return 'New User Deletion Request';
    default:
      return 'New Pending Action';
  }
}

/**
 * Helper function to generate notification message based on action type
 */
function getNotificationMessage(actionType: string, requesterName: string, actionData: any): string {
  switch (actionType) {
    case 'REGISTER_STUDENT':
      return `${requesterName} has submitted a student registration request for ${actionData.firstName} ${actionData.lastName} (Grade ${actionData.gradeLevel} ${actionData.section}). Please review in the Pending Approvals tab.`;
    case 'DEACTIVATE_USER':
      return `${requesterName} has requested to deactivate user ${actionData.username}. Please review in the Pending Approvals tab.`;
    case 'DELETE_USER':
      return `${requesterName} has requested to delete user ${actionData.username}. Please review in the Pending Approvals tab.`;
    default:
      return `${requesterName} has submitted a new request. Please review in the Pending Approvals tab.`;
  }
}

/**
 * GET /api/pending-actions?status=PENDING&actionType=REGISTER_STUDENT&limit=50
 * Get pending actions with optional filters
 * SUPER_ADMIN: Can see all pending actions
 * ADMIN: Can only see their own pending actions
 */
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'PENDING' | 'APPROVED' | 'REJECTED' | null;
    const actionType = searchParams.get('actionType') as 'REGISTER_STUDENT' | 'DEACTIVATE_USER' | 'DELETE_USER' | null;
    const limit = parseInt(searchParams.get('limit') || '50');

    const filters: PendingActionFilters = {
      status: status || undefined,
      actionType: actionType || undefined,
      limit,
    };

    // ADMIN can only view their own pending actions
    if (session.user.role === 'ADMIN') {
      filters.requestedById = session.user.id;
    }

    // SUPER_ADMIN can view all pending actions
    const pendingActions = await getPendingActions(filters);

    // Get count of unreviewed (pending) actions
    const unreviewed = await countPendingByStatus('PENDING');

    return NextResponse.json({
      pendingActions,
      total: pendingActions.length,
      unreviewed,
    });
  } catch (error) {
    console.error('[GET /api/pending-actions] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/pending-actions
 * Create a new pending action
 * Used by ADMIN to submit requests that require SUPER_ADMIN approval
 */
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only ADMIN and SUPER_ADMIN can create pending actions
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: Insufficient permissions' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate request body
    const validatedData = createPendingActionSchema.parse(body);

    // Create pending action
    const pendingActionId = await createPendingAction({
      actionType: validatedData.actionType,
      requestedById: session.user.id,
      targetUserId: validatedData.targetUserId,
      actionData: validatedData.actionData as any,
      priority: validatedData.priority || 'MEDIUM',
    });

    // Create notification alert for SUPER_ADMIN
    try {
      const requesterName = session.user.name || session.user.email || `User ${session.user.id}`;
      const alertId = await createAlert({
        alertType: 'SYSTEM',
        title: getNotificationTitle(validatedData.actionType),
        message: getNotificationMessage(validatedData.actionType, requesterName, validatedData.actionData),
        severity: validatedData.priority === 'HIGH' ? 'HIGH' : 'MEDIUM',
      });
      console.log(`[POST /api/pending-actions] Notification alert created (ID: ${alertId}) for SUPER_ADMIN`);
    } catch (alertError) {
      // Don't fail the entire request if alert creation fails
      // The pending action is still created successfully
      console.error('[POST /api/pending-actions] Failed to create notification alert:', alertError);
      console.error('[POST /api/pending-actions] Alert details:', {
        alertType: 'SYSTEM',
        title: getNotificationTitle(validatedData.actionType),
        actionType: validatedData.actionType,
      });
    }

    // Log the action
    await logAction(session.user.id, 'CREATE', 'pending_action', pendingActionId, null, {
      action_type: validatedData.actionType,
      target_user_id: validatedData.targetUserId,
      priority: validatedData.priority,
    });

    return NextResponse.json(
      {
        success: true,
        pendingActionId,
        message: 'Request submitted for approval',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[POST /api/pending-actions] Error:', error);

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
