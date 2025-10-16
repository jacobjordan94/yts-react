import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const pageVariants = cva('page', {
    variants: {
        layout: {
            default: 'max-w-4xl mx-auto',
            wide: 'max-w-6xl mx-auto',
            full: 'w-full px-0',
            centered: 'mx-auto flex items-center justify-center h-full',
            narrow: 'max-w-3xl mx-auto',
        },
        spacing: {
            default: 'py-6',
            compact: 'py-3',
            relaxed: 'py-12',
            none: '',
        },
    },
    defaultVariants: {
        layout: 'default',
        spacing: 'default',
    },
});

interface PageProps
    extends React.ComponentPropsWithoutRef<'main'>,
        VariantProps<typeof pageVariants> {
    pageName: string;
    asChild?: boolean;
}
const Page = React.forwardRef<HTMLDivElement, PageProps>(
    ({ pageName, asChild = false, className, layout, spacing, ...props }, ref) => {
        const Comp = asChild ? Slot : 'main';
        return (
            <Comp
                {...props}
                ref={ref}
                data-page-name={pageName}
                className={cn('page-' + pageName, pageVariants({ layout, spacing }), className)}
            ></Comp>
        );
    }
);

Page.displayName = 'Page';

export { Page };
export type { PageProps };
