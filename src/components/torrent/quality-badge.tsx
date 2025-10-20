import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface QualityBadgeProps extends ComponentPropsWithoutRef<typeof Badge> {
    quality: string;
    asChild?: boolean;
}

const QualityBadge = forwardRef<HTMLDivElement, QualityBadgeProps>(
    ({ quality, asChild = false, className, ...props }, ref) => {
        const Comp = asChild ? Slot : Badge;
        const normalizedQuality = quality.toLowerCase();
        const rendered = normalizedQuality === '2160p' ? '4k' : quality;
        return (
            <Comp
                ref={ref}
                data-quality={normalizedQuality}
                className={cn(
                    'font-mono font-semibold text-white',
                    "data-[quality='2160p']:bg-uhd",
                    "data-[quality='1080p']:bg-hd",
                    "data-[quality='1080p.h265']:bg-hd",
                    "data-[quality='720p']:bg-full-hd",
                    "data-[quality='480p']:bg-standard-def",
                    "data-[quality='3d']:bg-three-d",
                    className
                )}
                {...props}
            >
                {rendered}
            </Comp>
        );
    }
);

QualityBadge.displayName = 'QualityBadge';

export { QualityBadge };
export type { QualityBadgeProps };
