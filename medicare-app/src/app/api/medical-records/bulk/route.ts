import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getMedicalRecordById, bulkDeleteMedicalRecords } from '@/lib/queries/medical-records';
import { logAction } from '@/lib/audit-logger';
import { bulkDeleteSchema } from '@/lib/validations/medical-records';
import { ZodError } from 'zod';

/**
 * DELETE /api/medical-records/bulk
 * Bulk delete medical records by ID array
 * Only accessible by ADMIN and SUPER_ADMIN
 */
export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { ids } = bulkDeleteSchema.parse(body);

    // Fetch each record for audit trail — skip any that no longer exist
    const fetchedRecords = await Promise.all(ids.map((id) => getMedicalRecordById(id)));
    const foundRecords = fetchedRecords.filter(Boolean);
    const foundIds = foundRecords.map((r) => r!.id);

    if (foundIds.length === 0) {
      return NextResponse.json(
        { error: 'None of the specified records were found' },
        { status: 404 }
      );
    }

    // Log each deletion before executing (sequential to avoid pool exhaustion)
    for (const record of foundRecords) {
      await logAction(
        session.user.id!,
        'DELETE',
        'medical_records',
        record!.id,
        record,
        null,
        request
      );
    }

    // Single DELETE IN statement for efficiency
    await bulkDeleteMedicalRecords(foundIds);

    return NextResponse.json({
      message: `Deleted ${foundIds.length} record(s)`,
      deleted: foundIds.length,
      skipped: ids.length - foundIds.length,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error bulk deleting medical records:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
