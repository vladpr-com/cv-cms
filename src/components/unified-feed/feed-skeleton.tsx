import { Skeleton } from '@/components/ui/skeleton';

function JobCardSkeleton() {
  return (
    <div className="border border-border/40 rounded-lg p-4 space-y-3">
      {/* Company header */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
      {/* Highlight items */}
      <div className="space-y-2 pl-2">
        <div className="flex items-start gap-2">
          <Skeleton className="h-3 w-3 mt-1 rounded-full" />
          <div className="space-y-1 flex-1">
            <Skeleton className="h-3.5 w-full max-w-[280px]" />
            <Skeleton className="h-3 w-full max-w-[200px]" />
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Skeleton className="h-3 w-3 mt-1 rounded-full" />
          <div className="space-y-1 flex-1">
            <Skeleton className="h-3.5 w-full max-w-[240px]" />
            <Skeleton className="h-3 w-full max-w-[180px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="flex-1 bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex items-center justify-between py-6 border-b border-border/40">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-20 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 sm:px-6 pb-24">
        <div className="mt-6 space-y-6">
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
        </div>
      </main>
    </div>
  );
}
