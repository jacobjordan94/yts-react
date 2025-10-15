import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QualityIcon } from "../icons";
import { cn } from "@/lib/utils";

interface QualitySelectProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

const QUALITIES = ["all", "480p", "720p", "1080p", "1080p.x265", "2160p", "3D"];

const QualitySelect = React.forwardRef<HTMLButtonElement, QualitySelectProps>(
  ({ value, onChange, className }, ref) => {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger ref={ref} className={cn("font-semibold", className)}>
          <SelectValue placeholder="All Qualities" />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          {QUALITIES.map((quality) => (
            <SelectItem key={quality} value={quality}>
              <QualityIcon quality={quality} />
              { quality.at(0)?.toUpperCase() + quality.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

QualitySelect.displayName = "QualitySelect";

export { QualitySelect };
export type { QualitySelectProps };
