import mysql, { Pool, PoolConnection, RowDataPacket, ResultSetHeader } from 'mysql2/promise';

// Create connection pool with Aiven-compatible settings
const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5, // Aiven free tier limit
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection on startup (only in development)
if (process.env.NODE_ENV === 'development') {
  pool.getConnection()
    .then(connection => {
      console.log('Database connected successfully');
      connection.release();
    })
    .catch(err => {
      console.error('Database connection failed:', err.message);
    });
}

/**
 * Execute a query that returns multiple rows
 * @param sql - SQL query string with ? placeholders
 * @param params - Array of parameter values
 * @returns Array of results
 */
export async function query<T = RowDataPacket>(
  sql: string,
  params?: (string | number | boolean | Date | null)[]
): Promise<T[]> {
  try {
    // Filter out undefined values and log for debugging
    const cleanParams = params?.filter(p => p !== undefined);
    console.log('[DEBUG] Query params:', cleanParams);
    const [results] = await pool.execute<RowDataPacket[]>(sql, cleanParams);
    return results as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Execute a query that returns a single row
 * @param sql - SQL query string with ? placeholders
 * @param params - Array of parameter values
 * @returns Single result or null
 */
export async function queryOne<T = RowDataPacket>(
  sql: string,
  params?: (string | number | boolean | Date | null)[]
): Promise<T | null> {
  const results = await query<T>(sql, params);
  return results.length > 0 ? results[0] : null;
}

/**
 * Execute an INSERT, UPDATE, or DELETE query
 * @param sql - SQL query string with ? placeholders
 * @param params - Array of parameter values
 * @returns ResultSetHeader with affectedRows, insertId, etc.
 */
export async function execute(
  sql: string,
  params?: (string | number | boolean | Date | null)[]
): Promise<ResultSetHeader> {
  try {
    // Filter out undefined values and log for debugging
    const cleanParams = params?.filter(p => p !== undefined);
    console.log('[DEBUG] Execute params:', cleanParams);
    const [result] = await pool.execute<ResultSetHeader>(sql, cleanParams);
    return result;
  } catch (error) {
    console.error('Database execute error:', error);
    throw error;
  }
}

/**
 * Execute multiple queries in a transaction
 * Automatically commits on success, rolls back on error
 * @param callback - Function that receives the connection and executes queries
 * @returns Result from the callback
 */
export async function transaction<T>(
  callback: (connection: PoolConnection) => Promise<T>
): Promise<T> {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

/**
 * Get the connection pool for advanced operations
 */
export function getPool(): Pool {
  return pool;
}

export default pool;
