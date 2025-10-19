import type { CastMember as CastMemberType } from '@/hooks/use-list-movies';
import { forwardRef, type ComponentPropsWithRef } from 'react';
import { ActorImage } from './actor-image';
import { cn } from '@/lib/utils';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia } from '@/components/ui/item';
import Icons from '@/components/icons';
import { ExternalLink } from 'lucide-react';

type CastMemberProps = ComponentPropsWithRef<'div'> & {
    cast: CastMemberType;
    onCastMemberClick?: (castMember: CastMemberType) => void;
};
const CastMember = forwardRef<HTMLDivElement, CastMemberProps>(
    ({ cast, className, onCastMemberClick, ...props }, ref) => {
        return (
            <Item
                onClick={onCastMemberClick ? () => onCastMemberClick(cast) : undefined}
                ref={ref}
                {...props}
                className={cn(
                    'cast-member inline-flex p-0 text-shadow-black/50 text-shadow-md group',
                    className
                )}
            >
                <ItemMedia className="h-full aspect-square drop-shadow-black/50 drop-shadow-md">
                    <ActorImage className="size-[56px]" castMember={cast} />
                </ItemMedia>
                <ItemContent>
                    <ItemDescription className="text-white font-semibold text-lg line-clamp-1 font-[Quicksand]">
                        {cast.name}
                    </ItemDescription>
                    <ItemDescription className="font-semibold text-base line-clamp-1">
                        {cast.character_name}
                    </ItemDescription>
                </ItemContent>
                <ItemContent className="md:opacity-0 md:group-hover:opacity-100 transition-opacity h-full">
                    <Icons.IMDB className="opacity-80 p-3 aspect-square fill-white h-full" />
                </ItemContent>
                <ItemActions className="item-actions md:hidden h-full">
                    <ExternalLink className="opacity-80 aspect-square text-white size-4" />
                </ItemActions>
            </Item>
        );
    }
);

export { CastMember };
export type { CastMemberProps };
