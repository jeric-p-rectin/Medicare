import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { deleteAlert } from '@/lib/queries/alerts';

/**
 * DELETE /api/alerts/[id]
 * Delete an alert
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

    // Only SUPER_ADMIN can permanently delete alerts
    if (session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({
        error: 'Only Super Admins can permanently delete alerts'
      }, { status: 403 });
    }

    const { id } = await params;

    await deleteAlert(id);

    return NextResponse.json({ message: 'Alert deleted successfully' });
  } catch (error) {
    console.error('Error deleting alert:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
