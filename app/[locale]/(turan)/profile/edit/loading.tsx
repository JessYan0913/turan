export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-12 pt-8 transition-colors duration-300">
      <div className="container mx-auto max-w-3xl px-4">
        {/* 页面头部骨架 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="h-9 w-32 animate-pulse rounded-full bg-muted" />
          </div>
          <div className="mt-6 text-center">
            <div className="mx-auto h-9 w-64 animate-pulse rounded-md bg-muted" />
            <div className="mx-auto mt-2 h-4 w-48 animate-pulse rounded bg-muted" />
          </div>
        </div>
        <div className="overflow-hidden rounded-xl transition-all duration-300">
          <div className="p-6">
            <div className="space-y-8">
              {/* 头像骨架 */}
              <div className="flex flex-col items-center">
                <div className="group relative mb-4">
                  <div className="size-32 animate-pulse rounded-full border-4 border-background bg-muted" />
                  <div className="absolute bottom-0 right-0 flex size-10 animate-pulse items-center justify-center rounded-full bg-primary/90" />
                </div>
                <div className="mt-2 h-5 w-48 animate-pulse rounded bg-muted" />
                <div className="mt-1 h-4 w-56 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-px bg-border/40" />
              {/* 表单字段骨架 */}
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`space-y-2 ${i > 2 ? 'md:col-span-2' : ''}`}>
                    <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                    <div className="flex h-10 items-center rounded-md border border-input bg-background px-3">
                      <div className="mr-2 size-4 animate-pulse rounded-full bg-muted" />
                      <div className="h-5 flex-1 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
              {/* 按钮组骨架 */}
              <div className="flex justify-end pt-6">
                <div className="flex h-10 w-32 animate-pulse items-center justify-center rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
