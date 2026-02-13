import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getMedicalRecordById, deleteMedicalRecord } from '@/lib/queries/medical-records';
import { logAction } from '@/lib/audit-logger';

/**
 * DELETE /api/students/[id]/records/[recordId]
 * Delete a medical record
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; recordId: string }> }
) {
  try {
    // 1. Authentication check
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Authorization check - only ADMIN and SUPER_ADMIN
    if (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id: studentId, recordId } = await params;

    // 3. Fetch record for audit trail (before deletion)
    const record = await getMedicalRecordById(recordId);

    if (!record) {
      return NextResponse.json({ error: 'Medical record not found' }, { status: 404 });
    }

    // 4. Verify record belongs to specified student (integrity check)
    if (record.studentId !== studentId) {
      return NextResponse.json({ error: 'Record does not belong to this student' }, { status: 400 });
    }

    // 5. Log deletion action with full record data
    await logAction(
      session.user.id!,
      'DELETE',
      'medical_records',
      recordId,
      record, // oldValues - full record
      null,   // newValues - null for deletion
      request
    );

    // 6. Execute deletion
    await deleteMedicalRecord(recordId);

    return NextResponse.json({
      message: 'Medical record deleted successfully',
      deletedRecordId: recordId
    });

  } catch (error) {
    console.error('Error deleting medical record:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
