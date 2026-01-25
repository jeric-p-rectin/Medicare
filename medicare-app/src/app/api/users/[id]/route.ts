import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { findUserById, updateUser, updateUserStatus } from '@/lib/queries/users';
import { profileUpdateSchema, userStatusUpdateSchema } from '@/lib/validations/account';
import { z } from 'zod';

/**
 * GET /api/users/[id]
 * Get user details by ID
 * Authorization: Users can only access their own profile, SUPER_ADMIN can access any
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: userId } = await params;

    // Check authorization: users can only access their own profile, SUPER_ADMIN can access any
    if (session.user.id !== userId && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const user = await findUserById(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/[id]
 * Update user profile
 * Authorization: Users can only update their own profile, SUPER_ADMIN can update any
 * PATIENT users can only update email, other fields are restricted
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

    // Check authorization: users can only update their own profile, SUPER_ADMIN can update any
    if (session.user.id !== userId && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();

    // Validate request body
    const validatedData = profileUpdateSchema.parse(body);

    // For PATIENT users, only allow email updates
    if (session.user.role === 'PATIENT' && session.user.id === userId) {
      const { email } = validatedData;
      if (body.firstName || body.lastName || body.middleName) {
        return NextResponse.json(
          { error: 'Patients can only update their email address' },
          { status: 403 }
        );
      }
      // Only update email for patients
      await updateUser(userId, { email: email || undefined });
    } else {
      // For ADMIN and SUPER_ADMIN, allow all fields
      await updateUser(userId, {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        middleName: validatedData.middleName || null,
        email: validatedData.email || undefined,
      });
    }

    // Fetch updated user
    const updatedUser = await findUserById(userId);

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/users/[id]
 * Update user active status (deactivate/activate)
 * Authorization: Only SUPER_ADMIN can change user status
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN can change user status
    if (session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id: userId } = await params;
    const body = await request.json();

    // Validate request body
    const validatedData = userStatusUpdateSchema.parse(body);

    // Prevent SUPER_ADMIN from deactivating themselves
    if (userId === session.user.id && !validatedData.isActive) {
      return NextResponse.json(
        { error: 'You cannot deactivate your own account' },
        { status: 400 }
      );
    }

    // Update user status
    await updateUserStatus(userId, validatedData.isActive);

    // Fetch updated user
    const updatedUser = await findUserById(userId);

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      message: `User ${validatedData.isActive ? 'activated' : 'deactivated'} successfully`,
      user: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating user status:', error);
    return NextResponse.json(
      { error: 'Failed to update user status' },
      { status: 500 }
    );
  }
}
