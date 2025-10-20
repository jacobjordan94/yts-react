import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface MoviePosterSkeletonProps extends ComponentPropsWithoutRef<'div'> {
    size?: 'sm' | 'md' | 'lg' | 'full';
}

const sizeClasses = {
    sm: 'w-24',
    md: 'w-40',
    lg: 'w-64',
    full: 'w-full',
};

const MoviePosterSkeleton = forwardRef<HTMLDivElement, MoviePosterSkeletonProps>(
    ({ size = 'md', className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                data-size={size}
                className={cn(sizeClasses[size], 'relative', className)}
                {...props}
            >
                <AspectRatio ratio={2 / 3}>
                    <Skeleton className="h-full w-full rounded-md" />
                </AspectRatio>
            </div>
        );
    }
);

MoviePosterSkeleton.displayName = 'MoviePosterSkeleton';

export { MoviePosterSkeleton };
export type { MoviePosterSkeletonProps };
