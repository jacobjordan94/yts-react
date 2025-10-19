import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { CastMember } from '@/hooks/use-list-movies';
import { forwardRef, useState, type ComponentPropsWithRef } from 'react';
import { User2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type AvatarImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';
type ActorImageProps = ComponentPropsWithRef<typeof Avatar> & {
    castMember: CastMember;
};
const ActorImage = forwardRef<HTMLSpanElement, ActorImageProps>(
    ({ castMember, className, ...props }, ref) => {
        const [status, setStatus] = useState<AvatarImageLoadingStatus>('idle');

        return (
            <Avatar
                ref={ref}
                {...props}
                data-status={status}
                className={cn('avatar group data-[status=loading]:animate-pulse', className)}
            >
                <AvatarImage
                    className="avatar-image size-full"
                    onLoadingStatusChange={(state) => setStatus(state)}
                    src={castMember.url_small_image}
                />
                <AvatarFallback className="avatar-fallback">
                    <User2 />
                </AvatarFallback>
            </Avatar>
        );
    }
);

export { ActorImage };
export type { AvatarImageLoadingStatus, ActorImageProps };
