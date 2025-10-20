import { type ComponentPropsWithoutRef, type ReactNode, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Frown } from '@/components/icons/lucide';

interface EmptyStateProps extends ComponentPropsWithoutRef<'div'> {
    title?: string;
    description?: string;
    icon?: ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
    variant?: 'no-results' | 'no-data' | 'error';
    asChild?: boolean;
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
    (
        {
            title = 'No results found',
            description,
            icon,
            action,
            variant = 'no-results',
            asChild = false,
            className,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'div';

        const defaultIcon = <Frown className="h-12 w-12 text-muted-foreground" />;

        return (
            <Comp
                ref={ref}
                data-variant={variant}
                className={cn(
                    'flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center',
                    className
                )}
                {...props}
            >
                <div className="mb-4">{icon || defaultIcon}</div>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                {description && (
                    <p className="mb-4 max-w-sm text-sm text-muted-foreground">{description}</p>
                )}
                {action && (
                    <Button onClick={action.onClick} variant="outline">
                        {action.label}
                    </Button>
                )}
            </Comp>
        );
    }
);

EmptyState.displayName = 'EmptyState';

export { EmptyState };
export type { EmptyStateProps };
