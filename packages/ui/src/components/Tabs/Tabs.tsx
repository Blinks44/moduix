import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Tabs.module.css';

const Tabs = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  TabsPrimitive.Root.Props & { variant?: 'default' | 'line' }
>(function Tabs({ className, variant = 'default', ...props }, ref) {
  return (
    <TabsPrimitive.Root
      ref={ref}
      data-slot="tabs-root"
      data-variant={variant}
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
});

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsPrimitive.List.Props
>(function TabsList({ className, children, ...props }, ref) {
  const hasIndicator = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === TabsIndicator,
  );

  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={mergeClassName(className, styles.list)}
      {...props}
    >
      {children}
      {!hasIndicator ? <TabsIndicator /> : null}
    </TabsPrimitive.List>
  );
});

const TabsIndicator = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Indicator>,
  TabsPrimitive.Indicator.Props
>(function TabsIndicator({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Indicator
      ref={ref}
      data-slot="tabs-indicator"
      className={mergeClassName(className, styles.indicator)}
      {...props}
    />
  );
});

const TabsTab = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Tab>,
  TabsPrimitive.Tab.Props
>(function TabsTab({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Tab
      ref={ref}
      data-slot="tabs-tab"
      className={mergeClassName(className, styles.tab)}
      {...props}
    />
  );
});

const TabsPanel = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Panel>,
  TabsPrimitive.Panel.Props
>(function TabsPanel({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Panel
      ref={ref}
      data-slot="tabs-panel"
      className={mergeClassName(className, styles.panel)}
      {...props}
    />
  );
});

export { Tabs, TabsList, TabsIndicator, TabsTab, TabsPanel };