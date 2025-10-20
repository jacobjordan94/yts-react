import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type CommentCardSkeletonProps = ComponentPropsWithoutRef<'div'>;

const CommentCardSkeleton = forwardRef<HTMLDivElement, CommentCardSkeletonProps>(
    ({ className, ...props }, ref) => {
        return (
            <div ref={ref} className={cn('flex gap-4', className)} {...props}>
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </div>
        );
    }
);

CommentCardSkeleton.displayName = 'CommentCardSkeleton';

export { CommentCardSkeleton };
export type { CommentCardSkeletonProps };
