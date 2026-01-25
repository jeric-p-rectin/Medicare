/**
 * Database Setup Script
 * Executes schema.sql, seed.sql, and test-data.sql on Aiven MySQL
 *
 * Usage: node database/setup-database.js
 */

const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

// Read database config from environment
require('dotenv').config({ path: path.join(__dirname, '..', 'medicare-app', '.env.local') });

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true
  },
  multipleStatements: true // Required to execute multiple SQL statements
};

async function executeSQLFile(connection, filename) {
  console.log(`\n📄 Executing ${filename}...`);

  try {
    const filePath = path.join(__dirname, filename);
    const sql = await fs.readFile(filePath, 'utf8');

    // Split by semicolons but keep them, filter out comments
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement + ';');
      }
    }

    console.log(`✅ ${filename} executed successfully`);
  } catch (error) {
    console.error(`❌ Error executing ${filename}:`, error.message);
    throw error;
  }
}

async function setupDatabase() {
  console.log('🏥 MEDICARE Database Setup\n');
  console.log('Connecting to database...');

  let connection;

  try {
    // Create connection
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to database\n');

    // Execute SQL files in order
    console.log('Setting up database schema and data...\n');

    // 1. Schema (creates tables)
    await executeSQLFile(connection, 'schema.sql');

    // 2. Seed data (sections and super admin)
    await executeSQLFile(connection, 'seed.sql');

    // 3. Test data (sample students and medical records)
    const testDataPath = path.join(__dirname, 'test-data.sql');
    const testDataExists = await fs.access(testDataPath).then(() => true).catch(() => false);

    if (testDataExists) {
      console.log('\n📊 Found test-data.sql. Do you want to load test data?');
      console.log('(This will add 10 sample students and 7 medical records)');

      // For now, automatically load test data
      await executeSQLFile(connection, 'test-data.sql');
    }

    // 4. Test PATIENT accounts (for patient portal testing)
    const testPatientPath = path.join(__dirname, 'create-test-patient.sql');
    const testPatientExists = await fs.access(testPatientPath).then(() => true).catch(() => false);

    if (testPatientExists) {
      console.log('\n👤 Found create-test-patient.sql. Do you want to create test PATIENT accounts?');
      console.log('(This will add 2 test PATIENT users for testing the Patient Portal)');
      console.log('  • patient1 / patient123 (Grade 10, with medical records)');
      console.log('  • patient2 / patient123 (Grade 12, no medical records)');

      // For now, automatically create test patients
      await executeSQLFile(connection, 'create-test-patient.sql');
    }

    // Verify setup
    console.log('\n📋 Verifying setup...\n');

    const [sections] = await connection.query('SELECT COUNT(*) as count FROM sections');
    console.log(`   Sections: ${sections[0].count} (expected: 24)`);

    const [users] = await connection.query('SELECT COUNT(*) as count FROM users');
    console.log(`   Users: ${users[0].count}`);

    const [students] = await connection.query('SELECT COUNT(*) as count FROM students');
    console.log(`   Students: ${students[0].count}`);

    const [records] = await connection.query('SELECT COUNT(*) as count FROM medical_records');
    console.log(`   Medical Records: ${records[0].count}`);

    console.log('\n✨ Database setup complete!\n');
    console.log('You can now:');
    console.log('1. Login as SUPER_ADMIN with username: superadmin, password: admin123');
    console.log('   - Access: /dashboard, /patients, /registration, /statistics, /alerts');
    console.log('\n2. Login as PATIENT with:');
    console.log('   - patient1 / patient123 (Grade 10, has 2 medical records)');
    console.log('   - patient2 / patient123 (Grade 12, no medical records)');
    console.log('   - Access: /patient-portal');
    console.log('\n3. View students in the /patients page');
    console.log('4. Register new students via /registration');
    console.log('5. View statistics in /statistics dashboard');
    console.log('6. Test patient portal at http://localhost:3000/patient-portal\n');

  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    console.error('\nPlease check:');
    console.error('1. Your .env.local file has correct database credentials');
    console.error('2. Your database connection is working');
    console.error('3. The SQL files are in the database/ directory\n');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Disconnected from database');
    }
  }
}

// Run setup
setupDatabase();
