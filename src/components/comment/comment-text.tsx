import { type ComponentPropsWithoutRef, forwardRef, useState } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CommentTextProps extends ComponentPropsWithoutRef<'p'> {
    text: string;
    lines?: number;
    expandable?: boolean;
    asChild?: boolean;
}

const CommentText = forwardRef<HTMLParagraphElement, CommentTextProps>(
    ({ text, lines = 3, expandable = true, asChild = false, className, ...props }, ref) => {
        const Comp = asChild ? Slot : 'p';
        const [expanded, setExpanded] = useState(false);

        const shouldShowToggle = expandable && text.length > 150;

        return (
            <div data-expanded={expanded} data-lines={lines}>
                <Comp
                    ref={ref}
                    className={cn(
                        'text-sm text-foreground',
                        !expanded && shouldShowToggle && `line-clamp-${lines}`,
                        className
                    )}
                    {...props}
                >
                    {text}
                </Comp>
                {shouldShowToggle && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpanded(!expanded)}
                        className="mt-1 h-auto p-0 text-xs font-normal text-muted-foreground hover:bg-transparent hover:text-foreground hover:underline"
                    >
                        {expanded ? 'Show less' : 'Read more'}
                    </Button>
                )}
            </div>
        );
    }
);

CommentText.displayName = 'CommentText';

export { CommentText };
export type { CommentTextProps };
