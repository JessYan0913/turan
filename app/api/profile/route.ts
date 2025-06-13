import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';

export async function GET() {
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const users = await getUser(session.user.email);
  if (!users.length) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { password, ...userWithoutPassword } = users[0];
  return NextResponse.json(userWithoutPassword, { status: 200 });
}
