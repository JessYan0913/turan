// File: e:\turan\app\api\works\route.ts
import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { deleteWork, getWorks } from '@/lib/db/queries';
import { type WorkType } from '@/lib/db/schema';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || 'all';

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await getWorks({
      userId,
      searchTerm: search,
      ...(type !== 'all' ? { type: type as WorkType } : {}),
      limit: 50,
      offset: 0,
    });

    // Format the works data
    const works = result.items.map((work) => ({
      ...work,
      createdAt: work.createdAt.toISOString(),
      originalImage: work.originalImage || '',
      processedImage: work.processedImage || '',
    }));

    return NextResponse.json({ works }, { status: 200 });
  } catch (error) {
    console.error('Error fetching works:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { workId } = await request.json();

    if (!workId) {
      return NextResponse.json({ error: 'Work ID is required' }, { status: 400 });
    }

    await deleteWork(workId, userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting work:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
