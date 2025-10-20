import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface YearBadgeProps extends ComponentPropsWithoutRef<typeof Badge> {
    year: number;
    asChild?: boolean;
}

const YearBadge = forwardRef<HTMLDivElement, YearBadgeProps>(
    ({ year, asChild = false, className, ...props }, ref) => {
        const Comp = asChild ? Slot : Badge;

        return (
            <Comp ref={ref} variant="outline" className={cn('font-medium', className)} {...props}>
                {year}
            </Comp>
        );
    }
);

YearBadge.displayName = 'YearBadge';

export { YearBadge };
export type { YearBadgeProps };
