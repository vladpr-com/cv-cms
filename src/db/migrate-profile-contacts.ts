/**
 * One-time migration: add contact columns to existing profile tables.
 * Run with: npx dotenv -e .env.local -- npx tsx src/db/migrate-profile-contacts.ts
 */
import { createClient } from '@libsql/client/web';

const COLUMNS = ['email', 'phone', 'location', 'linkedin', 'github', 'website', 'telegram'];

async function addColumns(url: string, authToken?: string) {
  const client = createClient({ url, authToken });
  for (const col of COLUMNS) {
    try {
      await client.execute(`ALTER TABLE \`profile\` ADD COLUMN \`${col}\` text`);
      console.log(`  + Added column: ${col}`);
    } catch {
      console.log(`  - Column already exists: ${col}`);
    }
  }
}

async function main() {
  // 1. Migrate owner DB
  const ownerUrl = process.env.TURSO_DATABASE_URL;
  const ownerToken = process.env.TURSO_AUTH_TOKEN;
  if (ownerUrl) {
    console.log(`\nMigrating owner DB: ${ownerUrl}`);
    await addColumns(ownerUrl, ownerToken);
  }

  // 2. Migrate all user DBs
  const adminUrl = process.env.TURSO_ADMIN_DB_URL;
  const adminToken = process.env.TURSO_ADMIN_DB_TOKEN;
  if (adminUrl) {
    console.log(`\nQuerying admin DB for user databases...`);
    const adminClient = createClient({ url: adminUrl, authToken: adminToken });
    const result = await adminClient.execute(
      `SELECT turso_db_url, turso_auth_token FROM user_databases WHERE status = 'ready'`
    );
    console.log(`Found ${result.rows.length} user database(s)`);

    for (const row of result.rows) {
      const dbUrl = row.turso_db_url as string;
      const dbToken = row.turso_auth_token as string;
      console.log(`\nMigrating user DB: ${dbUrl}`);
      await addColumns(dbUrl, dbToken);
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
