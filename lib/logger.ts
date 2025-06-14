import { OperationLog } from '@/lib/db/schema';

export async function logOperation(data: Partial<OperationLog>) {
  try {
    await fetch('/api/log-operation', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('logOperation failed:', err);
  }
}
