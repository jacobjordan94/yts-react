import { Slot } from '@radix-ui/react-slot';
import { Button } from '../ui/button';
import { forwardRef, type ComponentProps, type MouseEvent } from 'react';
import { Trash2 } from '@/components/icons/lucide';
import { cn } from '@/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '../ui/button-variants';

interface ResetFiltersButtonProps
    extends ComponentProps<'button'>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    onFilterReset: (e: MouseEvent) => void;
}

const ResetFiltersButton = forwardRef<HTMLButtonElement, ResetFiltersButtonProps>(
    (
        {
            asChild = false,
            className,
            variant = 'outline',
            size = 'default',
            onFilterReset,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : Button;
        return (
            <Comp
                {...props}
                ref={ref}
                variant={variant}
                size={size}
                className={cn('font-semibold hover:bg-destructive/20!', className)}
                onMouseDown={(e) => onFilterReset(e)}
            >
                <Trash2 className="opacity-50" />
                Reset Filters
            </Comp>
        );
    }
);

ResetFiltersButton.displayName = 'ResetFiltersButton';

export { ResetFiltersButton };
export type { ResetFiltersButtonProps };
