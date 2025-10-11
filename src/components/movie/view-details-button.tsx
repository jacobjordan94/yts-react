import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Button, buttonVariants } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface ViewDetailsButtonProps extends React.ComponentPropsWithoutRef<"button">, VariantProps<typeof buttonVariants> {
  movieId: number;
  asChild?: boolean;
}

const ViewDetailsButton = React.forwardRef<HTMLButtonElement, ViewDetailsButtonProps>(
  ({ movieId, asChild = false, variant = "outline", className, ...props }, ref) => {
    const Comp = asChild ? Slot : Button;
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/movie/${movieId}`);
    };

    return (
      <Comp
        ref={ref}
        data-variant={variant}
        variant={variant}
        onClick={handleClick}
        className={cn(className)}
        {...props}
      >
        View Details
      </Comp>
    );
  }
);

ViewDetailsButton.displayName = "ViewDetailsButton";

export { ViewDetailsButton };
export type { ViewDetailsButtonProps };
