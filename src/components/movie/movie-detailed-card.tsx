import * as React from "react";
import { MovieCardBase, type MovieCardBaseProps } from "./movie-card-base";
import { MoviePoster } from "./movie-poster";
import { MovieTitle } from "./movie-title";
import { GenreBadges } from "./genre-badges";
import { CardContent, CardTitle, CardDescription, CardFooter, CardHeader, CardAction } from "../ui/card";
import { cn } from "@/lib/utils";
import { MovieText } from "./movie-text";
import { Download, EllipsisVertical, ExternalLink, FileDown, Magnet, Youtube } from "lucide-react";
import Icons from "../icons";
import { YoutubeDialogContent } from "../dialogs/youtube";
import type { Movie } from "@/hooks";
import { DropdownMenuItem, DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuShortcut, DropdownMenuPortal, DropdownMenuSubContent } from "../ui/dropdown-menu";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { MagnetLink } from "../ui/magnet-link";
import { QualityBadge, TorrentQualityInfo, TorrentSize } from "../torrent";
import { DownloadLink } from "../ui/download-link";
import { RatingDisplay } from "./rating-display";
import { RuntimeDisplay } from "./runtime-display";

interface MovieDetailedCardProps extends Omit<MovieCardBaseProps, "children"> {
  movie?: Movie;
  loading?: boolean;
  skeleton?: boolean;
}

const MovieDetailedCard = React.forwardRef<HTMLDivElement, MovieDetailedCardProps>(
  ({ movie, loading = false, skeleton = false, onGenreClick, className, ...props }, ref) => {
    const ready = !skeleton && !loading && !!movie;
    return (
      <MovieCardBase
        data-ready={ready}
        ref={ref}
        onGenreClick={onGenreClick}
        className={cn(
          "gap-0 flex flex-col sm:flex-row *:flex-1/2 p-0 overflow-hidden",
          "data-[ready=false]:[background-image:unset] data-[ready=false]:bg-transparent",
          "data-[ready=false]:shadow-none",
          className
        )}
        {...props}
      >
        <MoviePoster
          src={movie?.medium_cover_image}
          alt={movie?.title}
          loading={!ready}
          className="sm:rounded-r-none *:h-full w-full aspect-auto flex-1/2"
        />
        <div className="p-4 flex-1/2 flex flex-col items-stretch">
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
                  { movie?.mpa_rating && <span>{ movie?.mpa_rating }</span> }
                </div>
                <CardDescription>
                  <MovieText link className="mt-2" movie={movie} />
                </CardDescription>
              </div>
            </CardContent>
            <CardFooter className="p-0 inline-flex items-end">
              <GenreBadges
                loading={loading}
                genres={movie?.genres}
                limit={3}
                onGenreClick={onGenreClick}
              />
            </CardFooter>
          </div>
        </div>
      </MovieCardBase>
    );
  }
);

MovieDetailedCard.displayName = "MovieDetailedCard";

function CardDropdown({ movie }: { movie?: Movie }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger data-ready={!!movie} disabled={!movie} className="data-[ready=true]:text-white text-accent">
          <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-semibold text-muted-foreground fill-muted-foreground">
        <DropdownMenuItem 
          onClick={() => {
            window.open(`https://www.imdb.com/title/${movie?.imdb_code}`, '_blank', 'noopener,noreferrer');
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
                  {
                    movie?.torrents.map((torrent, i) => 
                      <DropdownMenuItem key={i} asChild>
                        <MagnetLink hash={torrent.hash} movieName={movie.title}>
                          <QualityBadge quality={torrent.quality} />
                          <TorrentSize size={torrent.size} />
                          <TorrentQualityInfo torrent={torrent} />
                        </MagnetLink>
                      </DropdownMenuItem>
                    )
                  }
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
                  {
                    movie?.torrents.map((torrent, i) => 
                      <DropdownMenuItem key={i} asChild>
                        <DownloadLink href={torrent.url}>
                          <QualityBadge quality={torrent.quality} />
                          <TorrentSize size={torrent.size} />
                          <TorrentQualityInfo torrent={torrent} />
                        </DownloadLink>
                      </DropdownMenuItem>
                    )
                  }
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        { movie?.yt_trailer_code &&
          <Dialog>
            <DialogTrigger className="w-full">
              <DropdownMenuItem onSelect={e => e.preventDefault()}>
                <Youtube className="group-hover:text-white" />
                Youtube
              </DropdownMenuItem>
            </DialogTrigger>
            <YoutubeDialogContent id={movie?.yt_trailer_code} />
          </Dialog>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { MovieDetailedCard };
export type { MovieDetailedCardProps };

{/* <CardAction className="h-full flex items-center">
  { movie?.yt_trailer_code && (
    <div
      onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
      onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
    >
      <YoutubeDialog id={ movie.yt_trailer_code }>
        <Button variant="ghost" size="icon-lg">
          <Youtube className="p-3 size-full" />
        </Button>
      </YoutubeDialog>
    </div>
  )}
  <Button
    variant="ghost"
    size="icon-lg"
    className="rounded-none"
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      window.open(`https://www.imdb.com/title/${movie?.imdb_code}`, '_blank', 'noopener,noreferrer');
    }}
  >
    <Icons.IMDB className="p-3 size-full fill-imdb" />
  </Button>
</CardAction> */}