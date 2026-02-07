# Database Migrations

This folder contains SQL migration scripts for the MEDICARE application.

## How to Run Migrations

### Manual Execution via MCP (MySQL Client)

1. **Connect to your database** using the MCP tool or MySQL command line:
   ```bash
   mysql -h <aiven-host>.aivencloud.com -P 3306 -u avnadmin -p --ssl-mode=REQUIRED
   ```

2. **Select the database**:
   ```sql
   USE defaultdb;
   ```

3. **Run the migration script**:
   ```sql
   SOURCE /path/to/001-add-disease-trend-alert-type.sql;
   ```

   Or execute the ALTER statement directly:
   ```sql
   ALTER TABLE alerts
     MODIFY COLUMN alert_type
       ENUM('OUTBREAK_SUSPECTED', 'DUPLICATE_DETECTED', 'SYSTEM', 'DISEASE_TREND')
       NOT NULL;
   ```

4. **Verify the change**:
   ```sql
   SELECT COLUMN_TYPE
   FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_NAME = 'alerts'
     AND COLUMN_NAME = 'alert_type';
   ```

   Expected output:
   ```
   enum('OUTBREAK_SUSPECTED','DUPLICATE_DETECTED','SYSTEM','DISEASE_TREND')
   ```

## Migration List

| # | File | Description | Date |
|---|------|-------------|------|
| 001 | 001-add-disease-trend-alert-type.sql | Add DISEASE_TREND to alert_type enum | 2026-02-06 |

## Important Notes

- **Always backup your database before running migrations**
- Migrations should be run in order (001, 002, 003, etc.)
- The DISEASE_TREND alert type is required for the disease trend detection feature to work
- After running the migration, restart the Next.js development server to ensure TypeScript types are up to date
