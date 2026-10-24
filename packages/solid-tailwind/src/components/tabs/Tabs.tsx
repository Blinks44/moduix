import { Tabs as TabsPrimitive, useTabs, useTabsContext } from '@ark-ui/solid/tabs';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type TabsVariant = 'default' | 'line';
type TabsSize = 'sm' | 'md' | 'lg';
type TabsStyleProps = { variant?: TabsVariant; size?: TabsSize; fitted?: boolean };
type TabsRootProps = ComponentProps<typeof TabsPrimitive.Root> & TabsStyleProps;
type TabsRootProviderProps = ComponentProps<typeof TabsPrimitive.RootProvider> & TabsStyleProps;

function Tabs(props: TabsRootProps) {
  const [local, others] = splitProps(props, ['class', 'variant', 'size', 'fitted']);

  return (
    <TabsPrimitive.Root
      class={cn(
        'group/tabs box-border flex w-full min-w-0 flex-col gap-3 text-foreground [--_tabs-size:var(--moduix-size-md)] data-[orientation=vertical]:flex-row data-[size=lg]:[--_tabs-size:var(--moduix-size-lg)] data-[size=sm]:[--_tabs-size:var(--moduix-size-sm)]',
        local.class,
      )}
      {...others}
      data-variant={local.variant ?? 'default'}
      data-size={local.size ?? 'md'}
      data-fitted={local.fitted ? '' : undefined}
      data-slot="tabs-root"
    />
  );
}

function TabsRootProvider(props: TabsRootProviderProps) {
  const [local, others] = splitProps(props, ['class', 'variant', 'size', 'fitted']);

  return (
    <TabsPrimitive.RootProvider
      class={cn(
        'group/tabs box-border flex w-full min-w-0 flex-col gap-3 text-foreground [--_tabs-size:var(--moduix-size-md)] data-[orientation=vertical]:flex-row data-[size=lg]:[--_tabs-size:var(--moduix-size-lg)] data-[size=sm]:[--_tabs-size:var(--moduix-size-sm)]',
        local.class,
      )}
      {...others}
      data-variant={local.variant ?? 'default'}
      data-size={local.size ?? 'md'}
      data-fitted={local.fitted ? '' : undefined}
      data-slot="tabs-root-provider"
    />
  );
}

function TabsList(props: ComponentProps<typeof TabsPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TabsPrimitive.List
      class={cn(
        'relative isolate box-border inline-flex w-fit max-w-full gap-1 rounded-lg border border-border bg-muted p-1 group-data-[variant=line]/tabs:rounded-none group-data-[variant=line]/tabs:border-0 group-data-[variant=line]/tabs:bg-transparent data-[orientation=horizontal]:overflow-x-auto group-data-fitted/tabs:data-[orientation=horizontal]:w-full group-data-[variant=line]/tabs:data-[orientation=horizontal]:w-full group-data-[variant=line]/tabs:data-[orientation=horizontal]:border-b group-data-[variant=line]/tabs:data-[orientation=horizontal]:px-0 data-[orientation=vertical]:w-[min(12rem,40%)] data-[orientation=vertical]:flex-col group-data-[variant=line]/tabs:data-[orientation=vertical]:border-e group-data-[variant=line]/tabs:data-[orientation=vertical]:py-0',
        local.class,
      )}
      {...others}
      data-slot="tabs-list"
    />
  );
}

function TabsTrigger(props: ComponentProps<typeof TabsPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TabsPrimitive.Trigger
      class={cn(
        "box-border inline-flex h-[calc(var(--_tabs-size)-2*var(--moduix-spacing-1)-2*var(--moduix-border-width-sm))] cursor-pointer items-center justify-center gap-2 rounded-md border-0 bg-transparent px-2.5 text-sm font-medium whitespace-nowrap text-muted-foreground no-underline outline-0 transition-[color] duration-normal ease-in-out select-none group-data-[size=lg]/tabs:px-3 group-data-[size=lg]/tabs:text-md group-data-[size=sm]/tabs:px-2 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-disabled data-selected:text-foreground group-data-fitted/tabs:data-[orientation=horizontal]:flex-1 [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4 [@media(hover:hover)]:hover:text-foreground",
        local.class,
      )}
      {...others}
      data-slot="tabs-trigger"
    />
  );
}

function TabsIndicator(props: ComponentProps<typeof TabsPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TabsPrimitive.Indicator
      class={cn(
        'pointer-events-none top-(--top) left-(--left) -z-1 h-(--height) w-(--width) rounded-md bg-background shadow-sm [--transition-duration:var(--moduix-duration-normal)] [--transition-timing-function:var(--moduix-ease-in-out)] group-data-[variant=line]/tabs:rounded-full group-data-[variant=line]/tabs:bg-foreground group-data-[variant=line]/tabs:shadow-none group-data-[variant=line]/tabs:data-[orientation=horizontal]:top-auto group-data-[variant=line]/tabs:data-[orientation=horizontal]:bottom-0 group-data-[variant=line]/tabs:data-[orientation=horizontal]:h-0.5 group-data-[variant=line]/tabs:data-[orientation=vertical]:start-auto group-data-[variant=line]/tabs:data-[orientation=vertical]:end-0 group-data-[variant=line]/tabs:data-[orientation=vertical]:w-0.5',
        local.class,
      )}
      {...others}
      data-slot="tabs-indicator"
    />
  );
}

function TabsContent(props: ComponentProps<typeof TabsPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TabsPrimitive.Content
      class={cn(
        'box-border min-w-0 flex-1 rounded-lg border border-border bg-background p-4 text-sm leading-5 outline-0 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring',
        local.class,
      )}
      {...others}
      data-slot="tabs-content"
    />
  );
}

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
} from '@ark-ui/solid/tabs';
export type { TabsRootProps, TabsRootProviderProps, TabsSize, TabsVariant };