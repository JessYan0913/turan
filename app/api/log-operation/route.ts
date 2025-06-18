import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;
    const limit = 50;

    const logs = [];

    return NextResponse.json(
      {
        items: [],
        total: logs.length,
        hasMore: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to fetch operation logs:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch operation logs' }, { status: 500 });
  }
}
