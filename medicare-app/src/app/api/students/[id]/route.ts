import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { findStudentById, updateStudent } from '@/lib/queries/students';
import { getStudentMedicalRecords } from '@/lib/queries/medical-records';
import { logAction } from '@/lib/audit-logger';
import { canAccessStudent } from '@/lib/rbac';
import type { UserRole } from '@/lib/rbac';

/**
 * GET /api/students/[id]
 * Get student details with medical records
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

    const student = await findStudentById(id);

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Authorization check: Can this user access this student?
    if (!canAccessStudent(session.user.role as UserRole, session.user.id!, student.userId)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get medical records
    const medicalRecords = await getStudentMedicalRecords(id);

    // Log the read action
    await logAction(
      session.user.id!,
      'READ',
      'students',
      id,
      null,
      null,
      request
    );

    return NextResponse.json({
      ...student,
      medicalRecords
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/students/[id]
 * Update student information
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

    // Only SUPER_ADMIN and ADMIN can update students
    if (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;

    // Get current student data for audit log
    const oldStudent = await findStudentById(id);

    if (!oldStudent) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Authorization check: Can this user update this student?
    if (!canAccessStudent(session.user.role as UserRole, session.user.id!, oldStudent.userId)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();

    // Update student
    await updateStudent(id, {
      ...data,
      updatedById: session.user.id!
    });

    // Log the action
    await logAction(
      session.user.id!,
      'UPDATE',
      'students',
      id,
      oldStudent,
      data,
      request
    );

    return NextResponse.json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
