import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton-pulse rounded-[6px] ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-[14px] p-5 space-y-3" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-40" />
    </div>
  );
}

export function ContentCardSkeleton() {
  return (
    <div className="rounded-[14px] p-4 space-y-3" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-16 rounded-[6px]" />
      </div>
    </div>
  );
}