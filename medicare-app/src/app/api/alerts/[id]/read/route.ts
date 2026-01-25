import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { markAlertAsRead } from '@/lib/queries/alerts';

/**
 * PUT /api/alerts/[id]/read
 * Mark an alert as read
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

    const { id } = await params;

    await markAlertAsRead(id);

    return NextResponse.json({ message: 'Alert marked as read' });
  } catch (error) {
    console.error('Error marking alert as read:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
