import { Button } from '../ui/button';
import { Download, FileDown, Magnet } from '@/components/icons/lucide';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuPortal,
    DropdownMenuItem,
    DropdownMenuSubContent,
} from '../ui/dropdown-menu';
import type { Torrent } from '@/hooks';
import { TorrentQualityInfo } from './torrent-quality-info';
import { TorrentSize } from './torrent-size';
import { QualityBadge } from './quality-badge';
import { DownloadLink } from '../ui/download-link';
import { MagnetLink } from '../ui/magnet-link';
import type { ReactNode } from 'react';

const DownloadDropdown = ({
    movieTitle,
    torrents,
    children,
}: {
    movieTitle: string | undefined;
    torrents: Torrent[] | undefined;
    children?: ReactNode;
}) =>
    torrents && (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children || (
                    <Button>
                        <Download />
                        Download
                    </Button>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Magnet />
                        Magnet Link
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            {torrents.map((dl, i) => (
                                <DropdownMenuItem key={i} asChild>
                                    <MagnetLink hash={dl.hash} movieName={movieTitle || ''}>
                                        <QualityBadge quality={dl.quality} />
                                        <TorrentSize size={dl.size} />
                                        <TorrentQualityInfo torrent={dl} />
                                    </MagnetLink>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <FileDown />
                        Torrent
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            {torrents.map((dl, i) => (
                                <DropdownMenuItem key={i} asChild>
                                    <DownloadLink href={dl.url}>
                                        <QualityBadge quality={dl.quality} />
                                        <TorrentSize size={dl.size} />
                                        <TorrentQualityInfo torrent={dl} />
                                    </DownloadLink>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );

export { DownloadDropdown };
export default DownloadDropdown;
