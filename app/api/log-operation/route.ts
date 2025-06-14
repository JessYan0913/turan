import { NextRequest, NextResponse } from 'next/server';

import { createOperationLog } from '@/lib/db/queries';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await createOperationLog(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save log:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
