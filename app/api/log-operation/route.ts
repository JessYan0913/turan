import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { listOperationLogs } from '@/lib/db/queries';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;
    const limit = 50;

    const logs = await listOperationLogs({
      userId,
      limit,
      status: 'SUCCESS',
      orderBy: 'desc',
    });

    const formattedLogs = logs.items.map((log) => ({
      id: log.id,
      operation: log.operationName,
      description: log.operationDesc || '',
      status: log.status,
      timestamp: log.createdAt,
      metadata: log.metadata || {},
    }));

    return NextResponse.json(
      {
        items: formattedLogs,
        total: logs.total,
        hasMore: logs.hasMore,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to fetch operation logs:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch operation logs' }, { status: 500 });
  }
}
