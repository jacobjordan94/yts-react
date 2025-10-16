import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps extends React.ComponentPropsWithoutRef<'div'> {
    error?: Error | string;
    onRetry?: () => void;
    title?: string;
    description?: string;
    asChild?: boolean;
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
    (
        {
            error,
            onRetry,
            title = 'Something went wrong',
            description,
            asChild = false,
            className,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'div';
        const errorMessage = typeof error === 'string' ? error : error?.message;

        return (
            <Comp
                ref={ref}
                data-retry={!!onRetry}
                className={cn(
                    'flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-8 text-center',
                    className
                )}
                {...props}
            >
                <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
                <h3 className="mb-2 text-lg font-semibold text-destructive">{title}</h3>
                <p className="mb-4 max-w-sm text-sm text-muted-foreground">
                    {description ||
                        errorMessage ||
                        'An unexpected error occurred. Please try again.'}
                </p>
                {onRetry && (
                    <Button onClick={onRetry} variant="outline">
                        Try Again
                    </Button>
                )}
            </Comp>
        );
    }
);

ErrorState.displayName = 'ErrorState';

export { ErrorState };
export type { ErrorStateProps };
