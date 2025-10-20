import { useState, forwardRef, useEffect, useRef, type FormEvent } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from '@/components/icons/lucide';

interface SearchSlideOutProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchSlideOut = forwardRef<HTMLDivElement, SearchSlideOutProps>(
    ({ value, onChange, onSubmit, placeholder = 'Search movies...', className }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const inputRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (isOpen && inputRef.current) {
                inputRef.current.focus();
            }
        }, [isOpen]);

        const handleSubmit = (e: FormEvent) => {
            e.preventDefault();
            onSubmit?.(value);
        };

        const handleClear = () => {
            onChange('');
            setIsOpen(false);
        };

        return (
            <div ref={ref} className={cn('relative flex items-center', className)}>
                <div
                    className={cn(
                        'flex items-center gap-2 transition-all duration-300 ease-in-out overflow-hidden',
                        isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
                    )}
                >
                    <form onSubmit={handleSubmit} className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            ref={inputRef}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={placeholder}
                            className="pl-10 pr-10"
                        />
                        {value && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                onClick={handleClear}
                                className="absolute right-1 top-1/2 -translate-y-1/2"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </form>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn('shrink-0', isOpen && 'ml-2')}
                >
                    <Search className="h-5 w-5" />
                </Button>
            </div>
        );
    }
);

SearchSlideOut.displayName = 'SearchSlideOut';

export { SearchSlideOut };
export type { SearchSlideOutProps };
