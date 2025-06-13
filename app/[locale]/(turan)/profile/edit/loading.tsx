export default function Loading() {
  return (
    <div className="bg-muted/20 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 p-8">
        <div className="h-8 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
