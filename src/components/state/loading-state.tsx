import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

interface LoadingStateProps extends ComponentPropsWithoutRef<'div'> {
    message?: string;
    asChild?: boolean;
}

const LoadingState = forwardRef<HTMLDivElement, LoadingStateProps>(
    ({ message = 'Loading...', asChild = false, className, ...props }, ref) => {
        const Comp = asChild ? Slot : 'div';

        return (
            <Comp
                ref={ref}
                className={cn(
                    'flex min-h-[400px] flex-col items-center justify-center p-8',
                    className
                )}
                {...props}
            >
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
                <p className="text-sm text-muted-foreground">{message}</p>
            </Comp>
        );
    }
);

LoadingState.displayName = 'LoadingState';

export { LoadingState };
export type { LoadingStateProps };
