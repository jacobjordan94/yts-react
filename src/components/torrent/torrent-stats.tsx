import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface TorrentStatsProps extends React.ComponentPropsWithoutRef<'div'> {
    seeds: number;
    peers: number;
    layout?: 'horizontal' | 'vertical';
    asChild?: boolean;
}

const TorrentStats = React.forwardRef<HTMLDivElement, TorrentStatsProps>(
    ({ seeds, peers, layout = 'horizontal', asChild = false, className, ...props }, ref) => {
        const Comp = asChild ? Slot : 'div';

        return (
            <Comp
                ref={ref}
                data-layout={layout}
                className={cn(
                    'flex items-center gap-3 text-sm',
                    'data-[layout=vertical]:flex-col data-[layout=vertical]:items-start',
                    className
                )}
                {...props}
            >
                <div className="flex items-center gap-1">
                    <ArrowUpCircle className="h-4 w-4 text-green-500" />
                    <span className="font-semibold">{seeds}</span>
                    <span className="font-light">seeds</span>
                </div>
                <div className="flex items-center gap-1">
                    <ArrowDownCircle className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold">{peers}</span>
                    <span className="font-light">peers</span>
                </div>
            </Comp>
        );
    }
);

TorrentStats.displayName = 'TorrentStats';

export { TorrentStats };
export type { TorrentStatsProps };
