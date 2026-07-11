import type { ComponentProps, ComponentRef } from 'react';
import { Tabs as TabsPrimitive, useTabs } from '@ark-ui/react/tabs';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Tabs.module.css';

type TabsVariant = 'default' | 'line';

const TabsRoot = forwardRef<
  ComponentRef<typeof TabsPrimitive.Root>,
  ComponentProps<typeof TabsPrimitive.Root> & { variant?: TabsVariant }
>(function TabsRoot({ className, variant = 'default', ...props }, ref) {
  return (
    <TabsPrimitive.Root
      ref={ref}
      data-slot="tabs-root"
      data-variant={variant}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const TabsRootProvider = forwardRef<
  ComponentRef<typeof TabsPrimitive.RootProvider>,
  ComponentProps<typeof TabsPrimitive.RootProvider> & { variant?: TabsVariant }
>(function TabsRootProvider({ className, variant = 'default', ...props }, ref) {
  return (
    <TabsPrimitive.RootProvider
      ref={ref}
      data-slot="tabs-root-provider"
      data-variant={variant}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="tabs-list"
      className={clsx(styles.list, normalizeClassName(className))}
      {...props}
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
      data-slot="tabs-trigger"
      className={clsx(styles.trigger, normalizeClassName(className))}
      {...props}
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
      data-slot="tabs-indicator"
      className={clsx(styles.indicator, normalizeClassName(className))}
      {...props}
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
      data-slot="tabs-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  RootProvider: TabsRootProvider,
  List: TabsList,
  Trigger: TabsTrigger,
  Indicator: TabsIndicator,
  Content: TabsContent,
  useTabs,
});

export { Tabs, useTabs };