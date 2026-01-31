import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAllUsers, createUser, usernameExists, emailExists } from '@/lib/queries/users';
import { userCreateSchema } from '@/lib/validations/account';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

/**
 * GET /api/users
 * List all users with optional filters
 * Authorization: SUPER_ADMIN only
 * Query params: ?role=ADMIN|PATIENT&status=active|inactive&search=<name>
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN and ADMIN can access this endpoint
    if (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Get all users (optionally filtered by role)
    let users = await getAllUsers(role || undefined);

    // Filter by status if provided
    if (status) {
      const isActive = status === 'active';
      users = users.filter((user) => user.is_active === isActive);
    }

    // Filter by search term if provided (search in name, username, email)
    if (search) {
      const searchLower = search.toLowerCase();
      users = users.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        const username = user.username.toLowerCase();
        const email = user.email?.toLowerCase() || '';
        return (
          fullName.includes(searchLower) ||
          username.includes(searchLower) ||
          email.includes(searchLower)
        );
      });
    }

    // Remove passwords from response
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);

    return NextResponse.json({
      users: usersWithoutPasswords,
      total: usersWithoutPasswords.length,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users
 * Create a new user
 * Authorization: SUPER_ADMIN only
 * Body: { username, email, firstName, lastName, middleName, role, password }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN can create users
    if (session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();

    // Validate request body
    const validatedData = userCreateSchema.parse(body);

    // Check if username already exists
    const usernameInUse = await usernameExists(validatedData.username);
    if (usernameInUse) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    // Check if email already exists (if provided)
    if (validatedData.email) {
      const emailInUse = await emailExists(validatedData.email);
      if (emailInUse) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user
    const userId = await createUser({
      username: validatedData.username,
      email: validatedData.email || null,
      password: hashedPassword,
      role: validatedData.role,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      middleName: validatedData.middleName || null,
    });

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: userId,
        username: validatedData.username,
        email: validatedData.email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        role: validatedData.role,
      },
      temporaryPassword: validatedData.password, // Return temporary password for display
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
