import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';

const pageVariants = cva('page px-4', {
    variants: {
        layout: {
            default: 'max-w-4xl 4xl:px-0 mx-auto',
            wide: 'max-w-6xl 6xl:px-0 mx-auto',
            full: 'w-full px-0',
            centered: 'mx-auto flex items-center justify-center h-full',
            narrow: 'max-w-3xl 3xl:px-0 mx-auto',
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

interface PageProps extends ComponentPropsWithoutRef<'main'>, VariantProps<typeof pageVariants> {
    pageName: string;
    asChild?: boolean;
    loading?: boolean;
}
const Page = forwardRef<HTMLDivElement, PageProps>(
    (
        {
            pageName,
            asChild = false,
            className,
            layout,
            spacing,
            loading = false,
            children,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'main';
        return (
            <>
                <Comp
                    {...props}
                    ref={ref}
                    data-loading={loading}
                    data-ready={!loading}
                    data-page-name={pageName}
                    className={cn(
                        'page-' + pageName,
                        pageVariants({ layout, spacing }),
                        'duration-500 opacity-0 data-[ready=true]:opacity-100',
                        className
                    )}
                >
                    {' '}
                    {!asChild && children}
                </Comp>
                <LoadingComponent loading={loading} />
            </>
        );
    }
);

function LoadingComponent({ loading = true }: { loading: boolean }) {
    return (
        <div
            data-loading={loading}
            className="transition-opacity duration-500 pointer-events-none absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center data-[loading=false]:opacity-0"
        >
            <Spinner className="size-12" />
        </div>
    );
}

Page.displayName = 'Page';

export { Page };
export type { PageProps };
