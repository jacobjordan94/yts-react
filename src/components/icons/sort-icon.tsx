import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { getSortIcon } from '@/lib/sort-icons';
import { cn } from '@/lib/utils';

interface SortIconProps extends ComponentPropsWithoutRef<'div'> {
    sortBy: string;
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
}

const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
};

const SortIcon = forwardRef<HTMLDivElement, SortIconProps>(
    ({ sortBy, size = 'md', asChild = false, className, ...props }, ref) => {
        const Comp = asChild ? Slot : 'div';
        const Icon = getSortIcon(sortBy);

        if (!Icon) return null;

        return (
            <Comp
                ref={ref}
                data-sort={sortBy}
                data-size={size}
                className={cn('inline-flex items-center justify-center', className)}
                {...props}
            >
                <Icon className={cn(sizeClasses[size])} />
            </Comp>
        );
    }
);

SortIcon.displayName = 'SortIcon';

export { SortIcon };
export type { SortIconProps };
