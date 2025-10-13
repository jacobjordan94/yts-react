import {
  MonitorPlay,
  Monitor,
  Tv,
  Glasses,
  type LucideIcon,
  Star,
  Tv2,
  Video,
} from "lucide-react";

export const QUALITY_ICONS: Record<string, LucideIcon> = {
  all: MonitorPlay,
  "480p": Tv,
  "720p": Monitor,
  "1080p": Tv2,
  "1080p.x265": Star,
  "2160p": Video,
  "3d": Glasses,
};

export const getQualityIcon = (quality: string): LucideIcon | undefined => {
  return QUALITY_ICONS[quality.toLowerCase()];
};
