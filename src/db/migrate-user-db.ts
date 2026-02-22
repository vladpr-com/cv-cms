/**
 * Migrate user database schema.
 * Runs the jobs + highlights table creation SQL against a new user DB.
 */
import { createClient } from '@libsql/client/web';

// Embedded schema SQL (from drizzle/0000_panoramic_talon.sql)
const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS \`highlights\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`job_id\` text,
	\`type\` text NOT NULL,
	\`title\` text NOT NULL,
	\`content\` text NOT NULL,
	\`start_date\` text NOT NULL,
	\`end_date\` text,
	\`domains\` text DEFAULT '[]' NOT NULL,
	\`skills\` text DEFAULT '[]' NOT NULL,
	\`keywords\` text DEFAULT '[]' NOT NULL,
	\`metrics\` text DEFAULT '[]' NOT NULL,
	\`is_hidden\` integer DEFAULT false NOT NULL,
	\`created_at\` text NOT NULL,
	\`updated_at\` text NOT NULL,
	FOREIGN KEY (\`job_id\`) REFERENCES \`jobs\`(\`id\`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`jobs\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`company\` text NOT NULL,
	\`role\` text NOT NULL,
	\`start_date\` text NOT NULL,
	\`end_date\` text,
	\`logo_url\` text,
	\`website\` text,
	\`created_at\` text NOT NULL,
	\`updated_at\` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`profile\` (
	\`id\` text PRIMARY KEY NOT NULL DEFAULT 'default',
	\`full_name\` text DEFAULT '' NOT NULL,
	\`email\` text,
	\`phone\` text,
	\`location\` text,
	\`linkedin\` text,
	\`github\` text,
	\`website\` text,
	\`telegram\` text,
	\`updated_at\` text NOT NULL
);
`;

// ALTER TABLE statements for existing databases that already have the profile table
const PROFILE_CONTACT_COLUMNS_SQL = `
ALTER TABLE \`profile\` ADD COLUMN \`email\` text;
--> statement-breakpoint
ALTER TABLE \`profile\` ADD COLUMN \`phone\` text;
--> statement-breakpoint
ALTER TABLE \`profile\` ADD COLUMN \`location\` text;
--> statement-breakpoint
ALTER TABLE \`profile\` ADD COLUMN \`linkedin\` text;
--> statement-breakpoint
ALTER TABLE \`profile\` ADD COLUMN \`github\` text;
--> statement-breakpoint
ALTER TABLE \`profile\` ADD COLUMN \`website\` text;
--> statement-breakpoint
ALTER TABLE \`profile\` ADD COLUMN \`telegram\` text;
`;

/**
 * Apply the user DB schema to a fresh Turso database.
 */
export async function migrateUserDbSchema(dbUrl: string, authToken: string): Promise<void> {
  const client = createClient({ url: dbUrl, authToken });

  // Split on statement-breakpoint and run each statement
  const statements = SCHEMA_SQL
    .split('--> statement-breakpoint')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    await client.execute(statement);
  }

  // Run ALTER TABLE for contact columns on existing DBs (safe to fail if columns already exist)
  const alterStatements = PROFILE_CONTACT_COLUMNS_SQL
    .split('--> statement-breakpoint')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of alterStatements) {
    try {
      await client.execute(statement);
    } catch {
      // Column already exists — ignore
    }
  }
}
