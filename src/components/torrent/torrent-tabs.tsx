import type { Torrent } from '@/hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { TorrentList } from './torrent-list';
import { cn } from '@/lib/utils';

const TorrentTabs = ({
    torrents = [],
    movieName,
    className,
}: {
    torrents: Torrent[] | undefined;
    movieName?: string;
    className?: string;
}) => {
    const resolutions = [...new Set(torrents.map((res) => res?.quality))];
    resolutions.unshift('all');

    return (
        <section className={cn('torrrent-tabs', className)}>
            <Tabs defaultValue="all">
                <TabsList className={cn()}>
                    {resolutions.map((resolution) => (
                        <TabsTrigger
                            value={resolution}
                            data-value={resolution}
                            className="capitalize"
                            key={resolution}
                        >
                            {resolution}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="all">
                    <TorrentList torrents={torrents} movieName={movieName} />
                </TabsContent>
                {resolutions?.slice(1).map((resolution) => {
                    const tors = torrents.filter((torrent) => torrent.quality === resolution);
                    return (
                        <TabsContent key={resolution} value={resolution} asChild>
                            <TorrentList torrents={tors} movieName={movieName} />
                        </TabsContent>
                    );
                })}
            </Tabs>
        </section>
    );
};

export { TorrentTabs };
export default TorrentTabs;
