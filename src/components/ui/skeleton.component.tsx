import { HTMLAttributes } from 'react';
import cn from 'clsx';

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-border', className)}
      {...props}
    />
  );
}

export { Skeleton };
