import * as React from "react";
import { useNavigate } from "react-router";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ClampedTextProps extends React.ComponentPropsWithoutRef<"div"> {
  text: string;
  lines?: number;
  expandable?: boolean;
  asChild?: boolean;
  textClassName?: string;
  linkTo?: string;
}

const ClampedText = React.forwardRef<HTMLDivElement, ClampedTextProps>(
  ({ text, lines = 3, expandable = true, asChild = false, className, textClassName, linkTo, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    const [expanded, _setExpanded] = React.useState(false);
    const navigate = useNavigate();

    const shouldShowToggle = expandable && text.length > 200;

    function setExpanded(e: React.MouseEvent<HTMLButtonElement>, value: boolean) {
      e.preventDefault();
      _setExpanded(value);
    }

    function handleLinkClick(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      e.stopPropagation();
      if (linkTo) {
        navigate(linkTo);
      }
    }

    return (
      <Comp
        ref={ref}
        data-expanded={expanded}
        data-lines={lines}
        className={cn("space-y-2", className)}
        {...props}
      >
        <p
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: !expanded && shouldShowToggle ? lines : 'unset',
            overflow: 'hidden'
          }}
          className={cn("text-sm/tight text-white/80", textClassName)}
        >
          {text}
        </p>
        {shouldShowToggle && !linkTo && (
          <Button
            variant="ghost"
            size="sm"
            onClick={e => setExpanded(e, !expanded)}
            className="h-auto p-0 text-sm font-normal hover:bg-transparent hover:underline hover:text-white"
          >
            {expanded ? "Show less" : "Read more"}
          </Button>
        )}
        {shouldShowToggle && linkTo && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLinkClick}
            className="h-auto p-0 text-sm font-normal hover:bg-transparent hover:underline hover:text-white"
          >
            Read more
          </Button>
        )}
      </Comp>
    );
  }
);

ClampedText.displayName = "ClampedText";

export { ClampedText };
export type { ClampedTextProps };
