import { useCallback, useState } from 'react';

import { toast } from '@/components/ui/use-toast';

type Status = 'idle' | 'loading' | 'polling' | 'success' | 'error';

interface UsePollingRequestOptions<T, R> {
  /**
   * The API endpoint to make the initial request to
   */
  request: (data: T) => Promise<{ id: string }>;
  /**
   * Function to check the status of the request
   */
  checkStatus: (id: string) => Promise<R>;
  /**
   * Function to determine if the request is complete
   */
  isComplete: (data: R) => boolean;
  /**
   * Function to extract the result from the status response
   */
  getResult: (data: R) => any;
  /**
   * Polling interval in milliseconds (default: 1000ms)
   */
  interval?: number;
  /**
   * Maximum number of polling attempts (default: 60)
   */
  maxAttempts?: number;
  /**
   * Success message to show when the request completes
   */
  successMessage?: string;
  /**
   * Error message to show when the request fails
   */
  errorMessage?: string;
  /**
   * Timeout message to show when polling takes too long
   */
  timeoutMessage?: string;
}

export function usePollingRequest<T, R>({
  request,
  checkStatus,
  isComplete,
  getResult,
  interval = 1000,
  maxAttempts = 60,
  successMessage = '操作成功',
  errorMessage = '操作失败',
  timeoutMessage = '请求超时，请稍后查看结果',
}: UsePollingRequestOptions<T, R>) {
  const [status, setStatus] = useState<Status>('idle');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);

  const execute = useCallback(
    async (requestData: T) => {
      setStatus('loading');
      setError(null);
      setProgress(0);

      try {
        toast({
          title: '处理中',
          description: '正在处理您的请求，请稍候...',
        });

        // Make the initial request
        const response = await request(requestData);
        const requestId = response.id;

        if (!requestId) {
          throw new Error('未能获取请求ID');
        }

        setStatus('polling');
        let attempts = 0;

        const poll = async () => {
          if (attempts >= maxAttempts) {
            setStatus('error');
            toast({
              title: '请求超时',
              description: timeoutMessage,
              variant: 'destructive',
            });
            return;
          }

          try {
            const statusData = await checkStatus(requestId);
            setProgress(Math.min(100, (attempts / maxAttempts) * 100));

            if (isComplete(statusData)) {
              const result = getResult(statusData);
              setData(result);
              setStatus('success');
              toast({
                title: '成功',
                description: successMessage,
              });
              return;
            }
          } catch (err) {
            console.error('Error checking status:', err);
            // Continue polling on error
          }

          attempts++;
          setTimeout(poll, interval);
        };

        poll();
      } catch (err) {
        console.error('Request failed:', err);
        setStatus('error');
        setError(err instanceof Error ? err : new Error(errorMessage));
        toast({
          title: '错误',
          description: err instanceof Error ? err.message : errorMessage,
          variant: 'destructive',
        });
      }
    },
    [request, checkStatus, errorMessage, getResult, interval, isComplete, maxAttempts, successMessage, timeoutMessage]
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
    setProgress(0);
  }, []);

  return {
    execute,
    reset,
    status,
    data,
    error,
    progress,
    isLoading: status === 'loading' || status === 'polling',
    isPolling: status === 'polling',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
}

export default usePollingRequest;
