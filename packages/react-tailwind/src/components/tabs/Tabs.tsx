'use client';

import { Tabs as TabsPrimitive, useTabs, useTabsContext } from '@ark-ui/react/tabs';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type TabsVariant = 'default' | 'line';

const TabsRoot = forwardRef<
  ComponentRef<typeof TabsPrimitive.Root>,
  ComponentProps<typeof TabsPrimitive.Root> & { variant?: TabsVariant }
>(function TabsRoot({ className, orientation, variant = 'default', ...props }, ref) {
  const resolvedVariant = orientation === 'vertical' ? 'default' : variant;

  return (
    <TabsPrimitive.Root
      ref={ref}
      data-variant={resolvedVariant}
      className={cn(
        'group/tabs box-border flex w-full min-w-0 flex-col gap-3 text-foreground data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch',
        className,
      )}
      orientation={orientation}
      {...props}
      data-slot="tabs-root"
    />
  );
});

const TabsRootProvider = forwardRef<
  ComponentRef<typeof TabsPrimitive.RootProvider>,
  ComponentProps<typeof TabsPrimitive.RootProvider> & { variant?: TabsVariant }
>(function TabsRootProvider({ className, value, variant = 'default', ...props }, ref) {
  const orientation = (
    value.getRootProps() as {
      'data-orientation'?: 'horizontal' | 'vertical';
    }
  )['data-orientation'];
  const resolvedVariant = orientation === 'vertical' ? 'default' : variant;

  return (
    <TabsPrimitive.RootProvider
      ref={ref}
      data-variant={resolvedVariant}
      className={cn(
        'group/tabs box-border flex w-full min-w-0 flex-col gap-3 text-foreground data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch',
        className,
      )}
      value={value}
      {...props}
      data-slot="tabs-root-provider"
    />
  );
});

const TabsList = forwardRef<
  ComponentRef<typeof TabsPrimitive.List>,
  ComponentProps<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'relative z-0 inline-flex w-fit max-w-full items-stretch gap-1 rounded-lg border border-border bg-muted p-1 group-data-[orientation=horizontal]/tabs:overflow-x-auto group-data-[orientation=vertical]/tabs:w-48 group-data-[orientation=vertical]/tabs:min-w-48 group-data-[orientation=vertical]/tabs:flex-col group-data-[variant=line]/tabs:w-full group-data-[variant=line]/tabs:rounded-none group-data-[variant=line]/tabs:border-x-0 group-data-[variant=line]/tabs:border-t-0 group-data-[variant=line]/tabs:bg-transparent group-data-[variant=line]/tabs:px-0 group-data-[orientation=vertical]/tabs:max-[30rem]:w-2/5 group-data-[orientation=vertical]/tabs:max-[30rem]:min-w-0',
        className,
      )}
      {...props}
      data-slot="tabs-list"
    />
  );
});

const TabsTrigger = forwardRef<
  ComponentRef<typeof TabsPrimitive.Trigger>,
  ComponentProps<typeof TabsPrimitive.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative z-1 inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border-0 bg-transparent px-2.5 text-sm leading-5 font-medium whitespace-nowrap text-muted-foreground no-underline outline-0 transition-[color,opacity] duration-200 ease-in-out select-none focus-visible:before:pointer-events-none focus-visible:before:absolute focus-visible:before:inset-0 focus-visible:before:rounded-[inherit] focus-visible:before:outline-1 focus-visible:before:outline-ring focus-visible:before:content-[''] disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-selected:text-foreground motion-reduce:transition-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:hover:text-foreground",
        className,
      )}
      {...props}
      data-slot="tabs-trigger"
    />
  );
});

const TabsIndicator = forwardRef<
  ComponentRef<typeof TabsPrimitive.Indicator>,
  ComponentProps<typeof TabsPrimitive.Indicator>
>(function TabsIndicator({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Indicator
      ref={ref}
      className={cn(
        'pointer-events-none absolute top-1/2 left-[var(--left,0)] z-0 h-8 w-[var(--width,0)] -translate-y-1/2 rounded-md bg-background shadow-sm transition-[var(--transition-property,translate)] duration-200 ease-in-out group-data-[orientation=vertical]/tabs:top-[var(--top,0)] group-data-[orientation=vertical]/tabs:left-1/2 group-data-[orientation=vertical]/tabs:h-[var(--height,0)] group-data-[orientation=vertical]/tabs:w-[calc(100%-0.5rem)] group-data-[orientation=vertical]/tabs:-translate-x-1/2 group-data-[orientation=vertical]/tabs:translate-y-0 group-data-[variant=line]/tabs:top-auto group-data-[variant=line]/tabs:bottom-0 group-data-[variant=line]/tabs:h-0.5 group-data-[variant=line]/tabs:[translate:none] group-data-[variant=line]/tabs:rounded-full group-data-[variant=line]/tabs:bg-foreground group-data-[variant=line]/tabs:shadow-none motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="tabs-indicator"
    />
  );
});

const TabsContent = forwardRef<
  ComponentRef<typeof TabsPrimitive.Content>,
  ComponentProps<typeof TabsPrimitive.Content>
>(function TabsContent({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "box-border min-w-0 flex-1 rounded-lg border border-border bg-background p-4 text-sm leading-5 text-foreground outline-0 focus-visible:rounded-[inherit] focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring [&[hidden]:not([hidden='until-found'])]:hidden",
        className,
      )}
      {...props}
      data-slot="tabs-content"
    />
  );
});

const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  RootProvider: TabsRootProvider,
  Context: TabsPrimitive.Context,
  List: TabsList,
  Trigger: TabsTrigger,
  Indicator: TabsIndicator,
  Content: TabsContent,
  useTabs,
});

export { Tabs, useTabs, useTabsContext };