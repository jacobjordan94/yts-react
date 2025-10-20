import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

interface RuntimeDisplayProps extends ComponentPropsWithoutRef<'span'> {
    runtime: number; // in minutes
    format?: 'short' | 'long';
    asChild?: boolean;
    loading?: boolean;
}

const RuntimeDisplay = forwardRef<HTMLSpanElement, RuntimeDisplayProps>(
    ({ loading, runtime, format = 'short', asChild = false, className, ...props }, ref) => {
        if (loading) {
            return <Skeleton className="h-4 w-12">&nbsp;</Skeleton>;
        }

        const Comp = asChild ? Slot : 'span';
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;

        const formattedRuntime =
            format === 'short'
                ? `${hours}h ${minutes}m`
                : `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;

        return (
            <Comp
                ref={ref}
                data-format={format}
                className={cn('text-sm text-muted-foreground', className)}
                {...props}
            >
                {formattedRuntime}
            </Comp>
        );
    }
);

RuntimeDisplay.displayName = 'RuntimeDisplay';

export { RuntimeDisplay };
export type { RuntimeDisplayProps };
