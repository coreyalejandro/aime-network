import React from 'react';

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export function Skeleton({ className = '', height = 'h-4', width = 'w-full', variant = 'rectangular' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-surface-variant/30 via-surface-variant/50 to-surface-variant/30 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]';
  
  const variantClasses = {
    rectangular: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded-sm'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${height} ${width} ${className}`} />
  );
}

export function ContentBlockSkeleton({ type }: { type: 'hero' | 'articles' | 'editorial' | 'custom' }) {
  if (type === 'hero') {
    return (
      <div className="bg-surface-2 rounded-lg p-8 border border-outline/20 shadow-elev-3 space-y-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <Skeleton height="h-16" width="w-3/4" />
              <Skeleton height="h-6" width="w-full" />
              <Skeleton height="h-6" width="w-5/6" />
              <Skeleton height="h-4" width="w-full" />
              <Skeleton height="h-4" width="w-4/5" />
            </div>
            <div className="relative">
              <Skeleton height="h-64 md:h-80" width="w-full" className="rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'articles') {
    return (
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className={`bg-surface-2 border border-outline/20 rounded-lg shadow-elev-2 p-6 space-y-4 ${idx === 0 ? 'md:col-span-2' : ''}`}>
              <Skeleton height="h-3" width="w-16" />
              <Skeleton height="h-8" width="w-5/6" />
              <Skeleton height="h-4" width="w-full" />
              <Skeleton height="h-4" width="w-3/4" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton height="h-3" width="w-20" />
                <Skeleton height="h-3" width="w-12" />
              </div>
              <Skeleton height="h-8" width="w-16" className="rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'editorial') {
    return (
      <div className="container mx-auto px-4">
        <div className="p-6 bg-surface-2 rounded-lg border-l-4 border-primary shadow-elev-1 space-y-3">
          <Skeleton height="h-8" width="w-2/3" />
          <Skeleton height="h-4" width="w-full" />
          <Skeleton height="h-4" width="w-4/5" />
        </div>
      </div>
    );
  }

  if (type === 'custom') {
    return (
      <div className="bg-surface-2 rounded-lg p-6 border border-outline/20 shadow-elev-2 space-y-3">
        <Skeleton height="h-6" width="w-1/2" />
        <Skeleton height="h-4" width="w-full" />
        <Skeleton height="h-4" width="w-3/4" />
      </div>
    );
  }

  return null;
}