import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { query } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

/**
 * GET /api/disease-categories
 * Fetch distinct disease categories and illness types from medical records
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch distinct disease categories
    const categoriesResult = await query<{ disease_category: string } & RowDataPacket>(
      `SELECT DISTINCT disease_category
       FROM medical_records
       WHERE disease_category IS NOT NULL
       ORDER BY disease_category ASC`
    );

    // Fetch distinct illness types
    const typesResult = await query<{ illness_type: string } & RowDataPacket>(
      `SELECT DISTINCT illness_type
       FROM medical_records
       WHERE illness_type IS NOT NULL
       ORDER BY illness_type ASC`
    );

    const categories = categoriesResult.map(row => row.disease_category);
    const illnessTypes = typesResult.map(row => row.illness_type);

    return NextResponse.json({
      categories,
      illnessTypes
    });
  } catch (error) {
    console.error('Error fetching disease categories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
