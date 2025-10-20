import { ArrowUpRight, ChevronDown } from '@/components/icons/lucide';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type OrderSelectProps = {
    orderBy?: 'asc' | 'desc';
    onOrderChange: (value: 'asc' | 'desc') => void;
    className?: string;
};
const OrderSelect = forwardRef<HTMLButtonElement, OrderSelectProps>(
    ({ orderBy, onOrderChange, className, ...props }, ref) => {
        return (
            <Button
                {...props}
                ref={ref}
                variant="outline"
                onClick={() => onOrderChange(orderBy === 'asc' ? 'desc' : 'asc')}
                data-order={orderBy}
                className={cn('capitalize font-semibold w-[84px] justify-between', className)}
            >
                <div className="flex gap-2 items-center">
                    <ArrowUpRight
                        className={cn(
                            'h-4 w-4 transition-transform opacity-50',
                            orderBy === 'desc' && 'rotate-90'
                        )}
                    />
                    {orderBy}
                </div>
                <ChevronDown
                    className={cn(
                        'h-4 w-4 transition-transform opacity-35',
                        orderBy === 'asc' && 'rotate-180'
                    )}
                />
            </Button>
        );
    }
);

OrderSelect.displayName = 'OrderSelect';

export { OrderSelect };
export type { OrderSelectProps };
