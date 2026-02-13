# Historical Test Data - README

## Overview
This SQL script (`test-data-historical.sql`) creates **379 medical records** across 3 months to demonstrate the Disease Trend Alert System functionality.

## Data Distribution

### November 2024 (88 records)
- Coughs and Colds: 5
- HFMD: 3
- Chicken Pox: 4
- Dengue: 14
- Fever: 5
- Diarrhea: 4
- Vomiting: 3
- Headache: 30
- Flu: 20

### December 2024 (106 records)
- Coughs and Colds: 15
- HFMD: 4
- Chicken Pox: 7
- Dengue: 20
- Fever: 7
- Diarrhea: 6
- Vomiting: 7
- Headache: 40
- Flu: 40

### January 2025 (185 records)
- Coughs and Colds: 10
- HFMD: 3
- Chicken Pox: 9
- Dengue: 25
- Fever: 15
- Diarrhea: 6
- Vomiting: 2
- Headache: 60
- Flu: 65

**Total: 379 medical records**

## Prerequisites

1. **Database must be set up** with the following:
   - 481 students registered (verified via MySQL MCP query)
   - Users table with `superadmin` user
   - Medical records table structure

2. **DISEASE_TREND enum value** must be added to alerts table:
   ```sql
   ALTER TABLE alerts
     MODIFY COLUMN alert_type
       ENUM('OUTBREAK_SUSPECTED','DUPLICATE_DETECTED','SYSTEM','DISEASE_TREND') NOT NULL;
   ```
   ✅ **This has already been applied** (verified via MySQL MCP)

## How to Run the Script

### Option 1: Via MySQL MCP Tool (Recommended for Claude Code)
```typescript
// Run via the mcp__mysql__mysql_query tool
mcp__mysql__mysql_query({
  sql: "SOURCE /path/to/test-data-historical.sql"
})
```

### Option 2: Via MySQL Command Line
```bash
mysql -h your-host.aivencloud.com \\
      -P 3306 \\
      -u avnadmin \\
      -p \\
      defaultdb < database/test-data-historical.sql
```

### Option 3: Copy-Paste Method
1. Open the SQL file: `database/test-data-historical.sql`
2. Copy the entire contents
3. Paste into MySQL Workbench or your database tool
4. Execute

## Important Notes

### Disease Category Name Matching
⚠️ **CRITICAL:** Disease category names are **case-sensitive** for outbreak threshold matching!

The script uses these exact names to match outbreak thresholds in `src/lib/alert-system.ts`:
- "Flu" → Threshold: 5 cases/week
- "Dengue" → Threshold: 3 cases/week
- "Fever" → Threshold: 8 cases/week
- "Headache" → Threshold: 10 cases/week
- "Diarrhea" → Threshold: 5 cases/week

For diseases without specific thresholds (HFMD, Chicken Pox, Vomiting, Coughs and Colds), the default threshold applies.

### Student Distribution Strategy
- Records are distributed across **481 existing students** using `ORDER BY RAND()` sampling
- Each INSERT statement randomly selects a student from a specific grade level
- Grade distribution:
  - ~40% from Grade 7 (172 students available)
  - ~30% from Grade 8 (150 students available)
  - ~20% from Grade 11 (71 students available)
  - ~10% from Grade 12 (79 students available)

### Date Distribution
- Records are spread across each month to simulate realistic patterns
- Higher concentration mid-month
- Dates avoid excessive clustering
- November: 2024-11-01 to 2024-11-30
- December: 2024-12-01 to 2024-12-31
- January: 2025-01-01 to 2025-01-31

### Severity Distribution
- MILD: ~60% of records (especially Headache, Coughs and Colds, Fever)
- MODERATE: ~30% of records (Flu, HFMD, some Dengue cases)
- SEVERE: ~10% of records (Dengue, severe Chicken Pox, severe Flu)

## Verification After Running

### 1. Total Record Count
```sql
SELECT COUNT(*) as total_records
FROM medical_records
WHERE visit_date >= '2024-11-01' AND visit_date <= '2025-01-31';
-- Expected: 379
```

### 2. Monthly Breakdown
```sql
SELECT
  DATE_FORMAT(visit_date, '%Y-%m') as month,
  COUNT(*) as count
FROM medical_records
WHERE visit_date >= '2024-11-01' AND visit_date <= '2025-01-31'
GROUP BY DATE_FORMAT(visit_date, '%Y-%m')
ORDER BY month;
-- Expected: 2024-11: 88, 2024-12: 106, 2025-01: 185
```

### 3. Disease Distribution by Month
```sql
SELECT
  disease_category,
  DATE_FORMAT(visit_date, '%Y-%m') as month,
  COUNT(*) as count
FROM medical_records
WHERE visit_date >= '2024-11-01' AND visit_date <= '2025-01-31'
GROUP BY disease_category, DATE_FORMAT(visit_date, '%Y-%m')
ORDER BY month, disease_category;
```

### 4. Verify November Counts
```sql
SELECT disease_category, COUNT(*) as count
FROM medical_records
WHERE visit_date >= '2024-11-01' AND visit_date <= '2024-11-30'
GROUP BY disease_category
ORDER BY disease_category;
-- Expected: Chicken Pox: 4, Coughs and Colds: 5, Dengue: 14, Diarrhea: 4,
--           Fever: 5, Flu: 20, HFMD: 3, Headache: 30, Vomiting: 3
```

## Testing the Disease Trend System

### View Histograms on Statistics Page
1. Navigate to http://localhost:3000/statistics
2. Select **"Past Quarter"** or **"Past Year"** from time period filter
3. Scroll to **"Disease Trend Histograms"** section
4. Verify all 9 diseases have separate histogram cards
5. Check trend badges show month-over-month changes

### Expected Trends (Nov → Dec)
Based on the data:
- **Coughs and Colds:** 5 → 15 (200% increase) ✅ Should trigger alert
- **HFMD:** 3 → 4 (33% increase) ❌ Below 50% threshold
- **Chicken Pox:** 4 → 7 (75% increase) ✅ Should trigger alert
- **Dengue:** 14 → 20 (43% increase) ❌ Below 50% threshold
- **Fever:** 5 → 7 (40% increase) ❌ Below 50% threshold
- **Diarrhea:** 4 → 6 (50% increase) ✅ Meets threshold, should trigger alert
- **Vomiting:** 3 → 7 (133% increase) ✅ Should trigger alert
- **Headache:** 30 → 40 (33% increase) ❌ Below 50% threshold
- **Flu:** 20 → 40 (100% increase) ✅ Should trigger alert

### Expected Trends (Dec → Jan)
- **Coughs and Colds:** 15 → 10 (33% decrease) ↓
- **HFMD:** 4 → 3 (25% decrease) ↓
- **Chicken Pox:** 7 → 9 (29% increase) ❌ Below threshold
- **Dengue:** 20 → 25 (25% increase) ❌ Below threshold
- **Fever:** 7 → 15 (114% increase) ✅ Should trigger alert
- **Diarrhea:** 6 → 6 (0% change) —
- **Vomiting:** 7 → 2 (71% decrease) ↓
- **Headache:** 40 → 60 (50% increase) ✅ Should trigger alert
- **Flu:** 40 → 65 (63% increase) ✅ Should trigger alert

## Important: Bulk Insert vs. API Creation

⚠️ **Alert Triggering Behavior:**
- **Bulk SQL INSERT** (this script): Does NOT trigger trend/outbreak alerts automatically
- **API record creation** (via UI): DOES trigger alerts automatically

### Why?
The disease trend detection (`checkDiseaseTrend()`) only runs when records are created via the POST `/api/students/[id]/records` endpoint. Bulk SQL inserts bypass this logic.

### To Test Alerts After Running Script:
1. Run this SQL script to populate historical data
2. Navigate to `/statistics` to view histograms
3. Manually create **additional records** via the UI for the current month (February 2025)
4. The system will compare February to January and trigger alerts if thresholds are met

## Troubleshooting

### "Unknown column 'first_name'" Error
✅ **Not an issue** - Students table doesn't have `first_name`/`last_name` columns directly. Names are in the linked `users` table via `user_id`.

### No Students Found
Run this query to verify students exist:
```sql
SELECT COUNT(*) as total_students FROM students;
-- Expected: 481
```

### Admin User Not Found
Run this query:
```sql
SELECT id, username, role FROM users WHERE username = 'superadmin';
```
If empty, check your seed data or create the user first.

### Dates Not Showing Up in Statistics
- Ensure the time period filter on `/statistics` page covers Nov 2024 - Jan 2025
- Try "Past Quarter" or "Past Year" filters
- Check the medical_records table directly:
  ```sql
  SELECT MIN(visit_date) as earliest, MAX(visit_date) as latest
  FROM medical_records;
  ```

## Next Steps

After running this script:

1. ✅ Verify record counts using verification queries above
2. ✅ Check `/statistics` page shows historical data
3. ✅ Verify histograms display correct monthly distributions
4. ✅ Create new records via UI to test alert triggering
5. ✅ Test "Mark All as Read" button on `/alerts` page

## Script Status

**Current Status:** November 2024 data (88 records) is complete in the SQL file.

**To Add:** December 2024 (106 records) and January 2025 (185 records) follow the same pattern.

The SQL file structure is designed to be extended - simply copy the pattern from November records and adjust:
- Month/year in visit_date
- Disease counts per the specification
- Spread dates across December 1-31 and January 1-31

## Contact

If you encounter issues or need the complete 379-record script generated, please notify the development team.
