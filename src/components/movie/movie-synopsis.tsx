import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ClampedText } from '@/components/ui/clamped-text';
import { cn } from '@/lib/utils';

interface MovieSynopsisProps extends React.ComponentPropsWithoutRef<'div'> {
    synopsis?: string;
    description?: string;
    movieId?: number;
    link?: boolean;
    lines?: number;
    expandable?: boolean;
    asChild?: boolean;
}

const MovieSynopsis = React.forwardRef<HTMLDivElement, MovieSynopsisProps>(
    (
        {
            synopsis,
            description,
            movieId,
            link = false,
            lines = 3,
            expandable = true,
            asChild = false,
            className,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'div';

        if (!synopsis) {
            return null;
        }

        if (description && description === synopsis) {
            return null;
        }

        const linkTo = link && movieId ? `/movie/${movieId}` : undefined;

        return (
            <Comp ref={ref} data-lines={lines} className={cn('space-y-1', className)} {...props}>
                <h4 className="text-sm font-semibold text-white">Synopsis</h4>
                <ClampedText
                    text={synopsis}
                    lines={lines}
                    expandable={expandable}
                    className="space-y-2"
                    linkTo={linkTo}
                />
            </Comp>
        );
    }
);

MovieSynopsis.displayName = 'MovieSynopsis';

export { MovieSynopsis };
export type { MovieSynopsisProps };
