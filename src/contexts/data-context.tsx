'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useSession } from 'next-auth/react';
import type { DataLayer } from '@/lib/data-layer/types';

type DataMode = 'anonymous' | 'authenticated';

interface DataContextValue {
  dataLayer: DataLayer | null;
  mode: DataMode;
  isReady: boolean;
}

const DataContext = createContext<DataContextValue>({
  dataLayer: null,
  mode: 'anonymous',
  isReady: false,
});

const authEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true';

export function DataProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [contextValue, setContextValue] = useState<DataContextValue>({
    dataLayer: null,
    mode: 'anonymous',
    isReady: false,
  });

  useEffect(() => {
    async function init() {
      if (authEnabled && status === 'loading') return;

      if (authEnabled && status === 'authenticated' && session?.user) {
        const { ServerActionProxy } = await import(
          '@/lib/data-layer/server-action-proxy'
        );
        setContextValue({
          dataLayer: new ServerActionProxy(),
          mode: 'authenticated',
          isReady: true,
        });
      } else {
        const { ClientDataLayer } = await import(
          '@/lib/data-layer/client-data-layer'
        );
        setContextValue({
          dataLayer: new ClientDataLayer(),
          mode: 'anonymous',
          isReady: true,
        });
      }
    }

    init();
  }, [status, session]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataLayer(): DataContextValue & { dataLayer: DataLayer } {
  const ctx = useContext(DataContext);
  if (!ctx.isReady || !ctx.dataLayer) {
    // Return a typed stub that consumers can check via isReady
    return ctx as any;
  }
  return ctx as DataContextValue & { dataLayer: DataLayer };
}
