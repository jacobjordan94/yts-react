import * as React from 'react';
import { ClampedText } from '@/components/ui/clamped-text';

interface MovieDescriptionProps extends React.ComponentPropsWithoutRef<'div'> {
    description: string;
    movieId?: number;
    link?: boolean;
    lines?: number;
    expandable?: boolean;
    asChild?: boolean;
}

const MovieDescription = React.forwardRef<HTMLDivElement, MovieDescriptionProps>(
    (
        {
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
        const linkTo = link && movieId ? `/movie/${movieId}` : undefined;

        return (
            <ClampedText
                ref={ref}
                text={description}
                lines={lines}
                expandable={expandable}
                asChild={asChild}
                className={className}
                linkTo={linkTo}
                {...props}
            />
        );
    }
);

MovieDescription.displayName = 'MovieDescription';

export { MovieDescription };
export type { MovieDescriptionProps };
