import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { PlayCircle } from "lucide-react";

interface TrailerButtonProps extends React.ComponentPropsWithoutRef<"button">, VariantProps<typeof buttonVariants> {
  trailerCode?: string;
  available?: boolean;
  asChild?: boolean;
}

const TrailerButton = React.forwardRef<HTMLButtonElement, TrailerButtonProps>(
  ({ trailerCode, available = true, asChild = false, variant = "outline", className, ...props }, ref) => {
    const Comp = asChild ? Slot : Button;

    const handleClick = () => {
      if (trailerCode) {
        window.open(`https://www.youtube.com/watch?v=${trailerCode}`, "_blank");
      }
    };

    return (
      <Comp
        ref={ref}
        data-available={available}
        data-variant={variant}
        variant={variant}
        disabled={!available || !trailerCode}
        onClick={handleClick}
        className={cn("data-[available=false]:cursor-not-allowed data-[available=false]:opacity-50", className)}
        {...props}
      >
        <PlayCircle className="h-4 w-4" />
        Play Trailer
      </Comp>
    );
  }
);

TrailerButton.displayName = "TrailerButton";

export { TrailerButton };
export type { TrailerButtonProps };
