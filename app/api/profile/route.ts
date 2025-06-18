import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db/client';
import { user } from '@/lib/db/schema';

export async function GET() {
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [userInfo] = await db.select().from(user).where(eq(user.email, session.user.email));
  if (!userInfo) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { password, ...userWithoutPassword } = userInfo;
  return NextResponse.json(userWithoutPassword, { status: 200 });
}
