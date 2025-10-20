import { WifiOff } from '@/components/icons/lucide';
import useOnline from '@/hooks/use-online';

export function OfflineIndicator() {
    const isOnline = useOnline();

    if (isOnline) return null;

    return (
        <div
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5"
            role="status"
            aria-live="polite"
            aria-atomic="true"
        >
            <div className="flex items-center gap-2 rounded-full bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow-lg">
                <WifiOff className="h-4 w-4" aria-hidden="true" />
                <span>You are currently offline</span>
            </div>
        </div>
    );
}
