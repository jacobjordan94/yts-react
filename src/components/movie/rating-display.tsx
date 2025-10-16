import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface RatingDisplayProps extends React.ComponentPropsWithoutRef<'div'> {
    rating: number;
    variant?: 'stars' | 'numeric' | 'both';
    showLabel?: boolean;
    loading?: boolean;
    asChild?: boolean;
}

const RatingDisplay = React.forwardRef<HTMLDivElement, RatingDisplayProps>(
    (
        {
            rating,
            variant = 'both',
            showLabel = false,
            loading = false,
            asChild = false,
            className,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'div';
        const stars = Math.round(rating / 2); // Convert 10-point to 5-star

        if (loading) {
            return (
                <Comp
                    ref={ref}
                    data-loading={loading}
                    {...props}
                    className={cn('flex gap-1 items-center justify-start flex-[0]!', className)}
                >
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-accent text-accent" />
                    ))}
                </Comp>
            );
        }

        return (
            <Comp
                ref={ref}
                data-variant={variant}
                data-loading={loading}
                {...props}
                className={cn('flex items-center gap-1', className)}
            >
                {(variant === 'stars' || variant === 'both') && (
                    <div className="flex" aria-label={`Rating: ${rating} out of 10`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    'h-4 w-4',
                                    i < stars
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'fill-muted text-yellow-400'
                                )}
                            />
                        ))}
                    </div>
                )}
                {(variant === 'numeric' || variant === 'both') && (
                    <span className="text-sm font-medium text-white/60 space-x-0.5">
                        <span>{rating.toFixed(1)}</span>
                        {showLabel && <span>/</span>}
                        {showLabel && <span className="text-white">10</span>}
                    </span>
                )}
            </Comp>
        );
    }
);

RatingDisplay.displayName = 'RatingDisplay';

export { RatingDisplay };
export type { RatingDisplayProps };
