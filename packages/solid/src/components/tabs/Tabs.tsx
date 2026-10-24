import { Tabs as TabsPrimitive, useTabs, useTabsContext } from '@ark-ui/solid/tabs';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Tabs.module.css';

type TabsVariant = 'default' | 'line';
type TabsSize = 'sm' | 'md' | 'lg';
type TabsStyleProps = { variant?: TabsVariant; size?: TabsSize; fitted?: boolean };
type TabsRootProps = ComponentProps<typeof TabsPrimitive.Root> & TabsStyleProps;
type TabsRootProviderProps = ComponentProps<typeof TabsPrimitive.RootProvider> & TabsStyleProps;

function Tabs(props: TabsRootProps) {
  const [local, others] = splitProps(props, ['class', 'variant', 'size', 'fitted']);

  return (
    <TabsPrimitive.Root
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.root, local.class)}
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
    <TabsPrimitive.List class={clsx(styles.list, local.class)} {...others} data-slot="tabs-list" />
  );
}

function TabsTrigger(props: ComponentProps<typeof TabsPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TabsPrimitive.Trigger
      class={clsx(styles.trigger, local.class)}
      {...others}
      data-slot="tabs-trigger"
    />
  );
}

function TabsIndicator(props: ComponentProps<typeof TabsPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TabsPrimitive.Indicator
      class={clsx(styles.indicator, local.class)}
      {...others}
      data-slot="tabs-indicator"
    />
  );
}

function TabsContent(props: ComponentProps<typeof TabsPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TabsPrimitive.Content
      class={clsx(styles.content, local.class)}
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