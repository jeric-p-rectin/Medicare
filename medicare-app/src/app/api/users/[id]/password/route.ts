import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { findUserById, updateUserPassword } from '@/lib/queries/users';
import { passwordChangeSchema } from '@/lib/validations/account';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

/**
 * PUT /api/users/[id]/password
 * Change user password
 * Authorization: Users can only change their own password
 * Requires current password verification
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: userId } = await params;

    // Users can only change their own password
    if (session.user.id !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();

    // Validate request body
    const validatedData = passwordChangeSchema.parse(body);

    // Fetch current user to verify password
    const user = await findUserById(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(
      validatedData.currentPassword,
      user.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 10);

    // Update password
    await updateUserPassword(userId, hashedPassword);

    return NextResponse.json({
      message: 'Password changed successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error changing password:', error);
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    );
  }
}
