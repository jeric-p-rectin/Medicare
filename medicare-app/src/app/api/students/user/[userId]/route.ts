import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { findStudentByUserId } from '@/lib/queries/students';

/**
 * GET /api/students/user/[userId]
 * Get student record by user ID
 * Authorization: Users can only access their own student record
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = await params;

    // Users can only access their own student record
    if (session.user.id !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const student = await findStudentByUserId(userId);

    if (!student) {
      return NextResponse.json(
        { error: 'Student record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student record' },
      { status: 500 }
    );
  }
}
