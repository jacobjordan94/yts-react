import { forwardRef } from 'react';
import { MovieCardBase, type MovieCardBaseProps } from './movie-card-base';
import { MoviePoster } from './movie-poster';
import { MovieTitle } from './movie-title';
import { GenreBadges } from './genre-badges';
import {
    CardContent,
    CardTitle,
    CardDescription,
    CardFooter,
    CardHeader,
    CardAction,
} from '../ui/card';
import { cn } from '@/lib/utils';
import { MovieText } from './movie-text';
import {
    Download,
    EllipsisVertical,
    ExternalLink,
    FileDown,
    Magnet,
    Youtube,
} from '@/components/icons/lucide';
import Icons from '../icons';
import { YoutubeDialogContent } from '../dialogs/youtube';
import type { Movie } from '@/hooks';
import {
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuShortcut,
    DropdownMenuPortal,
    DropdownMenuSubContent,
} from '../ui/dropdown-menu';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { MagnetLink } from '../ui/magnet-link';
import { QualityBadge, TorrentQualityInfo, TorrentSize } from '../torrent';
import { DownloadLink } from '../ui/download-link';
import { RatingDisplay } from './rating-display';
import { RuntimeDisplay } from './runtime-display';

interface MovieDetailedCardProps extends Omit<MovieCardBaseProps, 'children'> {
    movie?: Movie;
    loading?: boolean;
    skeleton?: boolean;
    onGenreClick?: (genre: string) => void;
}

const MovieDetailedCard = forwardRef<HTMLDivElement, MovieDetailedCardProps>(
    ({ movie, loading = false, skeleton = false, onGenreClick, className, ...props }, ref) => {
        const ready = !skeleton && !loading && !!movie;
        return (
            <MovieCardBase
                data-ready={ready}
                ref={ref}
                onGenreClick={onGenreClick}
                className={cn(
                    'gap-0 flex flex-col p-0 data-[ready=false]:shadow-none overflow-hidden bg-transparent',
                    className
                )}
                {...props}
            >
                <div className="flex-1 flex">
                    <MoviePoster
                        src={movie?.medium_cover_image}
                        alt={movie?.title}
                        loading={!ready}
                        className="sm:rounded-r-none flex-1"
                    />
                </div>
                <div
                    className={cn(
                        'p-4 flex flex-col items-stretch absolute bottom-0 w-full from-black/75 from-85% to-transparent text-shadow-black/50 text-shadow-md',
                        ready && 'bg-gradient-to-t'
                    )}
                >
                    <CardHeader className="p-0 gap-0 flex-[0]!">
                        <CardTitle>
                            <MovieTitle
                                title={movie?.title}
                                year={movie?.year}
                                size="xl"
                                truncate
                            />
                        </CardTitle>
                        <CardAction>
                            <CardDropdown movie={movie} />
                        </CardAction>
                    </CardHeader>
                    <div className="flex flex-col flex-1 items-stretch">
                        <CardContent asChild className="p-0 flex-1">
                            <div className="flex flex-col mt-4 gap-1 flex-[0]!">
                                <RuntimeDisplay loading={!ready} runtime={movie?.runtime ?? 0} />
                                <div className="flex gap-2">
                                    <RatingDisplay loading={!ready} rating={movie?.rating ?? 0} />
                                    {movie?.mpa_rating && <span>{movie?.mpa_rating}</span>}
                                </div>
                                <CardDescription>
                                    <MovieText link className="mt-2" movie={movie} />
                                </CardDescription>
                            </div>
                        </CardContent>
                        <CardFooter className="p-0 inline-flex items-end flex-1 mt-2">
                            <GenreBadges
                                loading={loading}
                                genres={movie?.genres}
                                limit={3}
                                onGenreClick={onGenreClick}
                                loadingClass="text-shadow-none"
                                className="flex-wrap"
                            />
                        </CardFooter>
                    </div>
                </div>
            </MovieCardBase>
        );
    }
);

MovieDetailedCard.displayName = 'MovieDetailedCard';

function CardDropdown({ movie }: { movie?: Movie }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                data-ready={!!movie}
                disabled={!movie}
                className="data-[ready=true]:text-white text-accent"
            >
                <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-semibold text-muted-foreground fill-muted-foreground">
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                            `https://www.imdb.com/title/${movie?.imdb_code}`,
                            '_blank',
                            'noopener,noreferrer'
                        );
                    }}
                    className="group hover:fill-white"
                >
                    <Icons.IMDB />
                    IMDB
                    <DropdownMenuShortcut>
                        <ExternalLink className="group-hover:text-white" />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="group hover:fill-white">
                        <Download className="group-hover:text-white" />
                        Download
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="bg-background">
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <Magnet />
                                    Magnet Link
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {movie?.torrents.map((torrent, i) => (
                                            <DropdownMenuItem
                                                key={i}
                                                asChild
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <MagnetLink
                                                    hash={torrent.hash}
                                                    movieName={movie.title}
                                                >
                                                    <QualityBadge quality={torrent.quality} />
                                                    <TorrentSize size={torrent.size} />
                                                    <TorrentQualityInfo torrent={torrent} />
                                                </MagnetLink>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <FileDown />
                                    Torrent File
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {movie?.torrents.map((torrent, i) => (
                                            <DropdownMenuItem
                                                key={i}
                                                asChild
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <DownloadLink href={torrent.url}>
                                                    <QualityBadge quality={torrent.quality} />
                                                    <TorrentSize size={torrent.size} />
                                                    <TorrentQualityInfo torrent={torrent} />
                                                </DownloadLink>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                {movie?.yt_trailer_code && (
                    <Dialog>
                        <DialogTrigger className="w-full" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                }}
                            >
                                <Youtube className="group-hover:text-white" />
                                Youtube
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <YoutubeDialogContent id={movie?.yt_trailer_code} />
                    </Dialog>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export { MovieDetailedCard };
export type { MovieDetailedCardProps };
