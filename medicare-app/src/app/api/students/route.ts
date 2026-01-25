import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { findStudents, findStudentByUserId, createStudent } from '@/lib/queries/students';
import { detectDuplicate } from '@/lib/duplicate-detection';
import { logAction } from '@/lib/audit-logger';
import bcrypt from 'bcryptjs';

/**
 * GET /api/students
 * Get list of students with search, pagination, and filters
 */
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // PATIENT users can only access their own student record
    if (session.user.role === 'PATIENT') {
      const student = await findStudentByUserId(session.user.id!);

      if (!student) {
        return NextResponse.json({
          students: [],
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0
        });
      }

      // Return only their own record in the expected format
      return NextResponse.json({
        students: [student],
        total: 1,
        page: 1,
        limit: 1,
        totalPages: 1
      });
    }

    // For SUPER_ADMIN and ADMIN, return all students with pagination
    const { searchParams } = new URL(request.url);
    const rawPage = searchParams.get('page');
    const rawLimit = searchParams.get('limit');

    // Robust integer parsing with validation
    const page = Math.max(1, parseInt(rawPage || '1', 10) || 1);
    const limit = Math.max(1, Math.min(parseInt(rawLimit || '20', 10) || 20, 1000));

    // Validate they're actual numbers (not NaN)
    if (isNaN(page) || isNaN(limit)) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      );
    }

    const search = searchParams.get('search') || '';
    const grade = searchParams.get('grade') || '';
    const section = searchParams.get('section') || '';

    const result = await findStudents({
      page,
      limit,
      search,
      grade: grade as any,
      section
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/students
 * Create a new student (registration)
 *
 * Uses alert-based duplicate detection workflow:
 * 1. Student is created (unless LRN already exists)
 * 2. Duplicate detection runs after creation
 * 3. Alerts are generated for similar students (≥50% match)
 * 4. Admins review and resolve duplicate alerts manually
 *
 * Note: LRN duplicates are strictly prevented by database constraint.
 */
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN and ADMIN can create students
    if (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create student (wrapped in try-catch to handle LRN unique constraint)
    let studentId: string;
    try {
      studentId = await createStudent({
        username: data.username,
        password: hashedPassword,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        dateOfBirth: new Date(data.dateOfBirth),
        age: data.age,
        sex: data.sex,
        gradeLevel: data.gradeLevel,
        section: data.section,
        lrn: data.lrn,
        studentNumber: data.studentNumber,
        parentGuardianName: data.parentGuardianName,
        parentGuardianContact: data.parentGuardianContact,
        address: data.address,
        bmi: data.bmi,
        healthHistory: data.healthHistory,
        createdById: session.user.id!
      });
    } catch (error: any) {
      // Handle LRN duplicate constraint violation
      if (error.code === 'ER_DUP_ENTRY' && error.message?.includes('lrn')) {
        return NextResponse.json(
          { error: 'A student with this LRN already exists' },
          { status: 409 }
        );
      }
      // Re-throw other errors to be caught by outer try-catch
      throw error;
    }

    // Run duplicate detection (will create alert if needed)
    await detectDuplicate(
      studentId,
      data.firstName,
      data.lastName,
      new Date(data.dateOfBirth),
      data.lrn
    );

    // Log the action
    await logAction(
      session.user.id!,
      'CREATE',
      'students',
      studentId,
      null,
      data,
      request
    );

    return NextResponse.json({ id: studentId, message: 'Student created successfully' });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
