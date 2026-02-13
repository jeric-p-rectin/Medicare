import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getStudentMedicalRecords, createMedicalRecord } from '@/lib/queries/medical-records';
import { checkOutbreakThreshold } from '@/lib/alert-system';
import { checkDiseaseTrend } from '@/lib/disease-trend';
import { logAction } from '@/lib/audit-logger';
import { ensureThresholdExists } from '@/lib/queries/disease-thresholds';

/**
 * GET /api/students/[id]/records
 * Get all medical records for a student
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

    const records = await getStudentMedicalRecords(id);

    return NextResponse.json(records);
  } catch (error) {
    console.error('Error fetching medical records:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/students/[id]/records
 * Create a new medical record for a student
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN and ADMIN can create medical records
    if (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;

    const data = await request.json();

    // Create medical record
    const recordId = await createMedicalRecord({
      studentId: id,
      visitDate: new Date(data.visitDate),
      chiefComplaint: data.chiefComplaint,
      diagnosis: data.diagnosis,
      treatment: data.treatment,
      notes: data.notes,
      diseaseCategory: data.diseaseCategory,
      illnessType: data.illnessType,
      severity: data.severity || 'MILD',
      recordedById: session.user.id!
    });

    // Check for outbreak if disease category is specified
    if (data.diseaseCategory) {
      // Ensure threshold exists (auto-create if needed)
      await ensureThresholdExists(data.diseaseCategory, session.user.id!);

      // Now outbreak check will always have a threshold to use
      await checkOutbreakThreshold(data.diseaseCategory);
      await checkDiseaseTrend(data.diseaseCategory);
    }

    // Log the action
    await logAction(
      session.user.id!,
      'CREATE',
      'medical_records',
      recordId,
      null,
      data,
      request
    );

    return NextResponse.json({
      id: recordId,
      message: 'Medical record created successfully'
    });
  } catch (error) {
    console.error('Error creating medical record:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
