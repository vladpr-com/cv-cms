/** Returns true if auth environment variables are configured */
export function isAuthEnabled(): boolean {
  return !!process.env.TURSO_ADMIN_DB_URL;
}
