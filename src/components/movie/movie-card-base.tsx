import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

interface MovieCardBaseProps extends React.ComponentPropsWithoutRef<"div"> {
  onGenreClick?: (genre: string) => void;
  asChild?: boolean;
  background?: boolean;
}

const MovieCardBase = React.forwardRef<HTMLDivElement, MovieCardBaseProps>(
  ({ onGenreClick, asChild = false, background = false, className, onClick, children, ...props }, ref) => {
    const Comp = asChild ? Slot : Card;

    return (
      <Comp
        ref={ref}
        data-background={background}
        data-clickable={!!onClick}
        className={cn(
          "group/movieCard flex flex-col transition-transform border-0 data-[background=true]:bg-radial from-white/20 to-transparent",
          "data-[clickable=true]:cursor-pointer data-[clickable=true]:hover:scale-105",
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

MovieCardBase.displayName = "MovieCardBase";

export { MovieCardBase };
export type { MovieCardBaseProps };
