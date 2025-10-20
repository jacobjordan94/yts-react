import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';

interface MovieCardBaseProps extends ComponentPropsWithoutRef<'div'> {
    asChild?: boolean;
    background?: boolean;
    onGenreClick?: (genre: string) => void;
}

const MovieCardBase = forwardRef<HTMLDivElement, MovieCardBaseProps>(
    ({ asChild = false, background = false, className, onClick, children, ...props }, ref) => {
        const Comp = asChild ? Slot : Card;

        return (
            <Comp
                ref={ref}
                data-background={background}
                data-clickable={!!onClick}
                className={cn(
                    'group/movieCard flex flex-col transition-transform border-0 relative',
                    'data-[clickable=true]:cursor-pointer shadow-black/50 shadow-md',
                    className
                )}
                onClick={onClick}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);

MovieCardBase.displayName = 'MovieCardBase';

export { MovieCardBase };
export type { MovieCardBaseProps };
