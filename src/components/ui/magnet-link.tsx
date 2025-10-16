import * as React from 'react';
import { Link } from 'react-router';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

export interface MagnetLinkProps extends Omit<React.ComponentProps<typeof Link>, 'to'> {
    hash: string;
    movieName?: string;
    asChild?: boolean;
}

const TRACKERS = [
    'udp://tracker.opentrackr.org:1337/announce',
    'udp://open.tracker.cl:1337/announce',
    'udp://9.rarbg.com:2810/announce',
    'udp://tracker.openbittorrent.com:6969/announce',
    'udp://opentracker.i2p.rocks:6969/announce',
    'udp://tracker.torrent.eu.org:451/announce',
    'udp://open.stealth.si:80/announce',
    'udp://tracker.moeking.me:6969/announce',
];

const MagnetLink = React.forwardRef<HTMLAnchorElement, MagnetLinkProps>(
    ({ className, hash, movieName, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : Link;

        const magnetUri = React.useMemo(() => {
            if (!movieName || !hash) return;
            const trackerParams = TRACKERS.map(
                (tracker) => `tr=${encodeURIComponent(tracker)}`
            ).join('&');
            const displayName = encodeURIComponent(movieName);
            return `magnet:?xt=urn:btih:${hash}&dn=${displayName}&${trackerParams}`;
        }, [hash, movieName]);

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            props.onClick?.(e);

            // Open magnet link
            window.location.href = magnetUri || '';
        };

        return (
            magnetUri && (
                <Comp
                    ref={ref}
                    to={magnetUri}
                    className={cn(className)}
                    onClick={handleClick}
                    {...props}
                />
            )
        );
    }
);

MagnetLink.displayName = 'MagnetLink';

export { MagnetLink };
