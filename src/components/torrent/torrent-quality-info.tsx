import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import type { Torrent } from '@/hooks';

interface TorrentQualityInfoProps extends React.ComponentPropsWithoutRef<'div'> {
    torrent: Pick<Torrent, 'video_codec' | 'bit_depth' | 'audio_channels' | 'type'>;
    detailed?: boolean;
    asChild?: boolean;
}

const TorrentQualityInfo = React.forwardRef<HTMLDivElement, TorrentQualityInfoProps>(
    ({ torrent, detailed = false, asChild = false, className, ...props }, ref) => {
        const Comp = asChild ? Slot : 'div';

        return (
            <Comp
                ref={ref}
                data-detailed={detailed}
                className={cn(
                    'flex flex-wrap items-center gap-1 text-xs text-muted-foreground',
                    className
                )}
                {...props}
            >
                {torrent.video_codec && <span>{torrent.video_codec}</span>}
                {detailed && torrent.bit_depth && (
                    <>
                        <span>•</span>
                        <span>{torrent.bit_depth}-bit</span>
                    </>
                )}
                {detailed && torrent.audio_channels && (
                    <>
                        <span>•</span>
                        <span>{torrent.audio_channels}</span>
                    </>
                )}
                {torrent.type && (
                    <>
                        <span>•</span>
                        <span>{torrent.type}</span>
                    </>
                )}
            </Comp>
        );
    }
);

TorrentQualityInfo.displayName = 'TorrentQualityInfo';

export { TorrentQualityInfo };
export type { TorrentQualityInfoProps };
