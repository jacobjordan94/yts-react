import type { Cast, CastMember as CastMemberType } from '@/hooks/use-list-movies';
import { cn } from '@/lib/utils';
import { forwardRef, useCallback, type ComponentPropsWithRef } from 'react';
import { CastMember } from './cast-member';

type CastListProps = ComponentPropsWithRef<'div'> & {
    cast: Cast;
    direction: 'horizontal' | 'vertical';
    onCastMemberClick?: (castMember: CastMemberType) => void;
};
const CastList = forwardRef<HTMLDivElement, CastListProps>(
    ({ cast, className, direction = 'vertical', onCastMemberClick, ...props }, ref) => {
        const onClick = useCallback((cast: CastMemberType) => {
            window.open(
                `https://www.imdb.com/name/nm${cast.imdb_code}`,
                '_blank',
                'noopener,noreferrer'
            );
        }, []);

        if (!cast) return null;

        return (
            <div
                ref={ref}
                {...props}
                data-direction={direction}
                className={cn(
                    'cast-list flex',
                    'data-[direction=vertical]:flex-col data-[direction=vertical]:space-y-2',
                    'md:data-[direction=vertical]:*:hover:translate-x-8 *:transition-[translate]',
                    'data-[direction=horizontal]:space-x-1',
                    className
                )}
            >
                {cast.map((cm) => (
                    <CastMember
                        key={cm.imdb_code}
                        className="inline-flex cursor-pointer"
                        cast={cm}
                        onCastMemberClick={onCastMemberClick ?? onClick}
                    />
                ))}
            </div>
        );
    }
);

export { CastList };
export type { CastListProps };
