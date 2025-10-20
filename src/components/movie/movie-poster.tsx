import { type ComponentPropsWithoutRef, forwardRef, useState } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from '@/components/icons/lucide';

interface MoviePosterProps extends ComponentPropsWithoutRef<'div'> {
    src?: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg' | 'full';
    loading?: boolean;
    error?: boolean;
    asChild?: boolean;
}

const sizeClasses = {
    sm: 'w-24',
    md: 'w-40',
    lg: 'w-64',
    full: 'w-full',
};

const MoviePoster = forwardRef<HTMLDivElement, MoviePosterProps>(
    (
        {
            src,
            alt = 'Movie poster',
            size = 'md',
            loading = false,
            error = false,
            asChild = false,
            className,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'div';
        const [loadingImage, setLoadingImage] = useState(false);
        const [loadingError, setLoadingError] = useState(false);

        if (loading || loadingImage) {
            return (
                <Comp
                    ref={ref}
                    data-loading={loading}
                    className={cn(sizeClasses[size], 'relative', className)}
                    {...props}
                >
                    <AspectRatio ratio={2 / 3}>
                        <Skeleton className="h-full w-full object-cover rounded-md" />
                    </AspectRatio>
                </Comp>
            );
        }

        return (
            <Comp
                ref={ref}
                data-loading={loading}
                data-error={error}
                data-size={size}
                className={cn(
                    sizeClasses[size],
                    'relative overflow-hidden rounded-md',
                    'data-[error=true]:bg-muted',
                    className
                )}
                {...props}
            >
                <AspectRatio ratio={2 / 3}>
                    {error || !src || loadingError ? (
                        <div
                            className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground"
                            role="img"
                            aria-label={`${alt} - Image unavailable`}
                        >
                            <ImageOff className="h-12 w-12" aria-hidden="true" />
                        </div>
                    ) : (
                        <img
                            src={src}
                            alt={alt}
                            onLoadStart={() => setLoadingImage(true)}
                            onLoad={() => setLoadingImage(false)}
                            onError={() => setLoadingError(true)}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    )}
                </AspectRatio>
            </Comp>
        );
    }
);

MoviePoster.displayName = 'MoviePoster';

export { MoviePoster };
export type { MoviePosterProps };
