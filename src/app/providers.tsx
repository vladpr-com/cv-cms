'use client';

import { SessionProvider } from 'next-auth/react';
import { DataProvider } from '@/contexts/data-context';
import { MigrationHandler } from '@/components/auth/migration-handler';

const authEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DataProvider>
        {authEnabled && <MigrationHandler />}
        {children}
      </DataProvider>
    </SessionProvider>
  );
}
