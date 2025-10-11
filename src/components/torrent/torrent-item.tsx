import * as React from "react";
import { QualityBadge } from "./quality-badge";
import { TorrentQualityInfo } from "./torrent-quality-info";
import { TorrentStats } from "./torrent-stats";
import { TorrentSize } from "./torrent-size";
import type { Torrent } from "@/hooks";
import { DownloadLink } from "../ui/download-link";
import { Button } from "../ui/button";
import { Disc3, FileDown, GlobeIcon, Magnet } from "lucide-react";
import { MagnetLink } from "../ui/magnet-link";
import { Item, ItemMedia, ItemContent, ItemActions } from "../ui/item";
import { cva } from "class-variance-authority";

const torrentItemVariants = cva("", {
  variants: {
    selected: {
      true: "border-primary bg-primary/5",
      false: "",
    },
    available: {
      true: "",
      false: "opacity-50",
    },
  },
  defaultVariants: {
    selected: false,
    available: true,
  },
});

interface TorrentItemProps extends Omit<React.ComponentPropsWithoutRef<typeof Item>, "onSelect"> {
  torrent: Torrent;
  selected?: boolean;
  movieName?: string;
  onSelect?: (torrent: Torrent) => void;
}

const TorrentItem = React.forwardRef<HTMLDivElement, TorrentItemProps>(
  ({ torrent, selected = false, onSelect, movieName, className, ...props }, ref) => {
    const available = torrent.seeds > 0;

    return (
      <Item
        ref={ref}
        variant="glass"
        className={torrentItemVariants({ selected, available, className })}
        onClick={() => onSelect?.(torrent)}
        {...props}
      >
        <ItemMedia className="pe-1">
          <div className="aspect-square relative">
            <QualityBadge data-quality={torrent.quality} className="scale-75 px-1 absolute -bottom-1 -right-4 data-[quality=2160p]:-right-2 text-[12px] z-10" quality={torrent.quality} />
            { torrent.type === 'bluray' && <Disc3 className="-rotate-45 text-white size-10" /> }
            { torrent.type === 'web' && <GlobeIcon className="text-white size-10" /> }
          </div>
        </ItemMedia>
        <ItemContent>
          <TorrentQualityInfo className="font-semibold text-white" torrent={torrent} detailed />
          <TorrentStats className="text-white/80" seeds={torrent.seeds} peers={torrent.peers} />
        </ItemContent>
        <ItemContent>
          <TorrentSize className="text-white/60" size={torrent.size} sizeBytes={torrent.size_bytes} />
        </ItemContent>
        <ItemActions className="text-white *:hover:bg-white/20 *:hover:text-white">
          <DownloadLink href={torrent.url} asChild>
            <Button variant="ghost" size="icon">
              <FileDown />
            </Button>
          </DownloadLink>
          <MagnetLink hash={torrent.hash} movieName={movieName} asChild>
            <Button variant="ghost" size="icon">
              <Magnet />
            </Button>
          </MagnetLink>
        </ItemActions>
      </Item>
    );
  }
);

TorrentItem.displayName = "TorrentItem";

export { TorrentItem };
export type { TorrentItemProps };
