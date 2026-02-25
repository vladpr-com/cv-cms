import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from './admin-schema';
import { getAdminDb } from '@/db/admin';
import { isAuthEnabled } from '@/lib/auth-config';

function createAuth() {
  if (!isAuthEnabled()) {
    const stubHandler = async () =>
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    return {
      handlers: { GET: stubHandler, POST: stubHandler },
      auth: (async () => null) as any,
      signIn: (async () => {}) as any,
      signOut: (async () => {}) as any,
    };
  }

  const adminDb = getAdminDb();

  return NextAuth({
    adapter: DrizzleAdapter(adminDb, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }),
    providers: [GitHub, Google],
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      jwt({ token, user }) {
        if (user?.id) {
          token.userId = user.id;
        }
        return token;
      },
      session({ session, token }) {
        if (token.userId && session.user) {
          session.user.id = token.userId as string;
        }
        return session;
      },
    },
  });
}

let _instance: ReturnType<typeof createAuth> | null = null;

function getInstance() {
  if (!_instance) {
    _instance = createAuth();
  }
  return _instance;
}

export function auth(...args: any[]) {
  const instance = getInstance();
  return args.length > 0 ? instance.auth(...(args as [any])) : instance.auth();
}

export function signIn(...args: any[]) {
  const instance = getInstance();
  return args.length > 0 ? instance.signIn(...(args as [any])) : instance.signIn();
}

export function signOut(...args: any[]) {
  const instance = getInstance();
  return args.length > 0 ? instance.signOut(...(args as [any])) : instance.signOut();
}

export const handlers = {
  GET: (req: any) => getInstance().handlers.GET(req),
  POST: (req: any) => getInstance().handlers.POST(req),
};
