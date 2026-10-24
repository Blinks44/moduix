'use client';

import { Tabs as TabsPrimitive, useTabs, useTabsContext } from '@ark-ui/react/tabs';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './Tabs.module.css';

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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.list, className)}
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
      className={clsx(styles.trigger, className)}
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
      className={clsx(styles.indicator, className)}
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
      className={clsx(styles.content, className)}
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