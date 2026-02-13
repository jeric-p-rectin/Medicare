/**
 * Execute large SQL files via MySQL connection
 */
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function executeSQLFile(connection, filePath) {
  console.log(`\nExecuting: ${path.basename(filePath)}`);
  const sql = fs.readFileSync(filePath, 'utf8');

  // Split by semicolons but handle edge cases
  const statements = sql
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

  console.log(`Found ${statements.length} SQL statements`);

  let executed = 0;
  for (const statement of statements) {
    try {
      await connection.query(statement);
      executed++;
      if (executed % 20 === 0) {
        console.log(`  Executed ${executed}/${statements.length} statements...`);
      }
    } catch (error) {
      console.error(`Error executing statement ${executed + 1}:`, error.message);
      console.error('Statement:', statement.substring(0, 100) + '...');
      throw error;
    }
  }

  console.log(`✅ Successfully executed all ${executed} statements`);
  return executed;
}

async function main() {
  const connection = await mysql.createConnection({
    host: 'mysql-172c0820-richill-rectin-93b9.f.aivencloud.com',
    port: 3306,
    user: 'avnadmin',
    password: 'AVNS_X9R9d2vGVZV8EvFUSkW',
    database: 'defaultdb',
    ssl: { rejectUnauthorized: true }
  });

  console.log('Connected to MySQL database');

  try {
    // Execute December 2025 SQL
    await executeSQLFile(connection, './december-2025-complete.sql');

    // Execute January 2026 SQL
    await executeSQLFile(connection, './january-2026-complete.sql');

    // Verify final count
    const [rows] = await connection.query(
      "SELECT COUNT(*) as total FROM medical_records WHERE visit_date >= '2025-11-01'"
    );
    console.log(`\n🎉 Complete! Total records: ${rows[0].total}`);
    console.log('Expected: 379 (88 + 106 + 185)');

  } finally {
    await connection.end();
    console.log('\nDatabase connection closed');
  }
}

main().catch(console.error);
