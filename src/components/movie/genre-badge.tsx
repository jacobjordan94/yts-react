import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Badge } from '@/components/ui/badge';
import { GenreIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

interface GenreBadgeProps extends ComponentPropsWithoutRef<typeof Badge> {
    genre: string;
    clickable?: boolean;
    showIcon?: boolean;
    asChild?: boolean;
}

const GenreBadge = forwardRef<HTMLDivElement, GenreBadgeProps>(
    (
        {
            genre,
            clickable = false,
            showIcon = true,
            asChild = false,
            className,
            onClick,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : Badge;

        return (
            <Comp
                ref={ref}
                data-clickable={clickable}
                variant="secondary"
                className={cn(
                    'data-[clickable=true]:cursor-pointer data-[clickable=true]:hover:bg-secondary/80',
                    showIcon && 'gap-1',
                    className
                )}
                onClick={onClick}
                {...props}
            >
                {showIcon && <GenreIcon genre={genre} size="sm" />}
                {genre}
            </Comp>
        );
    }
);

GenreBadge.displayName = 'GenreBadge';

export { GenreBadge };
export type { GenreBadgeProps };
