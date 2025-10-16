import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            className={cn('flex flex-col gap-2', className)}
            {...props}
        />
    );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            className={cn(
                'bg-muted text-muted-foreground inline-flex h-fit w-fit items-center justify-center p-1 space-x-2 rounded-l-full rounded-r-full',
                className
            )}
            {...props}
        />
    );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                // "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                'data-[state=active]:drop-shadow-sm data-[state=active]:drop-shadow-black/50 data-[state=active]:text-white',
                'bg-radial from-transparent to-white/10 data-[value=3D]:bg-three-d data-[value=480p]:bg-standard-def data-[value=720p]:bg-hd data-[value=1080p]:bg-full-hd data-[value=2160p]:bg-uhd',
                'transition-opacity cursor-pointer hover:opacity-90 text-[16px] [line-height:16px] min-w-12 py-1 px-2 rounded-sm border-1 border-white/40 text-white/60 font-semibold opacity-60 data-[state=active]:opacity-100',
                'rounded-s-full rounded-e-full',
                className
            )}
            {...props}
        />
    );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn('flex-1 outline-none', className)}
            {...props}
        />
    );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
