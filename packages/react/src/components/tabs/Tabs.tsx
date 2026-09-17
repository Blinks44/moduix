'use client';

import { Tabs as TabsPrimitive, useTabs, useTabsContext } from '@ark-ui/react/tabs';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './Tabs.module.css';

type TabsVariant = 'default' | 'line';

const TabsRoot = forwardRef<
  ComponentRef<typeof TabsPrimitive.Root>,
  ComponentProps<typeof TabsPrimitive.Root> & { variant?: TabsVariant }
>(function TabsRoot({ className, orientation, variant = 'default', ...props }, ref) {
  const resolvedVariant = orientation === 'vertical' ? 'default' : variant;

  return (
    <TabsPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      orientation={orientation}
      {...props}
      data-variant={resolvedVariant}
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
      className={clsx(styles.root, className)}
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