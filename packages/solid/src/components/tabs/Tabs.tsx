import { Tabs as TabsPrimitive, useTabs, useTabsContext } from '@ark-ui/solid/tabs';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Tabs.module.css';

type TabsVariant = 'default' | 'line';

function TabsRoot(props: ComponentProps<typeof TabsPrimitive.Root> & { variant?: TabsVariant }) {
  const [local, others] = splitProps(props, ['class', 'orientation', 'variant']);

  return (
    <TabsPrimitive.Root
      data-slot="tabs-root"
      data-variant={local.orientation === 'vertical' ? 'default' : (local.variant ?? 'default')}
      class={clsx(styles.root, local.class)}
      orientation={local.orientation}
      {...others}
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
      data-slot="tabs-root-provider"
      data-variant={orientation() === 'vertical' ? 'default' : (local.variant ?? 'default')}
      class={clsx(styles.root, local.class)}
      value={local.value}
      {...others}
    />
  );
}

function TabsList(props: ComponentProps<typeof TabsPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TabsPrimitive.List data-slot="tabs-list" class={clsx(styles.list, local.class)} {...others} />
  );
}

function TabsTrigger(props: ComponentProps<typeof TabsPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      class={clsx(styles.trigger, local.class)}
      {...others}
    />
  );
}

function TabsIndicator(props: ComponentProps<typeof TabsPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      class={clsx(styles.indicator, local.class)}
      {...others}
    />
  );
}

function TabsContent(props: ComponentProps<typeof TabsPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      class={clsx(styles.content, local.class)}
      {...others}
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