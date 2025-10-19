import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Youtube } from 'lucide-react';
import { AspectRatio } from '../ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface YoutubeDialogProps {
    id: string;
    children?: React.ReactNode;
    showIcon?: boolean;
    showLabel?: boolean;
    onOpenChange?: (open: boolean) => void;
}
const YoutubeDialog = React.forwardRef<HTMLButtonElement, YoutubeDialogProps>(
    ({ id, children, showIcon = true, showLabel = false, onOpenChange }, ref) => {
        return (
            <Dialog onOpenChange={onOpenChange}>
                <DialogTrigger asChild ref={ref}>
                    {children || (
                        <Button variant="ghost">
                            {showIcon && <Youtube />}
                            {showLabel && <span>Play Trailer</span>}
                        </Button>
                    )}
                </DialogTrigger>
                <YoutubeDialogContent id={id} />
            </Dialog>
        );
    }
);

YoutubeDialog.displayName = 'YoutubeDialog';

export function YoutubeDialogContent({ id }: { id: number | string }) {
    const [state, setState] = useState({ loading: true, error: false });
    return (
        <DialogContent
            showCloseButton={false}
            className="p-0 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            <VisuallyHidden>
                <DialogTitle>Youtube: {id}</DialogTitle>
            </VisuallyHidden>
            <AspectRatio asChild ratio={16 / 9}>
                <div
                    data-loaded={!state.loading}
                    className="group/youtubeDialog bg-white/50 animate-pulse data-[loaded=true]:animate-none"
                >
                    <iframe
                        src={`https://youtube.com/embed/${id}`}
                        loading="lazy"
                        onLoad={() => setState({ loading: false, error: false })}
                        onError={() => setState({ loading: false, error: true })}
                        className={cn(
                            'size-full',
                            'duration-500 opacity-0 group-data-[loaded=true]/youtubeDialog:opacity-100'
                        )}
                    />
                </div>
            </AspectRatio>
        </DialogContent>
    );
}

export default YoutubeDialog;
