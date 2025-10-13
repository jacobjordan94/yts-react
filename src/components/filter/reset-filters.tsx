import { Slot } from "@radix-ui/react-slot"
import { Button } from "../ui/button"
import React from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "../ui/button-variants";

interface ResetFiltersButtonProps extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    onFilterReset: (e: React.MouseEvent) => any;
}

const ResetFiltersButton = React.forwardRef<HTMLButtonElement, ResetFiltersButtonProps>(
    ({ asChild = false, className, variant = 'outline', size = 'default', onFilterReset, ...props }, ref) => {
        const Comp = asChild ? Slot : Button;
        return (
            <Comp
                {...props}
                ref={ref}
                variant={variant}
                size={size}
                className={cn("", className)}
                onMouseDown={e => onFilterReset(e)}
            >
                <Trash2 />
                Reset Filters
            </Comp>
        );
    }
);

ResetFiltersButton.displayName = "ResetFiltersButton";

export { ResetFiltersButton };
export type { ResetFiltersButtonProps };