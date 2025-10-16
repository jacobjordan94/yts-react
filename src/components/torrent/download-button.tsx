import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import type { Torrent } from '@/hooks';
import type { VariantProps } from 'class-variance-authority';
import { Download } from 'lucide-react';

interface DownloadButtonProps
    extends React.ComponentPropsWithoutRef<'button'>,
        VariantProps<typeof buttonVariants> {
    torrent: Pick<Torrent, 'url' | 'hash'>;
    disabled?: boolean;
    asChild?: boolean;
}

const DownloadButton = React.forwardRef<HTMLButtonElement, DownloadButtonProps>(
    (
        { torrent, disabled = false, asChild = false, variant = 'default', className, ...props },
        ref
    ) => {
        const Comp = asChild ? Slot : Button;

        const handleDownload = () => {
            if (torrent.url) {
                window.open(torrent.url, '_blank');
            }
        };

        return (
            <Comp
                ref={ref}
                data-disabled={disabled}
                variant={variant}
                disabled={disabled}
                onClick={handleDownload}
                className={cn(className)}
                {...props}
            >
                <Download className="h-4 w-4" />
                Download
            </Comp>
        );
    }
);

DownloadButton.displayName = 'DownloadButton';

export { DownloadButton };
export type { DownloadButtonProps };
