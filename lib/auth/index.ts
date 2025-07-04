import { compare } from 'bcrypt-ts';
import { eq } from 'drizzle-orm';
import NextAuth, { type Session, type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { db } from '@/lib/db/client';
import { userTable } from '@/lib/db/schema';

import { authConfig } from './config';

interface ExtendedSession extends Session {
  user: User;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        const [user] = await db.select().from(userTable).where(eq(userTable.email, email));
        if (!user) return null;
        const passwordsMatch = await compare(password, user.password!);
        if (!passwordsMatch) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }: { session: ExtendedSession; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
