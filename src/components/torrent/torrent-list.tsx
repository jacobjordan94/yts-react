import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { TorrentItem } from './torrent-item';
import { TorrentItemSkeleton } from '../skeleton/torrent-item-skeleton';
import { cn } from '@/lib/utils';
import type { Torrent } from '@/hooks';

interface TorrentListProps extends React.ComponentPropsWithoutRef<'div'> {
    torrents?: Torrent[];
    layout?: 'list' | 'grid';
    loading?: boolean;
    onTorrentSelect?: (torrent: Torrent) => void;
    selectedTorrent?: Torrent;
    asChild?: boolean;
    movieName?: string;
}

const TorrentList = React.forwardRef<HTMLDivElement, TorrentListProps>(
    (
        {
            torrents = [],
            layout = 'list',
            loading = false,
            onTorrentSelect,
            selectedTorrent,
            asChild = false,
            className,
            movieName,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'div';

        if (loading) {
            return (
                <Comp
                    ref={ref}
                    data-loading={loading}
                    data-layout={layout}
                    className={cn(
                        'space-y-2',
                        layout === 'grid' && 'grid gap-4 md:grid-cols-2',
                        className
                    )}
                    {...props}
                >
                    {Array.from({ length: 3 }).map((_, i) => (
                        <TorrentItemSkeleton key={i} />
                    ))}
                </Comp>
            );
        }

        if (torrents.length === 0) {
            return (
                <Comp
                    ref={ref}
                    className={cn('rounded-lg border border-dashed p-8 text-center', className)}
                    {...props}
                >
                    <p className="text-muted-foreground">No torrents available</p>
                </Comp>
            );
        }

        return (
            <Comp
                ref={ref}
                data-loading={loading}
                data-layout={layout}
                className={cn(
                    'space-y-2',
                    layout === 'grid' && 'grid gap-4 md:grid-cols-2',
                    className
                )}
                {...props}
            >
                {torrents.map((torrent) => (
                    <TorrentItem
                        key={torrent.hash}
                        movieName={movieName}
                        torrent={torrent}
                        selected={selectedTorrent?.hash === torrent.hash}
                        onSelect={onTorrentSelect}
                    />
                ))}
            </Comp>
        );
    }
);

TorrentList.displayName = 'TorrentList';

export { TorrentList };
export type { TorrentListProps };
