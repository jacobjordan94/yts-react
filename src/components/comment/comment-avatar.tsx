import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface CommentAvatarProps extends ComponentPropsWithoutRef<typeof Avatar> {
    src?: string;
    username: string;
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    asChild?: boolean;
}

const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
};

const CommentAvatar = forwardRef<HTMLDivElement, CommentAvatarProps>(
    (
        { src, username, size = 'md', loading = false, asChild = false, className, ...props },
        ref
    ) => {
        const Comp = asChild ? Slot : Avatar;

        if (loading) {
            return (
                <Skeleton
                    data-loading={loading}
                    data-size={size}
                    className={cn('rounded-full', sizeClasses[size], className)}
                />
            );
        }

        const initials = username
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

        return (
            <Comp
                ref={ref}
                data-loading={loading}
                data-size={size}
                className={cn(sizeClasses[size], className)}
                {...props}
            >
                <AvatarImage src={src} alt={username} />
                <AvatarFallback>{initials}</AvatarFallback>
            </Comp>
        );
    }
);

CommentAvatar.displayName = 'CommentAvatar';

export { CommentAvatar };
export type { CommentAvatarProps };
