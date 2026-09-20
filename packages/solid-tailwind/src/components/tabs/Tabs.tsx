import { Tabs as TabsPrimitive, useTabs, useTabsContext } from '@ark-ui/solid/tabs';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type TabsVariant = 'default' | 'line';

function TabsRoot(props: ComponentProps<typeof TabsPrimitive.Root> & { variant?: TabsVariant }) {
  const [local, others] = splitProps(props, ['class', 'orientation', 'variant']);

  return (
    <TabsPrimitive.Root
      class={cn(
        'group/tabs box-border flex w-full min-w-0 flex-col gap-3 text-foreground data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch',
        local.class,
      )}
      orientation={local.orientation}
      {...others}
      data-variant={local.orientation === 'vertical' ? 'default' : (local.variant ?? 'default')}
      data-slot="tabs-root"
    />
  );
}

function TabsRootProvider(
  props: ComponentProps<typeof TabsPrimitive.RootProvider> & { variant?: TabsVariant },
) {
  const [local, others] = splitProps(props, ['class', 'value', 'variant']);
  const orientation = () =>
    (
      local.value().getRootProps() as {
        'data-orientation'?: 'horizontal' | 'vertical';
      }
    )['data-orientation'];

  return (
    <TabsPrimitive.RootProvider
      class={cn(
        'group/tabs box-border flex w-full min-w-0 flex-col gap-3 text-foreground data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch',
        local.class,
      )}
      value={local.value}
      {...others}
      data-variant={orientation() === 'vertical' ? 'default' : (local.variant ?? 'default')}
      data-slot="tabs-root-provider"
    />
  );
}

function TabsList(props: ComponentProps<typeof TabsPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TabsPrimitive.List
      class={cn(
        'relative z-0 inline-flex w-fit max-w-full items-stretch gap-1 rounded-lg border border-border bg-muted p-1 group-data-[orientation=horizontal]/tabs:overflow-x-auto group-data-[orientation=vertical]/tabs:w-48 group-data-[orientation=vertical]/tabs:min-w-48 group-data-[orientation=vertical]/tabs:flex-col group-data-[variant=line]/tabs:w-full group-data-[variant=line]/tabs:rounded-none group-data-[variant=line]/tabs:border-x-0 group-data-[variant=line]/tabs:border-t-0 group-data-[variant=line]/tabs:bg-transparent group-data-[variant=line]/tabs:px-0 group-data-[orientation=vertical]/tabs:max-[30rem]:w-2/5 group-data-[orientation=vertical]/tabs:max-[30rem]:min-w-0',
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
        "relative z-1 inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border-0 bg-transparent px-2.5 text-sm leading-5 font-medium whitespace-nowrap text-muted-foreground no-underline outline-0 transition-[color,opacity] duration-200 ease-in-out select-none focus-visible:before:pointer-events-none focus-visible:before:absolute focus-visible:before:inset-0 focus-visible:before:rounded-[inherit] focus-visible:before:outline-1 focus-visible:before:outline-ring focus-visible:before:content-[''] disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-selected:text-foreground motion-reduce:transition-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:hover:text-foreground",
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
        'pointer-events-none absolute top-1/2 left-[var(--left,0)] z-0 h-8 w-[var(--width,0)] -translate-y-1/2 rounded-md bg-background shadow-sm transition-[var(--transition-property,translate)] [--transition-duration:var(--moduix-duration-normal)] [--transition-timing-function:var(--moduix-ease-in-out)] group-data-[orientation=vertical]/tabs:top-[var(--top,0)] group-data-[orientation=vertical]/tabs:left-1/2 group-data-[orientation=vertical]/tabs:h-[var(--height,0)] group-data-[orientation=vertical]/tabs:w-[calc(100%-0.5rem)] group-data-[orientation=vertical]/tabs:-translate-x-1/2 group-data-[orientation=vertical]/tabs:translate-y-0 group-data-[variant=line]/tabs:top-auto group-data-[variant=line]/tabs:bottom-0 group-data-[variant=line]/tabs:h-0.5 group-data-[variant=line]/tabs:[translate:none] group-data-[variant=line]/tabs:rounded-full group-data-[variant=line]/tabs:bg-foreground group-data-[variant=line]/tabs:shadow-none motion-reduce:transition-none',
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
        "box-border min-w-0 flex-1 rounded-lg border border-border bg-background p-4 text-sm leading-5 text-foreground outline-0 focus-visible:rounded-[inherit] focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring [&[hidden]:not([hidden='until-found'])]:hidden",
        local.class,
      )}
      {...others}
      data-slot="tabs-content"
    />
  );
}

type TabsComponent = typeof TabsRoot & {
  Root: typeof TabsRoot;
  RootProvider: typeof TabsRootProvider;
  Context: typeof TabsPrimitive.Context;
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Indicator: typeof TabsIndicator;
  Content: typeof TabsContent;
  useTabs: typeof useTabs;
};

const Tabs: TabsComponent = Object.assign(TabsRoot, {
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