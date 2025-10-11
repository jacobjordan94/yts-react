import type { Torrent } from "@/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TorrentList } from "./torrent-list";
import { cn } from "@/lib/utils";

const gradientMap: Record<string, string> = {
    'all': 'transparent',
    '480p': 'standard-def',
    '720p': 'hd',
    '1080p': 'full-hd',
    '2160p': 'uhd',
    '3D': 'three-d',
};

const getResolutionGradient = (resolutions: string[]): React.CSSProperties => {
    const colors = resolutions
        .map(res => gradientMap[res] || 'transparent')
        .filter(color => color !== 'transparent');

    if (colors.length === 0) return {};
    if (colors.length === 1) {
        return { background: `var(--${colors[0]})` };
    }

    // Create gradient stops with even distribution
    const gradientStops = colors.map((color, index) => {
        const percentage = (index / (colors.length - 1)) * 100;
        return `var(--${color}) ${percentage}%`;
    }).join(', ');

    return {
        backgroundImage: `linear-gradient(to right, ${gradientStops})`
    };
};

const TorrentTabs = ({ torrents = [], movieName, className }: { torrents: Torrent[] | undefined, movieName?: string, className?: string }) => {
    const resolutions = [...new Set(torrents.map(res => res?.quality))];
    resolutions.unshift('all');

    const gradientStyle = getResolutionGradient(resolutions);
    console.log('Gradient style:', gradientStyle);
    console.log('Resolutions:', resolutions);

    return (
        <section className={cn("torrrent-tabs", className)}>
            <Tabs defaultValue="all">
                <TabsList
                    className={cn(
                        "inset-shadow-sm inset-shadow-black/60",
                        "space-x-2 px-1",
                        "rounded-l-full rounded-r-full *:rounded-r-full *:rounded-l-full",
                    )}
                    style={gradientStyle}
                >
                    { resolutions.map(resolution => 
                        <TabsTrigger value={resolution} data-value={resolution} 
                            className="capitalize"
                        >
                            { resolution }
                        </TabsTrigger>
                    )}
                </TabsList>
                <TabsContent value="all">
                    <TorrentList torrents={torrents} movieName={movieName} />
                </TabsContent>
                { resolutions?.slice(1).map(resolution => {
                    const tors = torrents.filter(torrent => torrent.quality === resolution);
                    return (
                        <TabsContent key={resolution} value={resolution} asChild>
                            <TorrentList torrents={tors} movieName={movieName} />
                        </TabsContent>
                    );
                })}
            </Tabs>
        </section>
    );
}

export default TorrentTabs;