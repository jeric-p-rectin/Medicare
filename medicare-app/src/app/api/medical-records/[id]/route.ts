import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getMedicalRecordById, updateMedicalRecord } from '@/lib/queries/medical-records';
import { logAction } from '@/lib/audit-logger';
import { medicalRecordUpdateSchema } from '@/lib/validations/medical-records';
import { ZodError } from 'zod';

/**
 * PUT /api/medical-records/[id]
 * Update a medical record
 * Only accessible by ADMIN and SUPER_ADMIN
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

    if (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;

    // Fetch existing record for audit trail
    const existingRecord = await getMedicalRecordById(id);
    if (!existingRecord) {
      return NextResponse.json({ error: 'Medical record not found' }, { status: 404 });
    }

    // Validate request body
    const body = await request.json();
    const validated = medicalRecordUpdateSchema.parse(body);

    // Log before updating (capture the before state)
    await logAction(
      session.user.id!,
      'UPDATE',
      'medical_records',
      id,
      existingRecord,
      validated,
      request
    );

    // Convert visitDate string to Date if provided (updateMedicalRecord expects Date)
    const updateData = {
      ...validated,
      visitDate: validated.visitDate ? new Date(validated.visitDate) : undefined,
    };

    await updateMedicalRecord(id, updateData);

    // Return updated record
    const updatedRecord = await getMedicalRecordById(id);

    return NextResponse.json({
      message: 'Medical record updated successfully',
      record: updatedRecord,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error updating medical record:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
