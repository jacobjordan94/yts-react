import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface PageBackgroundProps extends React.ComponentPropsWithoutRef<"div"> {
  image?: string;
  blur?: number;
  darkness?: number;
  asChild?: boolean;
}

const PageBackground = React.forwardRef<HTMLDivElement, PageBackgroundProps>(
  ({ image, blur = 8, darkness = 0.7, asChild = false, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        data-has-image={!!image}
        className={cn("relative min-h-screen", className)}
        {...props}
      >
        {image && (
          <>
            {/* Background Image Layer */}
            <div
              className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${image})`,
                filter: `blur(${blur}px)`,
              }}
            />
            {/* Darkness Overlay */}
            <div
              className="absolute inset-0 -z-10 bg-black"
              style={{
                opacity: darkness,
              }}
            />
            {/* Gradient Overlay (transparent to background color) */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)`,
              }}
            />
          </>
        )}
        {children}
      </Comp>
    );
  }
);

PageBackground.displayName = "PageBackground";

export { PageBackground };
export type { PageBackgroundProps };
