import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { getGenreIcon } from '@/lib/genre-icons';
import { cn } from '@/lib/utils';

interface GenreIconProps extends React.ComponentPropsWithoutRef<'div'> {
    genre: string;
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
}

const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
};

const GenreIcon = React.forwardRef<HTMLDivElement, GenreIconProps>(
    ({ genre, size = 'md', asChild = false, className, ...props }, ref) => {
        const Comp = asChild ? Slot : 'div';
        const Icon = getGenreIcon(genre);

        return (
            <Comp
                ref={ref}
                data-genre={genre}
                data-size={size}
                className={cn('inline-flex items-center justify-center', className)}
                {...props}
            >
                <Icon className={cn(sizeClasses[size])} />
            </Comp>
        );
    }
);

GenreIcon.displayName = 'GenreIcon';

export { GenreIcon };
export type { GenreIconProps };
