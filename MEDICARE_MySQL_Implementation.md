# MEDICARE - MySQL Implementation Guide
## Query Helpers & API Examples (No ORM)

This document contains the MySQL query functions and updated API implementations for the MEDICARE system using raw SQL queries with mysql2.

---

## 📁 Query Helper Files

### User Queries (`src/lib/queries/users.ts`)

```typescript
import { query, queryOne } from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface User extends RowDataPacket {
  id: string;
  username: string;
  email?: string;
  password: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'PATIENT';
  first_name: string;
  last_name: string;
  middle_name?: string;
  is_active: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

export async function findUserByUsername(username: string): Promise<User | null> {
  const sql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
  return queryOne<User>(sql, [username]);
}

export async function findUserById(id: string): Promise<User | null> {
  const sql = 'SELECT * FROM users WHERE id = ? LIMIT 1';
  return queryOne<User>(sql, [id]);
}

export async function createUser(data: {
  username: string;
  email?: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  middleName?: string;
}): Promise<string> {
  const sql = `
    INSERT INTO users (id, username, email, password, role, first_name, last_name, middle_name)
    VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const result = await query<ResultSetHeader>(sql, [
    data.username,
    data.email || null,
    data.password,
    data.role,
    data.firstName,
    data.lastName,
    data.middleName || null
  ]);

  // Get the last inserted ID
  const lastIdSql = 'SELECT id FROM users WHERE username = ? LIMIT 1';
  const user = await queryOne<{ id: string }>(lastIdSql, [data.username]);
  
  return user!.id;
}

export async function updateUserLastLogin(userId: string): Promise<void> {
  const sql = 'UPDATE users SET last_login = NOW() WHERE id = ?';
  await query(sql, [userId]);
}

export async function getAllUsers(role?: string): Promise<User[]> {
  let sql = 'SELECT * FROM users WHERE 1=1';
  const params: any[] = [];
  
  if (role) {
    sql += ' AND role = ?';
    params.push(role);
  }
  
  sql += ' ORDER BY created_at DESC';
  
  return query<User>(sql, params);
}
```

---

### Patient Queries (`src/lib/queries/patients.ts`)

```typescript
import { query, queryOne, transaction } from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { createUser } from './users';

export interface Patient extends RowDataPacket {
  id: string;
  user_id: string;
  date_of_birth: Date;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  civil_status?: string;
  phone_number: string;
  address: string;
  barangay: string;
  city: string;
  province: string;
  zip_code: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relation?: string;
  blood_type?: string;
  height?: number;
  weight?: number;
  allergies?: string;
  is_pwd: boolean;
  pwd_id_number?: string;
  is_senior: boolean;
  senior_id_number?: string;
  is_pregnant: boolean;
  expected_due_date?: Date;
  patient_number: string;
  category: string; // JSON string
  created_by_id: string;
  updated_by_id?: string;
  created_at: Date;
  updated_at: Date;
  
  // Joined user data
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  email?: string;
  username?: string;
}

export async function findPatients(options: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{ patients: Patient[]; total: number }> {
  const { page = 1, limit = 10, search = '' } = options;
  const offset = (page - 1) * limit;

  let whereSql = '';
  const params: any[] = [];

  if (search) {
    whereSql = `
      WHERE p.patient_number LIKE ? 
      OR u.first_name LIKE ? 
      OR u.last_name LIKE ?
    `;
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }

  const sql = `
    SELECT 
      p.*,
      u.first_name,
      u.last_name,
      u.middle_name,
      u.email,
      u.username
    FROM patients p
    JOIN users u ON p.user_id = u.id
    ${whereSql}
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `;

  const countSql = `
    SELECT COUNT(*) as total
    FROM patients p
    JOIN users u ON p.user_id = u.id
    ${whereSql}
  `;

  const patients = await query<Patient>(sql, [...params, limit, offset]);
  const countResult = await queryOne<{ total: number }>(countSql, params);

  return {
    patients,
    total: countResult?.total || 0
  };
}

export async function findPatientById(id: string): Promise<Patient | null> {
  const sql = `
    SELECT 
      p.*,
      u.first_name,
      u.last_name,
      u.middle_name,
      u.email,
      u.username
    FROM patients p
    JOIN users u ON p.user_id = u.id
    WHERE p.id = ?
    LIMIT 1
  `;
  return queryOne<Patient>(sql, [id]);
}

export async function createPatient(data: {
  // User data
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email?: string;
  
  // Patient data
  dateOfBirth: Date;
  age: number;
  gender: string;
  civilStatus?: string;
  phoneNumber: string;
  address: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  bloodType?: string;
  height?: number;
  weight?: number;
  allergies?: string;
  isPWD: boolean;
  pwdIdNumber?: string;
  isSenior: boolean;
  seniorIdNumber?: string;
  isPregnant: boolean;
  expectedDueDate?: Date;
  patientNumber: string;
  category: string[]; // Will be converted to JSON
  createdById: string;
}): Promise<string> {
  return transaction(async (connection) => {
    // Create user
    const [userResult] = await connection.execute<ResultSetHeader>(
      `INSERT INTO users (id, username, email, password, role, first_name, last_name, middle_name)
       VALUES (UUID(), ?, ?, ?, 'PATIENT', ?, ?, ?)`,
      [
        data.username,
        data.email || null,
        data.password,
        data.firstName,
        data.lastName,
        data.middleName || null
      ]
    );

    // Get user ID
    const [userRows] = await connection.execute<RowDataPacket[]>(
      'SELECT id FROM users WHERE username = ? LIMIT 1',
      [data.username]
    );
    const userId = userRows[0].id;

    // Create patient
    const [patientResult] = await connection.execute<ResultSetHeader>(
      `INSERT INTO patients (
        id, user_id, date_of_birth, age, gender, civil_status,
        phone_number, address, barangay, city, province, zip_code,
        emergency_contact_name, emergency_contact_phone, emergency_contact_relation,
        blood_type, height, weight, allergies,
        is_pwd, pwd_id_number, is_senior, senior_id_number,
        is_pregnant, expected_due_date,
        patient_number, category, created_by_id
      ) VALUES (
        UUID(), ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?,
        ?, ?, ?
      )`,
      [
        userId,
        data.dateOfBirth,
        data.age,
        data.gender,
        data.civilStatus || null,
        data.phoneNumber,
        data.address,
        data.barangay,
        data.city,
        data.province,
        data.zipCode,
        data.emergencyContactName || null,
        data.emergencyContactPhone || null,
        data.emergencyContactRelation || null,
        data.bloodType || null,
        data.height || null,
        data.weight || null,
        data.allergies || null,
        data.isPWD,
        data.pwdIdNumber || null,
        data.isSenior,
        data.seniorIdNumber || null,
        data.isPregnant,
        data.expectedDueDate || null,
        data.patientNumber,
        JSON.stringify(data.category),
        data.createdById
      ]
    );

    // Get patient ID
    const [patientRows] = await connection.execute<RowDataPacket[]>(
      'SELECT id FROM patients WHERE patient_number = ? LIMIT 1',
      [data.patientNumber]
    );

    return patientRows[0].id;
  });
}

export async function checkDuplicatePatient(
  firstName: string,
  lastName: string,
  dateOfBirth: Date
): Promise<Patient[]> {
  const sql = `
    SELECT 
      p.*,
      u.first_name,
      u.last_name,
      u.middle_name
    FROM patients p
    JOIN users u ON p.user_id = u.id
    WHERE u.first_name = ?
    AND u.last_name = ?
    AND p.date_of_birth = ?
  `;
  
  return query<Patient>(sql, [firstName, lastName, dateOfBirth]);
}
```

---

### Statistics Queries (`src/lib/queries/statistics.ts`)

```typescript
import { query, queryOne } from '../db';
import { RowDataPacket } from 'mysql2';

export interface DashboardStats {
  totalPatients: number;
  infantCount: number;
  minorCount: number;
  adultCount: number;
  seniorCount: number;
  pwdCount: number;
  pregnantCount: number;
  todayAppointments: number;
  lowStockItems: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Get total patients
  const totalResult = await queryOne<{ total: number }>(
    'SELECT COUNT(*) as total FROM patients'
  );

  // Get all patients to count categories (since category is JSON)
  const allPatients = await query<{ category: string; is_pwd: boolean; is_pregnant: boolean }>(
    'SELECT category, is_pwd, is_pregnant FROM patients'
  );

  // Count categories
  let infantCount = 0;
  let minorCount = 0;
  let adultCount = 0;
  let seniorCount = 0;
  let pwdCount = 0;
  let pregnantCount = 0;

  allPatients.forEach(patient => {
    const categories = JSON.parse(patient.category);
    if (categories.includes('INFANT')) infantCount++;
    if (categories.includes('MINOR')) minorCount++;
    if (categories.includes('ADULT')) adultCount++;
    if (categories.includes('SENIOR')) seniorCount++;
    if (patient.is_pwd) pwdCount++;
    if (patient.is_pregnant) pregnantCount++;
  });

  // Get today's appointments
  const appointmentsResult = await queryOne<{ count: number }>(
    `SELECT COUNT(*) as count 
     FROM appointments 
     WHERE appointment_date >= ? 
     AND appointment_date < ? 
     AND status = 'SCHEDULED'`,
    [today, tomorrow]
  );

  // Get low stock items
  const lowStockMedicines = await queryOne<{ count: number }>(
    `SELECT COUNT(*) as count 
     FROM medicines 
     WHERE stock_status IN ('LOW_STOCK', 'OUT_OF_STOCK')`
  );

  const lowStockVaccines = await queryOne<{ count: number }>(
    `SELECT COUNT(*) as count 
     FROM vaccines 
     WHERE stock_status IN ('LOW_STOCK', 'OUT_OF_STOCK')`
  );

  return {
    totalPatients: totalResult?.total || 0,
    infantCount,
    minorCount,
    adultCount,
    seniorCount,
    pwdCount,
    pregnantCount,
    todayAppointments: appointmentsResult?.count || 0,
    lowStockItems: (lowStockMedicines?.count || 0) + (lowStockVaccines?.count || 0)
  };
}
```

---

### Inventory Queries (`src/lib/queries/inventory.ts`)

```typescript
import { query, queryOne } from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Medicine extends RowDataPacket {
  id: string;
  name: string;
  generic_name?: string;
  brand_name?: string;
  description?: string;
  category: string;
  dosage_form: string;
  strength: string;
  stock_quantity: number;
  unit_of_measure: string;
  reorder_level: number;
  stock_status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'EXPIRED';
  expiry_date?: Date;
  supplier?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export async function getAllMedicines(filters?: {
  category?: string;
  stockStatus?: string;
}): Promise<Medicine[]> {
  let sql = 'SELECT * FROM medicines WHERE is_active = TRUE';
  const params: any[] = [];

  if (filters?.category) {
    sql += ' AND category = ?';
    params.push(filters.category);
  }

  if (filters?.stockStatus) {
    sql += ' AND stock_status = ?';
    params.push(filters.stockStatus);
  }

  sql += ' ORDER BY name ASC';

  return query<Medicine>(sql, params);
}

export async function updateMedicineStock(
  medicineId: string,
  quantity: number,
  performedById: string,
  transactionType: 'IN' | 'OUT' | 'ADJUSTMENT' | 'EXPIRED',
  reason?: string
): Promise<void> {
  return transaction(async (connection) => {
    // Update stock
    const operator = transactionType === 'IN' ? '+' : '-';
    await connection.execute(
      `UPDATE medicines 
       SET stock_quantity = stock_quantity ${operator} ?,
           stock_status = CASE
             WHEN stock_quantity ${operator} ? = 0 THEN 'OUT_OF_STOCK'
             WHEN stock_quantity ${operator} ? <= reorder_level THEN 'LOW_STOCK'
             ELSE 'IN_STOCK'
           END
       WHERE id = ?`,
      [quantity, quantity, quantity, medicineId]
    );

    // Log transaction
    await connection.execute(
      `INSERT INTO inventory_transactions 
       (id, item_type, medicine_id, transaction_type, quantity, reason, performed_by_id)
       VALUES (UUID(), 'MEDICINE', ?, ?, ?, ?, ?)`,
      [medicineId, transactionType, quantity, reason || null, performedById]
    );
  });
}

export async function checkExpiringMedicines(daysThreshold: number = 30): Promise<Medicine[]> {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + daysThreshold);

  const sql = `
    SELECT * FROM medicines
    WHERE expiry_date IS NOT NULL
    AND expiry_date <= ?
    AND expiry_date >= CURDATE()
    AND is_active = TRUE
    ORDER BY expiry_date ASC
  `;

  return query<Medicine>(sql, [futureDate]);
}
```

---

## 🔄 Updated API Route Examples

### Patient API (`src/app/api/patients/route.ts`)

```typescript
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { findPatients, createPatient, checkDuplicatePatient } from '@/lib/queries/patients';
import { patientSchema } from '@/lib/validations/patient';
import bcrypt from 'bcryptjs';
import { calculateAge, determinePatientCategories, generatePatientNumber } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const { patients, total } = await findPatients({ page, limit, search });

    return NextResponse.json({
      patients,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user || session.user.role === 'PATIENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = patientSchema.parse(body);

    // Check for duplicate
    const duplicates = await checkDuplicatePatient(
      validatedData.firstName,
      validatedData.lastName,
      validatedData.dateOfBirth
    );

    if (duplicates.length > 0) {
      return NextResponse.json(
        { error: 'Potential duplicate patient found', duplicates },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password || 'patient123', 10);

    // Calculate age and categories
    const age = calculateAge(validatedData.dateOfBirth);
    const categories = determinePatientCategories(
      age,
      validatedData.isPWD,
      validatedData.isPregnant
    );

    // Create patient
    const patientId = await createPatient({
      username: validatedData.username,
      password: hashedPassword,
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      middleName: validatedData.middleName,
      dateOfBirth: validatedData.dateOfBirth,
      age,
      gender: validatedData.gender,
      civilStatus: validatedData.civilStatus,
      phoneNumber: validatedData.phoneNumber,
      address: validatedData.address,
      barangay: validatedData.barangay,
      city: validatedData.city,
      province: validatedData.province,
      zipCode: validatedData.zipCode,
      emergencyContactName: validatedData.emergencyContactName,
      emergencyContactPhone: validatedData.emergencyContactPhone,
      emergencyContactRelation: validatedData.emergencyContactRelation,
      bloodType: validatedData.bloodType,
      height: validatedData.height,
      weight: validatedData.weight,
      allergies: validatedData.allergies,
      isPWD: validatedData.isPWD,
      pwdIdNumber: validatedData.pwdIdNumber,
      isSenior: validatedData.isSenior,
      seniorIdNumber: validatedData.seniorIdNumber,
      isPregnant: validatedData.isPregnant,
      expectedDueDate: validatedData.expectedDueDate,
      patientNumber: generatePatientNumber(),
      category: categories,
      createdById: session.user.id,
    });

    return NextResponse.json({ id: patientId }, { status: 201 });
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Dashboard Statistics API (`src/app/api/statistics/dashboard/route.ts`)

```typescript
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDashboardStats } from '@/lib/queries/statistics';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getDashboardStats();

    return NextResponse.json({
      totalPatients: stats.totalPatients,
      categoryBreakdown: {
        infant: stats.infantCount,
        minor: stats.minorCount,
        adult: stats.adultCount,
        senior: stats.seniorCount,
        pwd: stats.pwdCount,
        pregnant: stats.pregnantCount,
      },
      todayAppointments: stats.todayAppointments,
      lowStockItems: stats.lowStockItems,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

---

## 🔐 Updated Authentication

The authentication setup remains mostly the same, but update `src/lib/auth.ts` to use the query functions:

```typescript
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { findUserByUsername, updateUserLastLogin } from './queries/users';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await findUserByUsername(credentials.username as string);

        if (!user || !user.is_active) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValidPassword) {
          return null;
        }

        // Update last login
        await updateUserLastLogin(user.id);

        return {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});
```

---

## 💡 Additional Helper Queries

You'll need to create similar query files for:
- `medical-records.ts`
- `prescriptions.ts`
- `appointments.ts`
- `vaccinations.ts`
- `disease-trends.ts`

Follow the same pattern as the examples above:
1. Define TypeScript interfaces
2. Create query functions
3. Use prepared statements with `?` placeholders
4. Handle transactions when needed
5. Return proper types

---

## 🎯 Key Differences from Prisma

1. **Manual SQL**: You write all SQL queries yourself
2. **Type Safety**: Use TypeScript interfaces with `RowDataPacket`
3. **Transactions**: Use the transaction helper function
4. **No Migrations**: Manually create and run SQL migration scripts
5. **JSON Handling**: Parse/stringify JSON fields manually
6. **Connection Pool**: Manage connections explicitly

---

## ⚠️ Important Notes

1. Always use prepared statements (`?` placeholders) to prevent SQL injection
2. Handle NULL values explicitly in SQL
3. Convert between JavaScript camelCase and SQL snake_case
4. Parse JSON fields when reading from database
5. Stringify arrays/objects when writing to JSON columns
6. Use transactions for multi-table operations
7. Close connections properly (handled by pool)
8. Test queries thoroughly before deployment

---

This implementation provides the same functionality as Prisma but with direct SQL control and better understanding of database operations.
