import { forwardRef, useEffect, useState, type ComponentPropsWithoutRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn, loadImage } from '@/lib/utils';

interface PageBackgroundProps extends ComponentPropsWithoutRef<'div'> {
    image?: string;
    blur?: number;
    darkness?: number;
    asChild?: boolean;
    duration?: number;
}

const PageBackground = forwardRef<HTMLDivElement, PageBackgroundProps>(
    (
        {
            image,
            blur = 8,
            darkness = 0.7,
            duration = 250,
            asChild = false,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'div';
        const [pageBackground, setPageBackground] = useState<string | undefined>();
        const [loading, setLoading] = useState<boolean>(false);

        useEffect(() => {
            if (!image) return;
            loadImage(image).then((imageElement) => {
                setLoading(true);
                setTimeout(() => {
                    setPageBackground(imageElement.src);
                }, duration);
                setTimeout(() => {
                    setLoading(false);
                }, duration * 2);
            });
        }, [image, duration]);

        return (
            <Comp
                ref={ref}
                data-has-image={!!image}
                className={cn('relative min-h-screen', className)}
                {...props}
            >
                {image && (
                    <>
                        {/* Background Image Layer */}
                        <div
                            data-loading={loading}
                            className="transition-opacity opacity-100 data-[loading=true]:opacity-5 absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${pageBackground})`,
                                filter: `blur(${blur}px)`,
                                transitionDuration: `${duration}ms`,
                            }}
                        />
                        {/* Darkness Overlay */}
                        <div
                            className="absolute inset-0 -z-10 bg-black"
                            style={{
                                opacity: darkness,
                            }}
                        />
                        {/* Gradient Overlay (transparent to background color) */}
                        <div
                            className="absolute inset-0 -z-10"
                            style={{
                                background: `linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)`,
                            }}
                        />
                    </>
                )}
                {children}
            </Comp>
        );
    }
);

PageBackground.displayName = 'PageBackground';

export { PageBackground };
export type { PageBackgroundProps };
