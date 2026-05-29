import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import {
  Children,
  forwardRef,
  isValidElement,
  type ComponentRef,
  type ComponentProps,
} from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Tabs.module.css';

const Tabs = forwardRef<
  ComponentRef<typeof TabsPrimitive.Root>,
  ComponentProps<typeof TabsPrimitive.Root> & { variant?: 'default' | 'line' }
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

const TabsList = forwardRef<
  ComponentRef<typeof TabsPrimitive.List>,
  ComponentProps<typeof TabsPrimitive.List>
>(function TabsList({ className, children, ...props }, ref) {
  const hasIndicator = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === TabsIndicator,
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

const TabsIndicator = forwardRef<
  ComponentRef<typeof TabsPrimitive.Indicator>,
  ComponentProps<typeof TabsPrimitive.Indicator>
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

const TabsTab = forwardRef<
  ComponentRef<typeof TabsPrimitive.Tab>,
  ComponentProps<typeof TabsPrimitive.Tab>
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

const TabsPanel = forwardRef<
  ComponentRef<typeof TabsPrimitive.Panel>,
  ComponentProps<typeof TabsPrimitive.Panel>
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