'use client';

import { Tabs as TabsPrimitive, useTabs, useTabsContext } from '@ark-ui/react/tabs';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type TabsVariant = 'default' | 'line';
type TabsSize = 'sm' | 'md' | 'lg';
type TabsStyleProps = { variant?: TabsVariant; size?: TabsSize; fitted?: boolean };
type TabsRootProps = ComponentProps<typeof TabsPrimitive.Root> & TabsStyleProps;
type TabsRootProviderProps = ComponentProps<typeof TabsPrimitive.RootProvider> & TabsStyleProps;

const Tabs = forwardRef<ComponentRef<typeof TabsPrimitive.Root>, TabsRootProps>(function Tabs(
  { className, variant = 'default', size = 'md', fitted = false, ...props },
  ref,
) {
  return (
    <TabsPrimitive.Root
      ref={ref}
      className={cn(
        'group/tabs box-border flex w-full min-w-0 flex-col gap-3 text-foreground [--_tabs-size:var(--moduix-size-md)] data-[orientation=vertical]:flex-row data-[size=lg]:[--_tabs-size:var(--moduix-size-lg)] data-[size=sm]:[--_tabs-size:var(--moduix-size-sm)]',
        className,
      )}
      {...props}
      data-variant={variant}
      data-size={size}
      data-fitted={fitted ? '' : undefined}
      data-slot="tabs-root"
    />
  );
});

const TabsRootProvider = forwardRef<
  ComponentRef<typeof TabsPrimitive.RootProvider>,
  TabsRootProviderProps
>(function TabsRootProvider(
  { className, variant = 'default', size = 'md', fitted = false, ...props },
  ref,
) {
  return (
    <TabsPrimitive.RootProvider
      ref={ref}
      className={cn(
        'group/tabs box-border flex w-full min-w-0 flex-col gap-3 text-foreground [--_tabs-size:var(--moduix-size-md)] data-[orientation=vertical]:flex-row data-[size=lg]:[--_tabs-size:var(--moduix-size-lg)] data-[size=sm]:[--_tabs-size:var(--moduix-size-sm)]',
        className,
      )}
      {...props}
      data-variant={variant}
      data-size={size}
      data-fitted={fitted ? '' : undefined}
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
        'relative isolate box-border inline-flex w-fit max-w-full gap-1 rounded-lg border border-border bg-muted p-1 group-data-[variant=line]/tabs:rounded-none group-data-[variant=line]/tabs:border-0 group-data-[variant=line]/tabs:bg-transparent data-[orientation=horizontal]:overflow-x-auto group-data-fitted/tabs:data-[orientation=horizontal]:w-full group-data-[variant=line]/tabs:data-[orientation=horizontal]:w-full group-data-[variant=line]/tabs:data-[orientation=horizontal]:border-b group-data-[variant=line]/tabs:data-[orientation=horizontal]:px-0 data-[orientation=vertical]:w-[min(12rem,40%)] data-[orientation=vertical]:flex-col group-data-[variant=line]/tabs:data-[orientation=vertical]:border-e group-data-[variant=line]/tabs:data-[orientation=vertical]:py-0',
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
        'box-border inline-flex h-[calc(var(--_tabs-size)-2*var(--moduix-spacing-1)-2*var(--moduix-border-width-sm))] cursor-pointer items-center justify-center gap-2 rounded-md border-0 bg-transparent px-2.5 text-sm font-medium whitespace-nowrap text-muted-foreground no-underline outline-0 transition-[color] duration-normal ease-in-out select-none group-data-[size=lg]/tabs:px-3 group-data-[size=lg]/tabs:text-md group-data-[size=sm]/tabs:px-2 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-selected:text-foreground group-data-fitted/tabs:data-[orientation=horizontal]:flex-1 [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:hover:text-foreground',
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
        'pointer-events-none top-(--top) left-(--left) -z-1 h-(--height) w-(--width) rounded-md bg-background shadow-sm [--transition-duration:var(--moduix-duration-normal)] [--transition-timing-function:var(--moduix-ease-in-out)] group-data-[variant=line]/tabs:rounded-full group-data-[variant=line]/tabs:bg-foreground group-data-[variant=line]/tabs:shadow-none group-data-[variant=line]/tabs:data-[orientation=horizontal]:top-auto group-data-[variant=line]/tabs:data-[orientation=horizontal]:bottom-0 group-data-[variant=line]/tabs:data-[orientation=horizontal]:h-0.5 group-data-[variant=line]/tabs:data-[orientation=vertical]:start-auto group-data-[variant=line]/tabs:data-[orientation=vertical]:end-0 group-data-[variant=line]/tabs:data-[orientation=vertical]:w-0.5',
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
        'box-border min-w-0 flex-1 rounded-lg border border-border bg-background p-4 text-sm leading-5 outline-0 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring',
        className,
      )}
      {...props}
      data-slot="tabs-content"
    />
  );
});

const TabsContext = TabsPrimitive.Context;

export {
  Tabs,
  TabsContext,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRootProvider,
  TabsTrigger,
  useTabs,
  useTabsContext,
};
export type {
  TabContentProps,
  TabIndicatorProps,
  TabListProps,
  TabsContextProps,
  TabsFocusChangeDetails,
  TabsValueChangeDetails,
  TabTriggerProps,
  UseTabsContext,
  UseTabsProps,
  UseTabsReturn,
} from '@ark-ui/react/tabs';
export type { TabsRootProps, TabsRootProviderProps, TabsSize, TabsVariant };